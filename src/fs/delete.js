import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToRemove.txt')
const remove = async () => {
    const srcexist = await checkPathExists(srcfile)
    try {
        const srcexist = await checkPathExists(srcfile)
        if (!srcexist) {
            console.log('Error: FS operation failed!')
        }
        else {
            await fs.unlink(srcfile);
        }
    } catch (e) {
        console.log(e)
    }

};

await remove();

async function checkPathExists(path) {
    return fs.stat(path)
        .then((res) => res.isFile())
        .catch((err) => err.code === 'ENOENT' ? false : err);
}