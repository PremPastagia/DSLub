import type {Metadata} from 'next';
import './globals.css';
import Script from 'next/script';
export const metadata:Metadata={title:{default:'DS Lub | Industrial lubrication systems',template:'%s | DS Lub'},description:'Explore industrial lubrication pumps, systems and application support from DS Lub, Vadodara. Demonstration website.',robots:{index:false,follow:false}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}{process.env.FIGMA_CAPTURE==='true'&&<Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive"/>}</body></html>;}
