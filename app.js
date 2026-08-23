const ROOTS = [
  {label:'C', pc:0},{label:'C♯ / D♭',pc:1},{label:'D',pc:2},{label:'D♯ / E♭',pc:3},
  {label:'E',pc:4},{label:'F',pc:5},{label:'F♯ / G♭',pc:6},{label:'G',pc:7},
  {label:'G♯ / A♭',pc:8},{label:'A',pc:9},{label:'A♯ / B♭',pc:10},{label:'B',pc:11}
];
const NAMES_SHARP=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
const QUALITIES=[
  {id:'maj',suffix:''},{id:'min',suffix:'m'},
  {id:'7',suffix:'7'},{id:'m7',suffix:'m7'},
  {id:'maj7',suffix:'maj7'},{id:'sus2',suffix:'sus2'},
  {id:'sus4',suffix:'sus4'},{id:'dim',suffix:'dim'},
  {id:'aug',suffix:'aug'}
];
const PRIMARY_QUALITIES=['maj','min','7','m7','maj7','sus2','sus4'];

// frets are low E -> high E. -1 muted, 0 open. finger: 0 none, 1..4 fingers.
const OPEN={
  'C:maj':[{frets:[-1,3,2,0,1,0],f:[0,3,2,0,1,0]}],
  'C:7':[{frets:[-1,3,2,3,1,0],f:[0,3,2,4,1,0]}],
  'C:maj7':[{frets:[-1,3,2,0,0,0],f:[0,3,2,0,0,0]}],
  'C:sus2':[{frets:[-1,3,0,0,1,0],f:[0,3,0,0,1,0]}],
  'C:sus4':[{frets:[-1,3,3,0,1,1],f:[0,3,4,0,1,1]}],
  'D:maj':[{frets:[-1,-1,0,2,3,2],f:[0,0,0,1,3,2]}],
  'D:min':[{frets:[-1,-1,0,2,3,1],f:[0,0,0,2,3,1]}],
  'D:7':[{frets:[-1,-1,0,2,1,2],f:[0,0,0,2,1,3]}],
  'D:m7':[{frets:[-1,-1,0,2,1,1],f:[0,0,0,2,1,1]}],
  'D:maj7':[{frets:[-1,-1,0,2,2,2],f:[0,0,0,1,1,1]}],
  'D:sus2':[{frets:[-1,-1,0,2,3,0],f:[0,0,0,1,2,0]}],
  'D:sus4':[{frets:[-1,-1,0,2,3,3],f:[0,0,0,1,2,3]}],
  'E:maj':[{frets:[0,2,2,1,0,0],f:[0,2,3,1,0,0]}],
  'E:min':[{frets:[0,2,2,0,0,0],f:[0,2,3,0,0,0]}],
  'E:7':[{frets:[0,2,0,1,0,0],f:[0,2,0,1,0,0]}],
  'E:m7':[{frets:[0,2,0,0,0,0],f:[0,2,0,0,0,0]}],
  'E:maj7':[{frets:[0,2,1,1,0,0],f:[0,3,1,2,0,0]}],
  'E:sus4':[{frets:[0,2,2,2,0,0],f:[0,1,2,3,0,0]}],
  'F:maj':[{frets:[1,3,3,2,1,1],f:[1,3,4,2,1,1]}],
  'F:min':[{frets:[1,3,3,1,1,1],f:[1,3,4,1,1,1]}],
  'G:maj':[{frets:[3,2,0,0,0,3],f:[3,2,0,0,0,4]}],
  'G:7':[{frets:[3,2,0,0,0,1],f:[3,2,0,0,0,1]}],
  'G:maj7':[{frets:[3,2,0,0,0,2],f:[3,2,0,0,0,1]}],
  'G:sus4':[{frets:[3,3,0,0,1,3],f:[2,3,0,0,1,4]}],
  'A:maj':[{frets:[-1,0,2,2,2,0],f:[0,0,1,2,3,0]}],
  'A:min':[{frets:[-1,0,2,2,1,0],f:[0,0,2,3,1,0]}],
  'A:7':[{frets:[-1,0,2,0,2,0],f:[0,0,1,0,2,0]}],
  'A:m7':[{frets:[-1,0,2,0,1,0],f:[0,0,2,0,1,0]}],
  'A:maj7':[{frets:[-1,0,2,1,2,0],f:[0,0,2,1,3,0]}],
  'A:sus2':[{frets:[-1,0,2,2,0,0],f:[0,0,1,2,0,0]}],
  'A:sus4':[{frets:[-1,0,2,2,3,0],f:[0,0,1,2,3,0]}],
  'B:7':[{frets:[-1,2,1,2,0,2],f:[0,2,1,3,0,4]}]
};

function barreVoicing(rootPc, quality, form){
  // E form root locations: E=0. A form root locations: A=0.
  const basePc = form==='E' ? 4 : 9;
  const fret=(rootPc-basePc+12)%12;
  const q=quality;
  const patterns={
    E:{maj:[0,2,2,1,0,0],min:[0,2,2,0,0,0],7:[0,2,0,1,0,0],m7:[0,2,0,0,0,0],maj7:[0,2,1,1,0,0],sus2:[0,2,4,4,0,0],sus4:[0,2,2,2,0,0],dim:[0,1,2,0,2,0],aug:[0,3,2,1,1,0]},
    A:{maj:[-1,0,2,2,2,0],min:[-1,0,2,2,1,0],7:[-1,0,2,0,2,0],m7:[-1,0,2,0,1,0],maj7:[-1,0,2,1,2,0],sus2:[-1,0,2,2,0,0],sus4:[-1,0,2,2,3,0],dim:[-1,0,1,2,1,-1],aug:[-1,0,3,2,2,1]}
  };
  const p=patterns[form][q];
  const frets=p.map(x=>x<0?-1:x+fret);
  // Generic fingering; repeated 1s indicate a barre.
  const fingerE={maj:[1,3,4,2,1,1],min:[1,3,4,1,1,1],7:[1,3,1,2,1,1],m7:[1,3,1,1,1,1],maj7:[1,4,2,3,1,1],sus2:[1,2,3,4,1,1],sus4:[1,2,3,4,1,1],dim:[1,2,4,1,3,1],aug:[1,4,3,2,2,1]};
  const fingerA={maj:[0,1,3,3,3,1],min:[0,1,3,4,2,1],7:[0,1,3,1,4,1],m7:[0,1,3,1,2,1],maj7:[0,1,3,2,4,1],sus2:[0,1,3,4,1,1],sus4:[0,1,2,3,4,1],dim:[0,1,2,4,3,0],aug:[0,1,4,3,2,1]};
  return {frets,f:form==='E'?fingerE[q]:fingerA[q], form:`${form}-shape`};
}

function getVoicings(rootPc, q){
  const name=NAMES_SHARP[rootPc];
  const open=OPEN[`${name}:${q}`]||[];
  const all=[...open];
  for(const form of ['E','A']){
    const v=barreVoicing(rootPc,q,form);
    if(!all.some(x=>JSON.stringify(x.frets)===JSON.stringify(v.frets))) all.push(v);
  }
  return all.slice(0,3);
}

let selectedRoot=null, selectedQuality=null, voicings=[], voicingIndex=0, showMore=false;
const rootsEl=document.querySelector('#roots'), qualitiesEl=document.querySelector('#qualities');
const chordPanel=document.querySelector('#chordPanel'), qualityPanel=document.querySelector('#qualityPanel');
const moreBtn=document.querySelector('#moreBtn'), qualityTitle=document.querySelector('#qualityTitle');

ROOTS.forEach(r=>{const b=document.createElement('button');b.className='root-btn';b.textContent=r.label;b.onclick=()=>selectRoot(r,b);rootsEl.appendChild(b)});
qualityPanel.classList.add('disabled');

function rootName(){return selectedRoot ? NAMES_SHARP[selectedRoot.pc] : ''}
function renderQualityButtons(){
  qualitiesEl.innerHTML='';
  if(!selectedRoot){moreBtn.classList.add('hidden');return}
  qualityTitle.textContent=`2. אקורד ${rootName()}`;
  const visible=QUALITIES.filter(q=>PRIMARY_QUALITIES.includes(q.id) || showMore);
  visible.forEach(q=>{
    const b=document.createElement('button'); b.className='quality-btn';
    b.textContent=rootName()+q.suffix;
    b.classList.toggle('active',selectedQuality?.id===q.id);
    b.onclick=()=>selectQuality(q,b); qualitiesEl.appendChild(b);
  });
  moreBtn.classList.remove('hidden');
  moreBtn.textContent=showMore?'פחות':'עוד אקורדים';
}
function selectRoot(r,b){
  selectedRoot=r; selectedQuality=null; showMore=false;
  [...rootsEl.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');
  qualityPanel.classList.remove('disabled'); chordPanel.classList.add('hidden'); renderQualityButtons();
  setTimeout(()=>qualityPanel.scrollIntoView({behavior:'smooth',block:'nearest'}),30);
}
function selectQuality(q,b){selectedQuality=q;[...qualitiesEl.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');renderChord()}
moreBtn.onclick=()=>{showMore=!showMore;renderQualityButtons()};
function chordDisplayName(){return NAMES_SHARP[selectedRoot.pc]+selectedQuality.suffix}

function renderChord(){
  voicings=getVoicings(selectedRoot.pc,selectedQuality.id);voicingIndex=0;chordPanel.classList.remove('hidden');drawCurrent();addRecent(chordDisplayName());setTimeout(()=>chordPanel.scrollIntoView({behavior:'smooth',block:'start'}),30)
}
function drawCurrent(){
  const name=chordDisplayName(), v=voicings[voicingIndex];
  document.querySelector('#chordName').textContent=name;
  document.querySelector('#chordMeta').textContent=v.form?`אחיזה מבוססת ${v.form}`:'אחיזה פתוחה';
  document.querySelector('#voicingCounter').textContent=`${voicingIndex+1} / ${voicings.length}`;
  document.querySelector('#prevVoicing').disabled=voicingIndex===0;
  document.querySelector('#nextVoicing').disabled=voicingIndex===voicings.length-1;
  drawDiagram(v);renderInstructions(v);renderFavStar(name)
}

document.querySelector('#prevVoicing').onclick=()=>{if(voicingIndex>0){voicingIndex--;drawCurrent()}};
document.querySelector('#nextVoicing').onclick=()=>{if(voicingIndex<voicings.length-1){voicingIndex++;drawCurrent()}};

function drawDiagram(v){
  const svg=document.querySelector('#diagram');svg.innerHTML='';
  const NS='http://www.w3.org/2000/svg'; const add=(tag,attrs,text)=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,val])=>e.setAttribute(k,val));if(text)e.textContent=text;svg.appendChild(e);return e};
  const x0=55,xGap=46,yTop=82,yGap=62;
  const active=v.frets.filter(f=>f>0); let start=1;if(active.length && Math.max(...active)>5) start=Math.min(...active);
  add('text',{x:170,y:34,'text-anchor':'middle','font-size':26,'font-weight':800,'direction':'ltr'},chordDisplayName());
  if(start>1)add('text',{x:25,y:yTop+37,'font-size':16,'font-weight':700},`${start}fr`);
  // strings
  for(let s=0;s<6;s++)add('line',{x1:x0+s*xGap,y1:yTop,x2:x0+s*xGap,y2:yTop+4*yGap,stroke:'#40515b','stroke-width':2});
  // frets
  for(let i=0;i<=4;i++)add('line',{x1:x0,y1:yTop+i*yGap,x2:x0+5*xGap,y2:yTop+i*yGap,stroke:'#40515b','stroke-width':i===0&&start===1?8:2});
  const stringNames=['E','A','D','G','B','E'];
  for(let s=0;s<6;s++){
    const fret=v.frets[s], x=x0+s*xGap;
    add('text',{x,y:65,'text-anchor':'middle','font-size':18,'font-weight':700,fill:fret===-1?'#9a3a3a':'#40515b'},fret===-1?'×':fret===0?'○':'');
    add('text',{x,y:365,'text-anchor':'middle','font-size':15,fill:'#75858f'},stringNames[s]);
    if(fret>0){const rel=fret-start+1;if(rel>=1&&rel<=4){const cy=yTop+(rel-.5)*yGap;add('circle',{cx:x,cy,r:18,fill:'#0b5e83'});add('text',{x,y:cy+6,'text-anchor':'middle','font-size':16,'font-weight':800,fill:'#fff'},String(v.f[s]||''));}}
  }
  add('text',{x:170,y:405,'text-anchor':'middle','font-size':14,fill:'#75858f'},'מיתר 6 ←        → מיתר 1');
}

function renderInstructions(v){
  const names=['6 (מי נמוך)','5 (לה)','4 (רה)','3 (סול)','2 (סי)','1 (מי גבוה)'];
  const items=[];
  v.frets.forEach((fr,i)=>{if(fr===-1)items.push(`מיתר ${names[i]}: לא לנגן`);else if(fr===0)items.push(`מיתר ${names[i]}: פתוח`);else items.push(`מיתר ${names[i]}: סריג <b>${fr}</b>, אצבע <b>${v.f[i]||'–'}</b>`)});
  document.querySelector('#instructions').innerHTML=items.join('<br>');
}

function readList(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}}
function writeList(key,x){localStorage.setItem(key,JSON.stringify(x))}
function addRecent(name){let a=readList('recent').filter(x=>x!==name);a.unshift(name);writeList('recent',a.slice(0,6));renderLists()}
function renderLists(){renderChips('recent',readList('recent'),'עדיין אין אקורדים');renderChips('favorites',readList('favorites'),'אפשר לשמור עם ☆')}
function renderChips(id,arr,empty){const el=document.getElementById(id);el.innerHTML='';if(!arr.length){el.innerHTML=`<span class="empty">${empty}</span>`;return}arr.forEach(name=>{const b=document.createElement('button');b.className='chip';b.textContent=name;b.onclick=()=>loadByName(name);el.appendChild(b)})}
function loadByName(name){
  const roots=NAMES_SHARP.map((n,i)=>({n,i})).sort((a,b)=>b.n.length-a.n.length);const rr=roots.find(r=>name.startsWith(r.n));if(!rr)return;const suffix=name.slice(rr.n.length);const q=QUALITIES.find(q=>q.suffix===suffix);if(!q)return;
  selectedRoot=ROOTS.find(r=>r.pc===rr.i);selectedQuality=q;[...rootsEl.children].forEach((x,i)=>x.classList.toggle('active',ROOTS[i].pc===rr.i));qualityPanel.classList.remove('disabled');showMore=!PRIMARY_QUALITIES.includes(q.id);renderQualityButtons();renderChord();
}
function renderFavStar(name){document.querySelector('#favBtn').textContent=readList('favorites').includes(name)?'★':'☆'}
document.querySelector('#favBtn').onclick=()=>{const name=chordDisplayName();let a=readList('favorites');a=a.includes(name)?a.filter(x=>x!==name):[name,...a].slice(0,12);writeList('favorites',a);renderFavStar(name);renderLists()};
renderLists();

let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.querySelector('#installBtn').classList.remove('hidden')});
document.querySelector('#installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.querySelector('#installBtn').classList.add('hidden')};
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
