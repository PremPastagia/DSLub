from pathlib import Path
import re
p=Path('src/components/Website.tsx')
s=p.read_text(encoding='utf-8')
header=s[:s.index('type CartItem=')]
definitions=s[s.index('type CartItem='):s.index('function Button(')]
definitions=definitions.replace('type CartItem=', 'export type CartItem=').replace('type State=', 'export type State=').replace('const initial:', 'export const initial:').replace('const Context=', 'export const Context=').replace('const useApp=', 'export const useApp=').replace('const money=', 'export const money=')
Path('src/components/app-context.tsx').write_text("'use client';\nimport {createContext,useContext} from 'react';\nimport type {Product,User,RecordItem,Workflow as WorkflowType} from '@/features/catalogue/seed';\n"+definitions,encoding='utf-8')
matches=list(re.finditer(r'^(?:export default )?function (\w+)\(',s,re.M))
blocks={m.group(1):s[m.start():(matches[i+1].start() if i+1<len(matches) else len(s))] for i,m in enumerate(matches)}
base=header+"import {useApp,money} from '@/components/app-context';\nimport {Button,PageHeading} from '@/components/ui';\n"
Path('src/components/ui.tsx').write_text("'use client';\nimport Link from 'next/link';\nimport {ChevronRight} from 'lucide-react';\n"+''.join('export '+blocks[n] for n in ['Button','PageHeading']),encoding='utf-8')
groups={'catalogue':['ProductCard','Catalogue','Detail'],'public':['Home','About','Services','Contact','Resources'],'requests':['RequestForm'],'account':['SignIn','Cart','Account','Records'],'dashboard':['Dashboard','ProductEditor','StockRow','QuotationEditor','TeamForm']}
extra={'public':"import {ProductCard} from '@/features/catalogue/views';\nimport {RequestForm} from '@/features/requests/views';\n",'dashboard':"import {Records} from '@/features/account/views';\n"}
for group,names in groups.items():
 target=Path(f'src/features/{group}/views.tsx');target.parent.mkdir(parents=True,exist_ok=True)
 target.write_text(base+extra.get(group,'')+''.join('export '+blocks[n] for n in names),encoding='utf-8')
imports="import {Context,initial,type State,type CartItem} from '@/components/app-context';\n"
for group,names in groups.items():
 needed=[n for n in names if n in ['Catalogue','Detail','Home','About','Services','Contact','Resources','RequestForm','SignIn','Cart','Account','Dashboard']]
 if needed: imports+=f"import {{{','.join(needed)}}} from '@/features/{group}/views';\n"
p.write_text(header+"import {PageHeading} from '@/components/ui';\n"+imports+blocks['Website'],encoding='utf-8')
print('UI split into shared components and five feature modules')
