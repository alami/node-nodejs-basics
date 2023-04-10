import path from 'path';
import {fileURLToPath} from 'url'
import {Worker, isMainThread} from 'node:worker_threads';
import * as os from 'os';

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url), 'worker.js')
const cpuCores = os.cpus();
const START_NUMBER = 10;

const performCalculations = async () => {
    if(isMainThread){
        const arrResultWorkers = [];
        let count = 0;
        const len = cpuCores.length;
        let worker;
        while(count !== len-1) {
            worker = new Worker(srcfile);
            worker.postMessage({num:START_NUMBER + count, ind: count})
            worker.on('error',(err)=>{
                arrResultWorkers.push({
                    status: 'Error',
                    data: null,
                    ind: err.ind
                });
            })
            worker.on('message', (msg)=>{
                if(msg instanceof Error) {
                    arrResultWorkers.push({
                        status: 'Error',
                        data: null,
                        ind: msg.ind
                    });
                } else {
                    arrResultWorkers.push({
                        status: 'Resolved',
                        data: msg.result,
                        ind: msg.ind
                    });
                }
            })
            count++;
            if(count === len-1){
                worker.on('exit', ()=>{
                    const arr = arrResultWorkers.sort((a,b)=>a.ind - b.ind)
                        .map(item => {
                            return {status: item.status, data: item.data}
                        });
                    console.log(arr);
                })
            }
        }

    }
};

await performCalculations();