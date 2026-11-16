import type {Metadata} from 'next';
import Link from 'next/link';
import {Home,Gamepad2,Trophy,Search,Info} from 'lucide-react';
import './globals.css';
const url=process.env.NEXT_PUBLIC_SITE_URL||'https://rocodes.pages.dev';
export const metadata:Metadata={metadataBase:new URL(url),title:{default:'BloxRadar — Roblox Codes & Game Rankings',template:'%s | BloxRadar'},description:'Find Roblox game codes, browse game rankings and explore rankings by genre. Independent Roblox game discovery guide.',robots:{index:true,follow:true},openGraph:{type:'website',siteName:'BloxRadar'},verification:{google:process.env.GOOGLE_SITE_VERIFICATION||undefined}};
export default function Layout({children}:{children:React.ReactNode}){
return <html lang="en"><body>
<header className="header"><div className="shell nav nav-new">
<Link href="/" className="logo" aria-label="BloxRadar home"><span className="mark">◆</span> Blox<span>Radar</span></Link>
<nav className="main-navigation" aria-label="Main navigation">
<Link className="nav-pill" href="/"><Home size={17} aria-hidden="true"/><span>Home</span></Link>
<Link className="nav-pill" href="/codes"><Gamepad2 size={17} aria-hidden="true"/><span>Game Codes</span></Link>
<Link className="nav-pill" href="/rankings"><Trophy size={17} aria-hidden="true"/><span>Rankings</span></Link>
</nav>
<div className="nav-right">
<form className="nav-search" action="/codes" method="get" role="search">
<input type="search" name="q" placeholder="Search games..." aria-label="Search Roblox games"/>
<button type="submit" aria-label="Search"><Search size={19} aria-hidden="true"/></button>
</form>
<Link className="nav-pill nav-about" href="/about"><Info size={17} aria-hidden="true"/><span>About</span></Link>
</div>
</div></header>
{children}
<footer><div className="shell foot"><div><strong>◆ BloxRadar</strong><p>Independent Roblox game discovery and code tracking. Not affiliated with Roblox Corporation.</p></div><div className="footlinks"><Link href="/about">About</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div></div></footer>
</body></html>}
