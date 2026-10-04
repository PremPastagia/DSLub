export type Permission='stock'|'prices'|'orders'|'quotes'|'tickets'|'team'|'automation'|'content';
const permissions:Record<string,Permission[]>={owner:['stock','prices','orders','quotes','tickets','team','automation','content'],sales:['orders','quotes'],inventory:['stock','orders'],service:['tickets'],customer:[]};
export function can(role:string,permission:Permission):boolean {return permissions[role]?.includes(permission)??false;}
export function demoCustomerId(email:string):string {const normalized=email.trim().toLowerCase();return normalized==='customer@example.com'?'demo-customer':`demo-customer:${normalized}`;}
export function priceCart(items:{id:string;quantity:number}[],products:{id:string;price:number;stock:number;quoteOnly:boolean;active:boolean;name?:string;sku?:string}[]) {
  if(!Array.isArray(items)||items.length===0||items.length>100) throw new Error('Choose products before checkout.');
  const counts=new Map<string,number>();
  for(const item of items){if(!Number.isSafeInteger(item.quantity)||item.quantity<1||item.quantity>999)throw new Error('Quantity must be a positive whole number.');counts.set(item.id,(counts.get(item.id)??0)+item.quantity);}
  const lines=[...counts].map(([id,quantity])=>{const p=products.find(p=>p.id===id&&p.active);if(!p)throw new Error('Product is unavailable.');if(p.quoteOnly)throw new Error('This product requires a quotation.');if(quantity>p.stock)throw new Error(`Insufficient stock for ${p.name??id}.`);return {id,quantity,name:p.name??id,sku:p.sku??id,price:p.price};});
  const subtotal=lines.reduce((sum,p)=>sum+p.price*p.quantity,0), tax=Math.round(subtotal*.18),shipping=0;
  return {lines,subtotal,tax,shipping,total:subtotal+tax};
}
