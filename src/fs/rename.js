import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','wrongFilename.txt')
const dstfile = path.join(path.dirname(url),'files','properFilename.md')
const rename = async () => {
    try {
        const srcexist = await checkPathExists(srcfile)
        const dstexist = await checkPathExists(dstfile)
        if (!srcexist || dstexist) {
            console.log('Error: FS operation failed!')
        }
        else {
            await fs.rename(srcfile, dstfile);
        }
    } catch (e) {
        console.log(e)
    }
};

await rename();

async function checkPathExists(path) {
    return fs.stat(path)
        .then((res) => res.isFile())
        .catch((err) => err.code === 'ENOENT' ? false : err);
}