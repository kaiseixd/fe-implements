import { parse } from '@textlint/markdown-to-ast';

const typeMap = {
  Document: 'div',
  Str: 'string',
  ListItem: 'li',
  Paragraph: 'p',
  Link: 'a',
};

function getTagName(node) {
  const { type } = node;

  switch (type) {
    case 'Header':
      return `h${node.depth}`;
    case 'List':
      return node.ordered ? 'ol' : 'ul';
    default:
      return typeMap[type] || type;
  }
}

function parseAst(node) {
  const { value, children } = node;

  const tag = getTagName(node);
  const childNodes = children && children.map(parseAst).join('');

  switch (tag) {
    case 'string':
      return value;
    case 'a':
      return `<a href="${node.url}">${childNodes}</a>`;
    default:
      return `<${tag}>${childNodes}</${tag}>`;
  }
}

export default function loader(source) {
  let ast = parse(source);
  let result = parseAst(ast);

  return `export default ${JSON.stringify(result)}`;
};
