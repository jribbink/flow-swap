import useWindowSize from 'hooks/use-window-size';
import { ReactNode } from 'react';

enum BootstrapBreakpoint {
  xs = 0,
  sm = 576,
  md = 768,
  lg = 992,
  xl = 1200,
  xxl = 1400
}

type BreakpointProps = {
  children: ReactNode;
  show?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl' | 'xxl' | number;
  hide?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl' | 'xxl' | number;
};

export default ({ children, show, hide }: BreakpointProps) => {
  const windowSize = useWindowSize();

  if (!windowSize) return null;

  const parseBreakpoint = (
    breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xl' | 'xxl' | number
  ): number => {
    if (typeof breakpoint == 'string') {
      return BootstrapBreakpoint[breakpoint];
    } else {
      return breakpoint;
    }
  };

  if (!show || windowSize.width >= parseBreakpoint(show)) {
    if (!hide || windowSize.width < parseBreakpoint(hide)) {
      return <>{children}</>;
    }
  }
  return null;
};
