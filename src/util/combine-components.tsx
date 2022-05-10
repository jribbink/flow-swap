import React, { ComponentProps, FC, ReactNode } from 'react';

export const combineComponents = (...components: FC<{children: ReactNode}>[]): FC<{children: ReactNode}> => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC<{children: ReactNode}>>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};
