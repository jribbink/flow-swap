import { spawn } from 'child_process';
import { addInitialLiquidity } from './misc/init-contracts';
import config from 'config';

const child = spawn('npm run emulator --contracts', {
  shell: true,
  stdio: 'inherit'
});
spawn('npm run dev-wallet', { shell: true, stdio: 'inherit' });

new Promise((resolve) => setTimeout(resolve, 1000)).then(async () => {
  spawn('npm run deploy:project', { shell: true, stdio: 'inherit' });
  return await new Promise((resolve) => setTimeout(resolve, 1000)).then(
    async () => {
      await addInitialLiquidity(config.pairs[0], 1, 1);
    }
  );
});
