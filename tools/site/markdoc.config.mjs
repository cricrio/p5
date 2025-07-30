import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    code: {
      render: component('./src/components/CodeBlock.astro'),
      attributes: {
        code: { type: String },
      },
    },
  },
});
