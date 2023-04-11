import fs  from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url'

import zlib  from 'node:zlib';
import { pipeline }  from 'node:stream/promises';

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','archive.gz')
const dstfile = path.join(path.dirname(url),'files','fileToCompress_NEW.txt')
const decompress = async () => {
    await pipeline(
        fs.createReadStream(srcfile),
        zlib.createGunzip(),
        fs.createWriteStream(dstfile),
    );
    console.log('Done.');
};

await decompress();