import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const srcdir = path.join(path.dirname(url),'files')
const list = async () => {
    try {
        const direxist = await checkPathExists(srcdir)
        if (!direxist)
            console.log('Error: FS operation failed!')
        else {
            const files = await fs.readdir(srcdir)
            files.forEach(file => {
                console.log(file);
            });
        }
    } catch (e) {
        console.log(e)
    }
};

await list();

function checkPathExists(path) {
    return fs.stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
}