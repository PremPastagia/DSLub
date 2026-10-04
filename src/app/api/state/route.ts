import {NextRequest,NextResponse} from 'next/server';
import {transaction} from '@/server/store';
import {can} from '@/features/commerce/domain';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){const data=await transaction(db=>{const s=db.sessions[req.cookies.get('dsl-session')?.value??''];const user=s&&s.expires>Date.now()?s.user:null;return {products:db.products.filter(p=>p.active||user?.role==='owner'),user,records:user?db.records.filter(r=>r.userId===user.id||(r.type==='order'&&can(user.role,'orders'))||(r.type==='quote'&&can(user.role,'quotes'))||(r.type==='ticket'&&can(user.role,'tickets'))||(r.type==='enquiry'&&can(user.role,'quotes'))):[],team:user?.role==='owner'?db.team:[],workflows:user&&can(user.role,'automation')?db.workflows:[],audit:user?.role==='owner'?db.audit.slice(-30).reverse():[],demo:true};});return NextResponse.json(data,{headers:{'Cache-Control':'no-store'}});}
