import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkFileExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToRead.txt')
const read = async () => {
    try {
        const srcexist = await checkFileExists(srcfile)
        if (!srcexist) {
            throw new Error('FS operation failed')
        }
        else {
            const file = await fs.readFile(srcfile,"utf8");
            console.log(file)
        }
    } catch (e) {
        console.log(e)
    }

};

await read();