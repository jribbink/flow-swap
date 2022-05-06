type RequiredKeys<T> = {
    [K in keyof T]: ({} extends { [P in K]: T[K] } ? never : K)
  }[keyof T];
  
  type NonOptional<T> = Pick<T, RequiredKeys<T>>;
  
  type MyType = {
    thingOne: number,
    thingTwo?: number
  };
  
  type MyRequireds = NonOptional<MyType>;