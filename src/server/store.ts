import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
import {seedStore,type Store} from '@/features/catalogue/seed';
const file=path.join(process.cwd(),'.data','demo.json');
const globalStore=globalThis as typeof globalThis & {dsLubQueue?:Promise<unknown>};
export async function transaction<T>(fn:(store:Store)=>T|Promise<T>):Promise<T>{
 const run=async()=>{await mkdir(path.dirname(file),{recursive:true});let data:Store;try{data=JSON.parse(await readFile(file,'utf8'));}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;data=seedStore();}const result=await fn(data);const temp=file+'.tmp';await writeFile(temp,JSON.stringify(data,null,2));await rename(temp,file);return result;};
 const next=(globalStore.dsLubQueue??Promise.resolve()).then(run,run);globalStore.dsLubQueue=next.catch(()=>{});return next;
}
