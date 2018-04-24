export type TPartialOptionalOf<T> = {
  [P in keyof T]?: T[P];
};
