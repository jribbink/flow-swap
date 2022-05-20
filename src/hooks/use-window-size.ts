import { WindowSize } from 'models/window-size';
import { useEffect, useState } from 'react';

export default () => {
  const [windowSize, setWindowSize] = useState<WindowSize>();

  useEffect(() => {
    const updateWindowSize = () => {
      const { clientWidth: width, clientHeight: height } =
        document.documentElement;
      setWindowSize({
        width,
        height
      });
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();
  }, []);

  return windowSize;
};
