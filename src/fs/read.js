import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToRead.txt')
const read = async () => {
    const srcexist = await checkPathExists(srcfile)
    if (!srcexist) {
        throw new Error('FS operation failed')
    }
    else {
        const file = await fs.readFile(srcfile,"utf8");
        console.log(file)
    }
};

await read();
async function checkPathExists(path) {
    return fs.stat(path)
        .then((res) => res.isFile())
        .catch((err) => err.code === 'ENOENT' ? false : err);
}