import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url'

const url = fileURLToPath(import.meta.url)
const file = path.join(path.dirname(url),'files','fresh.txt')

const create = async () => {
    try {
        const fd = await fs.open(file);
        console.log('Error: FS operation failed')
    } catch (e) {
        await fs.writeFile(file, 'I am fresh and young')
        console.log('Created: fresh.txt')
    }
};

await create();