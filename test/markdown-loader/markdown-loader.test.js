/**
 * @jest-environment node
 */
import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('example.md');
  const output = stats.toJson().modules[0].source;

  expect(output).toBe(`export default \"<div><h2>test</h2><h3>markdown loader</h3><ul><li><p>listItem 1</p></li><li><p>listItem 2</p></li></ul></div>\"`);
});
