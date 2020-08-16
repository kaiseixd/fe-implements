import { transform } from '@babel/core';
import jsxPlugin from '../lib/babel/babel-plugin-jsx';

test('transform div', () => {
  const { code } = transform (`<div class="a" id="b">1<span>2</span></div>`, {
    plugins: [jsxPlugin],
    sourceType: 'script'
  });
  expect(code).toBe(
`React.createElement("div", {
  "class": "a",
  "id": "b"
}, "1", React.createElement("span", {}, "2"));`
  );
});
