import path from 'path';
import {fileURLToPath} from 'url'
import {Worker, isMainThread} from 'node:worker_threads';
import * as os from 'os';

const url = fileURLToPath(import.meta.url)
const srcfile = path.join(path.dirname(url), 'worker.js')
const cpus = os.cpus();
const TEN = 10;

const performCalculations = async () => {
    if(isMainThread){
        const arrOfWorkerResult = [];
        let i = 0;
        const max = cpus.length;
        let worker;
        while(i !== max-1) {
            worker = new Worker(srcfile);
            worker.postMessage({num:TEN + i, ind: i})
            worker.on('error',(err)=>{
                arrOfWorkerResult.push({
                    status: 'Error',
                    data: null,
                    ind: err.ind
                });
            })
            worker.on('message', (msg)=>{
                if(msg instanceof Error) {
                    arrOfWorkerResult.push({
                        status: 'Error',
                        data: null,
                        ind: msg.ind
                    });
                } else {
                    arrOfWorkerResult.push({
                        status: 'Resolved',
                        data: msg.result,
                        ind: msg.ind
                    });
                }
            })
            i++;
            if(i === max-1){
                worker.on('exit', ()=>{
                    const arr = arrOfWorkerResult.sort((a,b)=>a.ind - b.ind)
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