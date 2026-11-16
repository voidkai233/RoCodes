import {notFound} from 'next/navigation';
import Link from 'next/link';
import type {Metadata} from 'next';
import {catalog} from '../../../data/catalog';
import {manualContent} from '../../../data/manual-content';
import {getGames} from '../../../lib/roblox';
import {Thumb,CopyCode} from '../../components';

export async function generateStaticParams(){return catalog.map(g=>({id:String(g.id)}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
  const {id}=await params;
  const entry=catalog.find(x=>x.id===Number(id));
  return {title:entry?`All Working ${entry.name} Codes`:'Game Not Found',description:entry?`Working and expired ${entry.name} Roblox codes, redemption guide, and latest manually checked date.`:'Game not found'};
}

export default async function Page({params}:{params:Promise<{id:string}>}){
  const id=Number((await params).id);
  const entry=catalog.find(x=>x.id===id);
  if(!entry)notFound();
  const game=(await getGames()).find(x=>x.id===id);
  const custom=manualContent[id];
  const active=custom?.activeCodes ?? entry.codes.filter(c=>c.status==='active').map(c=>({code:c.code,reward:c.reward}));
  const expired=custom?.expiredCodes ?? entry.codes.filter(c=>c.status==='expired').map(c=>c.code);
  const guide=custom?.tutorial?.length?custom.tutorial:[{text:entry.guide}];
  const description=custom?.officialDescription || game?.description || entry.description;
  const checked=custom?.lastChecked;
  return <main className="shell code-page">
    <div className="pagehead"><Link className="more" href="/codes">← Browse all games</Link></div>
    <div className="code-layout">
      <article className="code-main">
        <div className="game-cover">
          {custom?.coverImage?<img src={custom.coverImage} alt={entry.name+' game cover'}/>:game?<Thumb game={game}/>:<div className="cover-fallback">◆</div>}
          <div className="cover-caption"><span className="eyebrow">{entry.category}</span><h1>{entry.name} Codes</h1></div>
        </div>
        <section className="code-section">
          <h2>About {entry.name}</h2>
          <p className="game-description">{description}</p>
          <p className="muted small">Game information: {custom?.officialDescription?'Manually entered description':'Roblox game listing / editorial summary'}. <a className="more" href={`https://www.roblox.com/games/${id}`} target="_blank" rel="noopener noreferrer">Official game page ↗</a></p>
        </section>
        <section className="code-section">
          <h2>All Working {entry.name} Codes</h2>
          <p className="muted">Last manually checked: <strong>{checked || 'Not yet verified'}</strong></p>
          <h3>Active Codes</h3>
          <div className="code-table-wrap"><table className="manual-codes"><thead><tr><th>Code</th><th>Copy</th></tr></thead><tbody>{active.length?active.map(item=><tr key={item.code}><td><span className="code-value">{item.code}</span>{item.reward&&<span className="code-reward">{item.reward}</span>}</td><td className="copy-cell"><CopyCode value={item.code}/></td></tr>):<tr><td colSpan={2} className="empty">No codes have been manually confirmed as working yet.</td></tr>}</tbody></table></div>
          <p className="muted small">Code availability can change at any time. The date above is updated manually after checking.</p>
        </section>
        <section className="code-section">
          <h2>Expired Codes</h2>
          {expired.length?<ul className="expired-list">{expired.map(code=><li key={code}>{code}</li>)}</ul>:<p className="muted">No expired codes have been added yet.</p>}
        </section>
        <section className="code-section tutorial">
          <h2>How to Redeem Codes in {entry.name}</h2>
          <div className="tutorial-steps">{guide.map((step,i)=><div className="tutorial-step" key={i}><div className="step-number">{i+1}</div><div><p>{step.text}</p>{step.image&&<img src={step.image} alt={step.imageAlt||`Redemption step ${i+1}`} loading="lazy"/>}</div></div>)}</div>
          <p className="muted small">Only redeem codes inside the official Roblox game. Never share your password with third-party code websites.</p>
        </section>
      </article>
      <aside className="code-sidebar" aria-label="Advertisement space">
        <div className="ad-placeholder"><span>ADVERTISEMENT</span><p>Reserved for a future display advertisement</p></div>
      </aside>
    </div>
  </main>;
}
