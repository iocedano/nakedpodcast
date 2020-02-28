import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => `<custom-component>${customComponentRenderer(node)}</custom-component>`
  }
}

module.exports = document => documentToHtmlString(document, options);
