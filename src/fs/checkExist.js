import fs from 'fs/promises';
async function checkPathExists(path) {
  return fs.stat(path)
    .then((res) => res.isDirectory())
    .catch((err) => err.code === 'ENOENT' ? false : err);
}

async function checkFileExists(path) {
  return fs.stat(path)
    .then((res) => res.isFile())
    .catch((err) => err.code === 'ENOENT' ? false : err);
}

export {checkPathExists, checkFileExists}
