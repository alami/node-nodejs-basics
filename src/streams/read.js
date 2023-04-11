import fs from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url'
import { stdin, stdout } from 'node:process';

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToRead.txt')
const read = async () => {
    var rstream = fs.createReadStream(srcfile,'utf8');
    let body = ''
    rstream.on("data", (chunk) => {
        body+=chunk.toString()
    })
    rstream.on("end", () => {
        stdout.write(body + '\n')
    })
    rstream.on("error", (e) => {
        console.log(e.message)
    })
};

await read();