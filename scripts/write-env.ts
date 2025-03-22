import { writeFile } from 'fs';

const targetPath = './env.ts';
const envConfigFile = process.env['ENVIRONMENT'] as string;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
