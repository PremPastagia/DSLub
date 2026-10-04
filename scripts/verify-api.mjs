import assert from 'node:assert/strict';
const base='http://127.0.0.1:3000';
async function post(body,cookie='',origin=base){const r=await fetch(base+'/api/action',{method:'POST',headers:{origin,'content-type':'application/json',cookie},body:JSON.stringify(body)});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]??cookie};}
async function login(role,email='customer@example.com'){const r=await post({action:'login',role,email,name:'Verification user'});assert.equal(r.status,200);return r.cookie;}
async function state(cookie){return fetch(base+'/api/state',{headers:{cookie}}).then(r=>r.json());}
assert.equal((await post({action:'login'},'','https://wrong.example')).status,403);
assert.equal((await post({action:'checkout',items:[{id:'p1',quantity:1}],address:'Dummy site in Vadodara',payment:'demo-success'})).status,403);
const customer=await login('customer','verification@example.com'), other=await login('customer','other-verification@example.com'),owner=await login('owner'), inventory=await login('inventory');
assert.equal((await post({action:'product',product:{name:'Forbidden'}},inventory)).status,403);
const ticket=await post({action:'ticket',title:'Verification service request',detail:'Dummy fault description with an order reference.'},customer);assert.equal(ticket.status,200);
const quote=await post({action:'quote',title:'Verification bulk request',detail:'Dummy requirement: twenty pumps with suitable fittings.'},customer);assert.equal(quote.status,200);
assert.ok((await state(customer)).records.some(r=>r.id===ticket.body.id));
assert.ok(!(await state(other)).records.some(r=>r.id===ticket.body.id));
assert.ok((await state(owner)).records.some(r=>r.id===quote.body.id));
assert.equal((await post({action:'record',id:quote.body.id,status:'Quoted',total:200000},owner)).status,200);
assert.equal((await state(customer)).records.find(r=>r.id===quote.body.id).total,200000);
const sku='VERIFY-'+Date.now();assert.equal((await post({action:'product',product:{name:'Disposable verification pump',sku,category:'Oil pumps',price:10000,stock:1,quoteOnly:false}},owner)).status,200);
const p=(await state(owner)).products.find(p=>p.sku===sku);
const payload={action:'checkout',items:[{id:p.id,quantity:1,price:1}],address:'Dummy site in Vadodara',payment:'demo-success'};
assert.equal((await post({...payload,payment:'demo-failure'},customer)).status,400);
assert.equal((await state(owner)).products.find(x=>x.id===p.id).stock,1);
const race=await Promise.all([post(payload,customer),post(payload,customer)]);
assert.equal(race.filter(r=>r.status===200).length,1);
assert.equal(race.filter(r=>r.status===400).length,1);
const order=(await state(customer)).records.find(r=>r.id===race.find(r=>r.status===200).body.id);assert.equal(order.total,11800);
assert.equal((await state(owner)).products.find(x=>x.id===p.id).stock,0);
assert.equal((await post({action:'archive',id:p.id},owner)).status,200);
assert.equal((await state(customer)).products.some(x=>x.id===p.id),false);
console.log('API_VERIFIED: origin, sign-in, permissions, customer isolation, quotes, service, failed payment, concurrent final-unit stock, server pricing, archive.');
