import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    code: {
      render: component('./src/components/CodeBlock.astro'),
      attributes: {
        code: { type: String },
      },
    },
    step: {
      render: component('./src/components/Step.astro'),
      attributes: {
        code: { type: String },
      },
    },
  },
});
