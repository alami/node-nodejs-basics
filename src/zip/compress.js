import fs  from 'node:fs';
import path from 'path';
import {fileURLToPath} from 'url'

import zlib  from 'node:zlib';
import { pipeline }  from 'node:stream/promises';

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url),'files','fileToCompress.txt')
const dstfile = path.join(path.dirname(url),'files','archive.gz')

const compress = async () => {
    await pipeline(
        fs.createReadStream(srcfile),
        zlib.createGzip(),
        fs.createWriteStream(dstfile),
    );
    console.log('Done.');
};

await compress();