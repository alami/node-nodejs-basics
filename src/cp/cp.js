import { spawn } from 'node:child_process';
import { stdin, exit } from 'node:process';

const spawnChildProcess = async (args) => {
    const ls = spawn('node', ['files//script.js', ...args]);
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    ls.on('close', (code) => {
        console.log(`Cahild process finished with exit code ${code}`);
        exit()
    });
    stdin.on('data', (ch)=>{
        ls.stdin.write(ch);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(  ['someArgument'] );
