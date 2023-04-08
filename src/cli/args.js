import {argv} from 'process';
const parseArgs = () => {
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--'))
      console.log(argv[i].substring(2) + ' is ' + (argv[++i]))
  }
};

parseArgs();
//node .\src\cli\args.js --propName value --prop2Name value2