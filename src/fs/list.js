import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkPathExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const srcdir = path.join(path.dirname(url),'files')
const list = async () => {
    try {
        const direxist = await checkPathExists(srcdir)
        if (!direxist)
            throw new Error('FS operation failed')
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

