import jsx from '@babel/plugin-syntax-jsx';

export default function({ types: t }) {
  function createIdentifierParser(id) {
    return () => {
      return id
        .split(".")
        .map(name => t.identifier(name))
        .reduce((object, property) => t.memberExpression(object, property));
    }
  }

  function convertAttributes(nodes) {
    let properties = [];
    for (let node of nodes) {
      properties.push(t.objectProperty(t.stringLiteral(node.name.name), node.value));
    }
    return t.ObjectExpression(properties);
  }

  return {
    inherits: jsx,
    visitor: {
      JSXElement: {
        exit(path) {
          const openingPath = path.get('openingElement');

          const children = t.react.buildChildren(openingPath.parent);
          const tagName = t.stringLiteral(openingPath.node.name.name);
          const attrs = convertAttributes(openingPath.node.attributes);

          const callee = createIdentifierParser('React.createElement')();
          const args = [tagName, attrs, ...children];

          path.replaceWith(t.callExpression(callee, args));
        }
      }
    }
  }
}
