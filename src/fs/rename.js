import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkFileExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','wrongFilename.txt')
const dstfile = path.join(path.dirname(url),'files','properFilename.md')
const rename = async () => {
    try {
        const srcexist = await checkFileExists(srcfile)
        const dstexist = await checkFileExists(dstfile)
        if (!srcexist || dstexist) {
            throw new Error('FS operation failed')
        }
        else {
            await fs.rename(srcfile, dstfile);
        }
    } catch (e) {
        console.log(e)
    }
};

await rename();