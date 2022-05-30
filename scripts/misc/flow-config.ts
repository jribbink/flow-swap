import path from 'path';
import fs from 'fs';

export async function getFlowConfig(basedir = '.') {
  const config: {
    emulators: {
      default: {
        port: number;
        serviceAccount: string;
      };
    };
    accounts: {
      [accountName: string]: {
        address: string;
        key: string;
      };
    };
  } = await new Promise((resolve, reject) => {
    fs.readFile(path.join(basedir, 'flow.json'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data.toString()));
      }
    });
  });

  const adminAccount = config.accounts[config.emulators.default.serviceAccount];

  return {
    flowConfig: config,
    adminAccount: {
      address: adminAccount.address,
      key: adminAccount.key
    }
  };
}
