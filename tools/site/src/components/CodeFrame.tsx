import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'preact/hooks';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconArrowsMaximize,
} from '@tabler/icons-preact';
import { cdnLibraryUrl } from '@/src/globals/globals';

interface CodeBundle {
  css?: string;
  js?: string;
  base?: string;
}

/*
 * Wraps the given code in a html document for display.
 * Single object argument, all properties optional:
 */
const wrapInMarkup = (code: CodeBundle) =>
  `<!DOCTYPE html>
<meta charset="utf8" />
<base href="${code.base || '/assets/'}" />
<style type='text/css'>
html, body {
  margin: 0;
  padding: 0;
  background: white;
  overflow: hidden;
}
canvas {
  display: block;
  margin: auto;
}
${code.css || ''}
</style>
<script id="code" type="text/javascript">${code.js || ''}</script>
<script type="text/javascript">
    // Listen for p5.min.js text content and include in iframe's head as script
    window.addEventListener("message", event => {
      // Include check to prevent p5.min.js from being loaded twice
      const scriptExists = !!document.getElementById("p5ScriptTagInIframe");
      if (!scriptExists && event.data?.sender === '${cdnLibraryUrl}') {
        const p5ScriptElement = document.createElement('script');
        p5ScriptElement.id = "p5ScriptTagInIframe";
        p5ScriptElement.type = 'text/javascript';
        p5ScriptElement.textContent = event.data.message;
        document.head.appendChild(p5ScriptElement);
      }
    })
</script>
`;

export type CodeFrameProps = {
  jsCode: string;
  cssCode?: string;
  canPause?: boolean;
  href?: string;
  fullScreen?: boolean;
};

/*
 * Component that uses an iframe to run code with the p5 library included.
 *
 */
export const CodeFrame = (props: CodeFrameProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [pausedFrameRate, setPausedFrameRate] = useState(0);
  const [mounted, setMounted] = useState(false);

  // For performance, set the iframe to display:none when
  // not visible on the page. This will stop the browser
  // from running `draw` every frame, which helps performance
  // on pages with multiple sketches, and causes sketch
  // animations only to start when they become visible.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const { IntersectionObserver } = window;
    if (!IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!iframeRef.current) return;
          setMounted(entry.isIntersecting);

          if (entry.isIntersecting) {
            iframeRef.current.style.removeProperty('display');
          } else {
            iframeRef.current.style.display = 'none';
          }
        });
      },
      { rootMargin: '20px' }
    );
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    (async () => {
      if (!iframeRef.current) return;
      if (!mounted) return;

      /*
       * Uses postMessage to receive the text content of p5.min.js, to be included
       * in a script so p5.js functions can be called.
       *
       * Rather than including the script with <script src=p5LibraryUrl>, this had
       * to be done because caching this resource with the service worker or browser
       * cache, so the cached version could be used by an iframe isn't currently
       * supported on all major browsers.
       * It would instead, cause multiple downloads of p5.min.js on page load for
       * each example, and on re-running a CodeFrame.
       *
       * See https://github.com/w3c/ServiceWorker/issues/765.
       */
      try {
        const p5ScriptText = await fetch(cdnLibraryUrl).then((res) =>
          res.text()
        );
        console.log('p5');
        iframeRef.current.contentWindow?.postMessage(
          {
            sender: cdnLibraryUrl,
            message: p5ScriptText,
          },
          '*'
        );
      } catch (e) {
        console.error(`Error loading ${cdnLibraryUrl}`);
        return;
      }
    })();
  }, [props.jsCode, mounted]);

  const toggleRunning = () => {
    console.log({ paused });
    if (paused) {
      resume();
      setPaused(false);
    } else {
      pause();
      setPaused(true);
    }
  };
  const pause = useCallback(() => {
    if (!iframeRef.current) return;
    const p5Window = iframeRef.current.contentWindow;

    if (!p5Window) return;

    const targetFrameRate = p5Window.getTargetFrameRate?.();
    if (targetFrameRate > 0 && p5Window.frameRate) {
      p5Window.frameRate(0);
      setPausedFrameRate(targetFrameRate);
    }
  }, [iframeRef]);

  const resume = useCallback(() => {
    if (!iframeRef.current) return;
    const p5Window = iframeRef.current.contentWindow;

    if (!p5Window) return;

    if (pausedFrameRate > 0 && p5Window.frameRate) {
      p5Window.frameRate(pausedFrameRate);
    }
  }, [iframeRef, pausedFrameRate]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${
        props.fullScreen ? 'h-full' : 'aspect-video'
      } relative`}
    >
      {props.href && (
        <a
          href={props.href}
          className='absolute top-0 right-0 p-2 text-white mix-blend-difference'
        >
          <IconArrowsMaximize />
          <div className='invisible w-1 h-1 overflow-hidden text-sm'>
            Maximize
          </div>
        </a>
      )}
      <iframe
        ref={iframeRef}
        srcDoc={
          mounted
            ? wrapInMarkup({
                js: props.jsCode,
                css: props.cssCode,
              })
            : ''
        }
        sandbox='allow-scripts allow-popups allow-modals allow-forms allow-same-origin'
        aria-label='Code Preview'
        title='Code Preview'
        className='w-full h-full'
      />
      {props.canPause && (
        <button
          onClick={toggleRunning}
          className='absolute bottom-0 right-0 p-2 text-white mix-blend-difference'
        >
          {paused ? (
            <>
              <div className='invisible w-1 h-1 overflow-hidden text-sm'>
                Play
              </div>
              <IconPlayerPlayFilled />
            </>
          ) : (
            <>
              <div className='invisible w-1 h-1 overflow-hidden text-sm'>
                Pause
              </div>
              <IconPlayerPauseFilled />
            </>
          )}
        </button>
      )}
    </div>
  );
};
