import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkFileExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToRemove.txt')
const remove = async () => {
    try {
        const srcexist = await checkFileExists(srcfile)
        if (!srcexist) {
            throw new Error('FS operation failed')
        }
        else {
            await fs.unlink(srcfile);
        }
    } catch (e) {
        console.log(e)
    }

};

await remove();