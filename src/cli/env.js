import {env} from 'process';
const parseEnv = () => {
  for (const property in env) {
    if (property.startsWith('RSS_')) {
      console.log(`${property}=${env[property]};`);
    }
  }
};
/*
env.RSS_1='one'
env.RSS_2='two'
env.RSS_3=3
*/
parseEnv();