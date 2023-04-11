import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkPathExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const srcdir = path.join(path.dirname(url),'files')
const dstdir = path.join(path.dirname(url),'files_copy')
const copy = async () => {
    try {
        const direxist = await checkPathExists(srcdir)
        if (!direxist)
            throw new Error('FS operation failed')
        else {
            await fs.cp(srcdir, dstdir, { recursive: true });
        }
    } catch (e) {
        console.log(e)
    }
};

await copy();