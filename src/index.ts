const def_world = 'world';

export function hello(world: string = def_world): string {
  return `Hello ${world}!`;
}