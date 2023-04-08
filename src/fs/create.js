import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'
import {checkFileExists} from "./checkExist.js"

const url = fileURLToPath(import.meta.url)
const file = path.join(path.dirname(url),'files','fresh.txt')

const create = async () => {
    try {
        // const fd = await fs.open(file);
        // throw new Error('FS operation failed')
        const srcexist = await checkFileExists(file)
        if (srcexist) {
            throw new Error('FS operation failed')
        }
        else {
            await fs.writeFile(file, 'I am fresh and young')
        }
    } catch (e) {
        console.log(e)
    }
};

await create();