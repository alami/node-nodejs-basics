import { createHash } from 'node:crypto'
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToCalculateHashFor.txt')
const calculateHash = async () => {
    const file = await fs.readFile(srcfile,"utf8");
    const filehash = createHash('sha256').update(file).digest('hex')
    console.log(filehash)
};

await calculateHash();