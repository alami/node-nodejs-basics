import fs from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url'
import { stdin } from 'node:process';

const url = fileURLToPath(import.meta.url)
const dstfile = path.join(path.dirname(url),'files','fileToWrite.txt')

const write = async () => {
    const writable = fs.createWriteStream(dstfile);
    stdin.on('data', (chunk)=>{
        writable.write(chunk.toString());
    });

    stdin.on('error', (err)=>{
        throw new Error(err);
    })
};
await write();