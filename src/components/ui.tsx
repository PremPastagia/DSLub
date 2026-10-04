'use client';
import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
export function Button({children,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button className="button" {...props}>{children}</button>;}
export function PageHeading({title,description}:{title:string;description:string}){return <div className="page-heading"><div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight size={14}/><span>{title}</span></div><h1>{title}</h1><p>{description}</p></div>;}
