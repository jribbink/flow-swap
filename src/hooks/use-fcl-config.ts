// @ts-ignore
import * as fcl from '@onflow/fcl';
import config from 'config';
import { useEffect } from 'react';

export default function useFclConfig() {
  useEffect(() => {
    fcl.config(config.fcl), [];
  });
}
