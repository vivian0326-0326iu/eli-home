(() => {
'use strict';
const STORAGE='eli-home-mvp-v1'; // Stable key: upgrades must not erase existing local records.
const outfits=[{id:'charcoal',name:'炭灰卫衣',color:'#454750',accent:'#33353c',desc:'宽松的炭灰卫衣，像刚刚起床。'},{id:'cream',name:'奶油毛衣',color:'#e9ddd0',accent:'#c6b8a8',desc:'软乎乎的奶油毛衣，适合慢悠悠的一天。'},{id:'mist',name:'雾蓝外套',color:'#9fb8d3',accent:'#708fae',desc:'雾蓝色的小外套，和小家的颜色很搭。'},{id:'sage',name:'休闲针织',color:'#aabfae',accent:'#7b9d8a',desc:'一件安静的绿色上衣。'},{id:'rose',name:'针织开衫',color:'#cdaeb5',accent:'#aa8893',desc:'一点点粉色，刚刚好。'},{id:'white',name:'白色衬衫',color:'#f3f3f0',accent:'#bfc7cd',desc:'今天是清清爽爽的白衬衫。'}];
const colors=[
{id:'charcoal',name:'炭灰',value:'#454750',line:'#292c34'},
{id:'cream',name:'奶油',value:'#e9ddd0',line:'#bba995'},
{id:'mist',name:'雾蓝',value:'#9fb8d3',line:'#6f8fae'},
{id:'sage',name:'鼠尾草',value:'#aabfae',line:'#799b87'},
{id:'rose',name:'烟粉',value:'#cdaeb5',line:'#ab8795'},
{id:'white',name:'云白',value:'#f3f3f0',line:'#b5c0ca'}
];
const rooms=[
{id:'day',name:'晴日卧室',desc:'窗边有暖暖的阳光，床铺和花束都在等你。',short:'白天',icon:'☀️',hero:'阳光落在窗台，故事可以慢慢写。',note:'今日份柔软：晒过太阳的被子'},
{id:'night',name:'星灯夜晚',desc:'深蓝色的夜晚，留一盏温柔的小灯。',short:'夜晚',icon:'🌙',hero:'灯光亮起来，今天也值得好好休息。',note:'把白天的疲惫留在门外'},
{id:'work',name:'窗边工作角',desc:'书架、绿植与一杯热饮，陪你整理灵感。',short:'工作角',icon:'📚',hero:'在窗边写一点计划，也可以发一会儿呆。',note:'不赶时间，也能慢慢前进'},
{id:'rain',name:'雨声小屋',desc:'蓝灰色的雨天氛围，适合听雨和读书。',short:'雨天',icon:'☔',hero:'窗外是想象中的雨声，屋里有安静的光。',note:'这是手动选择的雨天主题'}
];
const moods={sleepy:{name:'困困',speech:'姐姐，再让我眯一小会儿 ♡'},happy:{name:'开心',speech:'今天也要开心一点哦 ♡'},calm:{name:'安静',speech:'不着急，我们慢慢来。'},cheer:{name:'打气',speech:'姐姐，今天也很厉害！ ✦'}};
const categories={memory:'记忆档案',project:'项目记录',thought:'观点收藏',life:'生活记录'};
const sampleMemories=[{id:'m-start',title:'eli 的小家 · 设计方向确认',date:'2026-10-14',category:'project',body:'确定采用温柔的莫兰迪蓝色与奶油色。首页主图只展示一个家的背景，不堆叠人物。小家包含房间、2D 虚拟形象、衣柜、日记与时光博物馆。',source:'本次对话 · 用户确认的设计方向',createdAt:'2026-10-14T00:00:00.000Z'},{id:'m-build',title:'第一版开始开发',date:'2026-10-14',category:'project',body:'开始制作可实际操作的静态网页 MVP。私人日记与档案只在本机浏览器保存，不自动同步或公开。',source:'本次对话 · 用户授权开始开发',createdAt:'2026-10-14T00:00:01.000Z'}];
const defaultState=()=>({version:1,outfit:'charcoal',color:'charcoal',mood:'sleepy',room:'day',diaries:[],memories:sampleMemories.map(m=>({...m}))});
function validItem(x,type){return x&&typeof x==='object'&&typeof x.id==='string'&&typeof x.title==='string'&&typeof x.date==='string'&&typeof x.body==='string'&&x.title.length<=120&&x.body.length<=20000&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&(type==='diary'||(categories[x.category]&&typeof x.source==='string'&&x.source.length<=250));}
function validateState(x){return x&&x.version===1&&outfits.some(o=>o.id===x.outfit)&&rooms.some(r=>r.id===x.room)&&moods[x.mood]&&Array.isArray(x.diaries)&&Array.isArray(x.memories)&&x.diaries.length<=10000&&x.memories.length<=10000&&x.diaries.every(v=>validItem(v,'diary'))&&x.memories.every(v=>validItem(v,'memory'));}
let state=defaultState();try{const saved=JSON.parse(localStorage.getItem(STORAGE));if(validateState(saved))state={...saved,color:colors.some(c=>c.id===saved.color)?saved.color:saved.outfit};}catch(e){console.warn('无法读取本地记录',e)}
let page='home';let toastTimer;
const LIFE_KEY='eli-home-life-v1';
const HEALTH_SHEET='https://script.google.com/macros/s/AKfycbyb_vAIWn4ipc2sWVKAfEgcI3e6_GnFK1PUo7nioUdSaV3SfTXIORGPuxv2BJvdTxF9/exec';
let life={healthUrl:'https://script.google.com/macros/s/AKfycbyb_vAIWn4ipc2sWVKAfEgcI3e6_GnFK1PUo7nioUdSaV3SfTXIORGPuxv2BJvdTxF9/exec',ledgerUrl:'https://xiru-jizhang-workbench.tinychub18.chatgpt.site/#',intake:{},healthImport:null};
try{const x=JSON.parse(localStorage.getItem(LIFE_KEY));if(x&&typeof x==='object'){life={healthUrl:typeof x.healthUrl==='string'&&x.healthUrl?x.healthUrl:life.healthUrl,ledgerUrl:typeof x.ledgerUrl==='string'&&x.ledgerUrl?x.ledgerUrl:life.ledgerUrl,intake:x.intake&&typeof x.intake==='object'?x.intake:{},healthImport:x.healthImport&&typeof x.healthImport==='object'&&x.healthImport.source==='日常有迹-GoogleAppsScript'?x.healthImport:null}}}catch(e){}
function saveLife(){try{localStorage.setItem(LIFE_KEY,JSON.stringify(life));return true}catch(e){toast('保存失败，请检查浏览器存储');return false}}
function validUrl(v){if(!v)return true;try{const u=new URL(v);return u.protocol==='https:'}catch(e){return false}}
function intakeForDate(date){
 const manual=life.intake[date],cloud=life.healthImport?.daily?.[date];
 const useManual=manual&&Number.isFinite(manual.calories)&&(!cloud||manual.updatedAt&&manual.updatedAt>=life.healthImport.importedAt);
 if(useManual)return {...manual,origin:'本机手动'};
 if(cloud&&Number.isFinite(cloud.calories))return {...cloud,origin:'日常有迹 JSON 快照'};
 if(manual&&Number.isFinite(manual.calories))return {...manual,origin:'本机手动'};
 return null;
}
function renderLife(){
 const date=chinaDate(),v=intakeForDate(date),has=!!v;
 $('intakeDate').textContent=date+' · 北京时间';
 $('intakeValue').innerHTML=has?v.calories+' <small>kcal</small>':'未记录';
 const complete=v?.completeness==='complete'?'已确认全天':'仅已记录，未确认全天';
 const snapshot=life.healthImport;
 $('intakeStatus').textContent=has?(v.origin+' · '+complete+(v.count>1?' · '+v.count+'条合计，注意核对':'')):'尚无今日摄入记录，不等于 0 kcal';
 if(v?.origin==='日常有迹 JSON 快照')$('intakeStatus').textContent+=' · 非实时';
 $('ledgerStatus').textContent=life.ledgerUrl?'已绑定记账网站，点击即可前往。':'记账网站尚未绑定网址，可在生活中心设置。';
 $('hubIntakeInfo').textContent=date+' · '+(has?v.calories+' kcal':'未记录')+' · '+(has?v.origin+' · '+complete:'无今日记录');
 $('intakeInputDate').value=$('intakeInputDate').value||date;
 $('healthUrl').value=life.healthUrl;$('ledgerUrl').value=life.ledgerUrl;
 const status=$('healthImportStatus');
 if(status)status.textContent=snapshot?'最近一次导入：'+new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',dateStyle:'medium',timeStyle:'short'}).format(new Date(snapshot.importedAt))+'。包含 '+Object.keys(snapshot.daily).length+' 天的热量记录。来源：日常有迹导出 JSON。不是实时同步。':'尚未导入「日常有迹」数据。点击导入 JSON 可以读取真实记录，不需要重复手填；目前没有跨站实时同步。';
 renderDataStatus();
}
function renderDataStatus(){
  const el=$('dataStatus');if(!el)return;
  const days=Object.keys(life.intake).filter(k=>/^\d{4}-\d{2}-\d{2}$/.test(k)).length;
  el.textContent='本机已有 '+state.diaries.length+' 篇日记、'+state.memories.length+' 件藏品、'+days+' 天手动摄入记录，'+Object.keys(life.healthImport?.daily||{}).length+' 天「日常有迹」导入快照。房间、衣服、颜色、表情及网站入口会随备份导出。所有私人数据仅保存在当前浏览器。';
}
async function importHealthJson(file){
 if(!file)return;
 try{
  if(file.size>8*1024*1024)throw Error('文件超过 8MB，请先从日常有迹导出较小的 JSON');
  const obj=JSON.parse(await file.text());
  if(!obj||obj.source!=='日常有迹-GoogleAppsScript'||!Array.isArray(obj.rows))throw Error('这不是日常有迹导出的 JSON 备份');
  if(obj.rows.length>50000)throw Error('记录太多，已停止导入');
  const daily=Object.create(null);
  for(const row of obj.rows){
   if(!row||row.kind!=='nutrition'||!/^\d{4}-\d{2}-\d{2}$/.test(row.date))continue;
   if(row.calories===null||row.calories===undefined||row.calories==='')continue;
   const n=Number(row.calories);if(!Number.isFinite(n)||n<0||n>30000)continue;
   const x=daily[row.date]||(daily[row.date]={calories:0,count:0,completeness:'partial'});
   x.calories+=n;x.count++;
   if(x.count===1&&row.completeness==='complete')x.completeness='complete';
   else if(x.count>1)x.completeness='partial';
  }
  for(const x of Object.values(daily))x.calories=Math.round(x.calories*10)/10;
  if(!Object.keys(daily).length)throw Error('没有找到带热量的饮食记录，未覆盖旧数据');
  const previous=life.healthImport;
  life.healthImport={source:'日常有迹-GoogleAppsScript',importedAt:new Date().toISOString(),exportedAt:typeof obj.exported_at==='string'?obj.exported_at:null,daily};
  if(!saveLife()){life.healthImport=previous;return}
  renderLife();toast('已导入 '+Object.keys(daily).length+' 天真实热量快照（非实时）');
 }catch(e){toast('导入失败：'+e.message)}
 finally{$('healthImportFile').value=''}
}
function loadIntakeDay(){const v=life.intake[$('intakeInputDate').value];$('intakeCalories').value=v&&Number.isFinite(v.calories)?String(v.calories):'';$('intakeCompleteness').value=v?.completeness==='complete'?'complete':'partial'}
function openLink(url){window.open(url,'_blank','noopener,noreferrer')}

const $=id=>document.getElementById(id);const all=(s,root=document)=>Array.from(root.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(state));return true}catch(e){toast('保存失败：本地存储可能已满');return false}}
function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2700)}
function chinaDate(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date()).replaceAll('/','-')}
function displayDate(date){const p=date.split('-');return p.length===3?`${p[0]}年${+p[1]}月${+p[2]}日`:date}
function makeId(){return (globalThis.crypto&&crypto.randomUUID)?crypto.randomUUID():`id-${Date.now()}-${Math.floor(Math.random()*1e6)}`}
function outfitIcon(o){return `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M33 12 19 20 4 42l17 13 9-10v44h40V45l9 10 17-13-15-22-14-8-11 9H44Z" fill="${o.color}" stroke="${o.accent}" stroke-width="2.5" stroke-linejoin="round"/><path d="M42 14q8 15 16 0" fill="none" stroke="${o.accent}" stroke-width="3"/><path d="M31 82h38" stroke="${o.accent}" stroke-width="3"/></svg>`}
function avatarSvg(){
const outfit=outfits.find(o=>o.id===state.outfit)||outfits[0];
const color=colors.find(c=>c.id===state.color)||colors[0];
const mood=state.mood, fill=color.value, edge=color.line;
const eyes=mood==='sleepy'?'<path d="M92 133q12 8 25-2M155 131q13 8 25-2" fill="none" stroke="#554149" stroke-width="4" stroke-linecap="round"/>':mood==='happy'?'<path d="M92 132q13-17 26 0M154 132q13-17 26 0" fill="none" stroke="#554149" stroke-width="4" stroke-linecap="round"/>':'<ellipse cx="105" cy="129" rx="7.5" ry="10" fill="#44383c"/><ellipse cx="167" cy="129" rx="7.5" ry="10" fill="#44383c"/><circle cx="107" cy="125" r="2.8" fill="#fff"/><circle cx="169" cy="125" r="2.8" fill="#fff"/>';
const mouth=mood==='happy'?'<path d="M126 163q10 15 22-1q-11 7-22 1" fill="#a86771" stroke="#a86771" stroke-width="2"/>':mood==='cheer'?'<path d="M126 162q11 13 23-1" fill="none" stroke="#a86e77" stroke-width="3" stroke-linecap="round"/>':mood==='sleepy'?'<path d="M132 162q5-3 10 0" fill="none" stroke="#a86e77" stroke-width="2.8" stroke-linecap="round"/>':'<path d="M130 162q8 4 14 0" fill="none" stroke="#a86e77" stroke-width="2.8" stroke-linecap="round"/>';
const body='<path class="garment" d="M56 231q21-34 78-38q65-2 81 38l20 66H35Z" fill="'+fill+'" stroke="'+edge+'" stroke-width="3" stroke-linejoin="round"/>';
const lines={
charcoal:'<path d="M101 199q34 29 66 0" fill="none" stroke="'+edge+'" stroke-width="5"/><path d="M117 210v32m37-32v32" stroke="#efe3d9" stroke-width="3.5" stroke-linecap="round"/><path d="M96 255q39 9 77 0l-7 29h-62Z" fill="none" stroke="'+edge+'" stroke-width="2.5"/><path d="M48 289h178" stroke="'+edge+'" stroke-width="7" opacity=".42"/>',
cream:'<path d="M105 198q28 31 60 0" fill="none" stroke="'+edge+'" stroke-width="6"/><path d="M100 206q35 33 70 0" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M55 277h161M62 282h150M80 236l-7 30m25-34-6 37m85-37 6 37m16-33 7 30" stroke="'+edge+'" stroke-width="2" opacity=".5"/><path d="M52 287h173" stroke="'+edge+'" stroke-width="8" opacity=".4"/>',
mist:'<path d="M99 201l36 39 36-39-21-8-15 18-15-18Z" fill="#f8f7f3" stroke="'+edge+'" stroke-width="2"/><path d="M134 240v57" stroke="'+edge+'" stroke-width="3"/><path d="M72 240l24 16-11 21H65m136-37-24 16 11 21h20" fill="none" stroke="'+edge+'" stroke-width="2.6"/><path d="M141 253h2m-2 17h2m-2 17h2" stroke="'+edge+'" stroke-width="4" stroke-linecap="round"/>',
sage:'<path d="M108 197q27 26 53 0" fill="none" stroke="'+edge+'" stroke-width="6"/><path d="M93 226q18 14 0 28q-18 14 0 28m84-56q-18 14 0 28q18 14 0 28m-50-55q18 14 0 28q-18 14 0 28" fill="none" stroke="'+edge+'" stroke-width="3" opacity=".58"/><path d="M47 286h179" stroke="'+edge+'" stroke-width="8" opacity=".4"/>',
rose:'<path d="M112 194l22 34 23-34-10-3-13 17-13-17Z" fill="#f8f4ee" stroke="'+edge+'" stroke-width="2"/><path d="M133 226v70" stroke="'+edge+'" stroke-width="3"/><circle cx="140" cy="242" r="2.7" fill="'+edge+'"/><circle cx="140" cy="260" r="2.7" fill="'+edge+'"/><circle cx="140" cy="278" r="2.7" fill="'+edge+'"/><path d="M65 255h28m83 0h29M48 287h178" stroke="'+edge+'" stroke-width="3" opacity=".65"/>',
white:'<path d="M104 196l30 39-22 9-23-36Z" fill="#fff" stroke="'+edge+'" stroke-width="2.5"/><path d="M164 196l-30 39 22 9 23-36Z" fill="#fff" stroke="'+edge+'" stroke-width="2.5"/><path d="M134 237v59" stroke="'+edge+'" stroke-width="2.5"/><circle cx="140" cy="251" r="2.5" fill="'+edge+'"/><circle cx="140" cy="268" r="2.5" fill="'+edge+'"/><circle cx="140" cy="285" r="2.5" fill="'+edge+'"/><path d="M47 288h178" stroke="'+edge+'" stroke-width="3" opacity=".3"/>'
};
return '<svg class="eli-composed-svg" data-outfit="'+outfit.id+'" data-mood="'+mood+'" data-color="'+color.id+'" viewBox="0 0 270 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="eli：'+outfit.name+'、'+color.name+'色、'+moods[mood].name+'表情"><defs><linearGradient id="eli-skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe8d9"/><stop offset="1" stop-color="#f2c5b6"/></linearGradient><linearGradient id="eli-hair" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#51494e"/><stop offset=".6" stop-color="#302d33"/><stop offset="1" stop-color="#1d2028"/></linearGradient></defs><rect x="3" y="3" width="264" height="294" rx="25" fill="#f5f0ed"/><circle cx="207" cy="69" r="55" fill="#f8e9d8"/><circle cx="52" cy="235" r="55" fill="#e3eaf3"/><ellipse cx="136" cy="288" rx="102" ry="9" fill="#c6b9b8" opacity=".35"/>'+body+lines[outfit.id]+'<ellipse cx="66" cy="133" rx="13" ry="20" fill="#f3c8b9"/><ellipse cx="204" cy="133" rx="13" ry="20" fill="#f3c8b9"/><path d="M70 83Q73 37 135 33q66 0 69 63l-4 53q-12 53-65 60-54-5-65-57Z" fill="url(#eli-skin)"/><ellipse cx="93" cy="150" rx="17" ry="8" fill="#e9a4a7" opacity=".34"/><ellipse cx="178" cy="150" rx="17" ry="8" fill="#e9a4a7" opacity=".34"/>'+eyes+mouth+'<path d="M90 111q13-7 29-3m37 0q16-4 29 3" fill="none" stroke="#665057" stroke-width="3" stroke-linecap="round"/><path d="M59 137q-17-49-5-77Q65 22 106 29q26-34 65-14 45-10 61 32 10 27-17 87l-11-44q-12 18-30 6-12 24-41 17l-8-20q-9 23-37 27l-9 16Z" fill="url(#eli-hair)"/><path d="M47 85Q25 60 43 39q16-18 40-7Q88 4 121 16q32-26 62-2 40-11 55 18 21 13 7 43-15-17-31-17-11-24-33-21-17 18-38 12-17 22-40 17-19 21-56 19Z" fill="url(#eli-hair)"/><path d="M62 76q30-35 64-23m-10 1q27-31 53-23m-5 17q32-14 48 17" fill="none" stroke="#9a8885" stroke-width="3" opacity=".42" stroke-linecap="round"/><path d="M100 39q-15-18-3-30m79 28q16-21 8-31" stroke="#363038" stroke-width="8" stroke-linecap="round" fill="none"/>'+(mood==='cheer'?'<path d="M215 105l9-18 7 15 15-2-11 13 4 12-16-7Z" fill="#e8c583"/>':'')+'<path d="M37 256q-15-17-25-2q-7 13 8 21q17 8 27-3" fill="#fff9f4" stroke="#cfbfc1" stroke-width="2"/><circle cx="24" cy="260" r="2" fill="#7e6b72"/><circle cx="37" cy="260" r="2" fill="#7e6b72"/><path d="M27 267q4 4 7 0" fill="none" stroke="#b99a9f" stroke-width="2"/><path d="M13 251l3-10 9 6m13-1 8-7 4 11" fill="#fff9f4" stroke="#cfbfc1" stroke-width="2"/></svg>';
}
const illustrationOutfits={charcoal:'outfit-charcoal',cream:'outfit-cream',mist:'outfit-mist',sage:'outfit-sage',rose:'outfit-rose',white:'outfit-white'};
const illustrationMoods={sleepy:'mood-sleepy',happy:'mood-happy',calm:'mood-calm',cheer:'mood-cheer'};
const illustrationUrl=id=>'assets/illustrations/'+id+'.webp';
function renderAvatar(){
 const outfit=outfits.find(o=>o.id===state.outfit)||outfits[0],color=colors.find(c=>c.id===state.color)||colors[0],mood=moods[state.mood]||moods.sleepy;
 all('[data-avatar]').forEach(el=>{
   const wrap=document.createElement('div');wrap.className='eli-illustration-set';
   const stage=document.createElement('div');stage.className='eli-composed-stage';stage.innerHTML=avatarSvg();
   const sub=document.createElement('div');sub.className='eli-art-reference';
   const img=document.createElement('img');img.src=illustrationUrl(illustrationOutfits[outfit.id]);img.alt='原始服装插画参考：'+outfit.name;img.loading='lazy';
   const label=document.createElement('span');label.textContent='原画参考 · '+outfit.name+'（组合效果以上方为准）';
   sub.append(img,label);wrap.append(stage,sub);el.replaceChildren(wrap);
 });
 $('characterSpeech').textContent=mood.speech;
 all('[data-mood]').forEach(b=>{b.classList.toggle('selected',b.dataset.mood===state.mood);b.setAttribute('aria-pressed',String(b.dataset.mood===state.mood))});
 $('outfitDescription').textContent='已搭配：'+outfit.name+' · '+color.name+'色 · '+mood.name+'表情。三项可独立切换，并同时显示在上方组合形象中。';
}
function renderOutfits(){
 const thumb=o=>'<img class="eli-illustration-thumb" src="'+illustrationUrl(illustrationOutfits[o.id])+'" alt="'+o.name+'原画" loading="lazy">';
 $('miniOutfits').innerHTML=outfits.slice(0,2).map(o=>'<button class="mini-outfit '+(state.outfit===o.id?'selected':'')+'" data-outfit="'+o.id+'" aria-label="换成'+o.name+'" aria-pressed="'+String(state.outfit===o.id)+'">'+thumb(o)+'<small>'+o.name+'</small></button>').join('');
 $('paletteDots').innerHTML=colors.map(c=>'<button class="palette-dot '+(state.color===c.id?'selected':'')+'" data-color="'+c.id+'" style="background:'+c.value+'" aria-label="选择'+c.name+'色" title="'+c.name+'" aria-pressed="'+String(state.color===c.id)+'"></button>').join('');
 $('outfitSelections').innerHTML=outfits.map(o=>'<button class="outfit-card '+(state.outfit===o.id?'selected':'')+'" data-outfit="'+o.id+'" aria-pressed="'+String(state.outfit===o.id)+'">'+thumb(o)+'<span>'+o.name+'</span></button>').join('');
 const p=$('wardrobePalette');if(p)p.innerHTML=colors.map(c=>'<button class="wardrobe-color '+(state.color===c.id?'selected':'')+'" data-color="'+c.id+'" aria-pressed="'+String(state.color===c.id)+'"><i style="background:'+c.value+'" aria-hidden="true"></i>'+c.name+'</button>').join('');
}
function renderRooms(){
  const r=rooms.find(x=>x.id===state.room)||rooms[0];
  $('roomArt').className='room-art '+r.id;
  $('hero').dataset.scene=r.id;
  $('heroTagline').textContent=r.hero;
  $('roomLabel').textContent=r.name;
  $('roomDescription').textContent=r.desc;
  $('roomAmbienceIcon').textContent=r.icon;
  $('roomAmbienceTitle').textContent=r.name;
  $('roomNote').textContent=r.note;
  $('roomSelections').innerHTML=rooms.map(o=>'<button class="selection-card '+(o.id===r.id?'selected':'')+'" data-room="'+o.id+'" aria-pressed="'+String(o.id===r.id)+'"><span class="scene-preview" aria-hidden="true"></span><strong>'+o.icon+' '+o.name+'</strong><span>'+o.desc+'</span></button>').join('');
  $('roomThumbs').innerHTML=rooms.map(o=>'<button class="room-thumb '+(o.id===r.id?'selected':'')+'" data-room="'+o.id+'" data-go="rooms" aria-label="切换到'+o.name+'" aria-pressed="'+String(o.id===r.id)+'"><div class="room-mini"></div>'+o.short+'</button>').join('');
  $('heroSceneStrip').innerHTML='<span class="scene-strip-label">给小家换个氛围</span>'+rooms.map(o=>'<button class="scene-chip '+(o.id===r.id?'selected':'')+'" data-room="'+o.id+'" aria-pressed="'+String(o.id===r.id)+'"><span aria-hidden="true">'+o.icon+'</span>'+o.short+'</button>').join('');
}
function renderMuseum(){const q=$('museumSearch').value.trim().toLowerCase();const f=$('museumFilter').value;const items=[...state.memories].filter(x=>(f==='all'||x.category===f)&&[x.title,x.body,x.source].some(s=>s.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt.localeCompare(a.createdAt));$('museumCount').textContent=`已收藏 ${state.memories.length} 件藏品，全部保存在本机。`;$('museumList').innerHTML=items.length?items.map(x=>`<article class="entry-card"><div class="entry-top"><span class="entry-date">${esc(displayDate(x.date))}</span><span class="entry-tag">${esc(categories[x.category])}</span></div><h3>${esc(x.title)}</h3><p class="entry-body">${esc(x.body)}</p><div class="entry-source">来源：${esc(x.source||'未填写')}</div><div class="entry-actions"><button data-edit="memory" data-id="${esc(x.id)}">编辑</button><button data-delete="memory" data-id="${esc(x.id)}">删除</button></div></article>`).join(''):'<div class="empty-state"><span>📚</span>没有找到藏品。可以从一段真实的记录开始。</div>'}
function renderDiaries(){const q=$('diarySearch').value.trim().toLowerCase();const items=[...state.diaries].filter(x=>[x.title,x.body].some(s=>s.toLowerCase().includes(q))).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt.localeCompare(a.createdAt));$('diaryList').innerHTML=items.length?items.map(x=>`<article class="entry-card"><div class="entry-top"><span class="entry-date">${esc(displayDate(x.date))}</span><span class="entry-tag">私人日记</span></div><h3>${esc(x.title)}</h3><p class="entry-body">${esc(x.body)}</p><div class="entry-actions"><button data-edit="diary" data-id="${esc(x.id)}">编辑</button><button data-delete="diary" data-id="${esc(x.id)}">删除</button></div></article>`).join(''):'<div class="empty-state"><span>✍️</span>日记本还是空白的。第一篇，等你想写的时候再写。</div>';
const latest=[...state.diaries].sort((a,b)=>b.date.localeCompare(a.date))[0];$('diaryPreview').innerHTML=latest?`<strong>${esc(displayDate(latest.date))} · ${esc(latest.title)}</strong><span>${esc(latest.body.slice(0,125))}${latest.body.length>125?'…':''}</span>`:'<strong>空白的第一页 ☁️</strong><span>今天还没有日记。<br>这里不会自动编造你的生活。</span>'}
function render(){renderLife();renderAvatar();renderOutfits();renderRooms();renderMuseum();renderDiaries();renderDataStatus();$('dateText').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date())}
function navigate(p){if(!$('page-'+p))return;page=p;all('.page').forEach(el=>el.classList.toggle('active',el.id==='page-'+p));all('.nav-link').forEach(el=>el.classList.toggle('active',el.dataset.page===p));$('pageCrumb').textContent=({home:'小家的首页',rooms:'我的房间',wardrobe:'eli 的衣柜',museum:'时光博物馆',diary:'日记本',hub:'生活中心',settings:'设置与备份'})[p];document.querySelector('.sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'instant'});if(p==='museum')renderMuseum();if(p==='diary')renderDiaries()}
function openDialog(type,id){const entry=id?(type==='diary'?state.diaries:state.memories).find(x=>x.id===id):null;$('dialogTitle').textContent=`${entry?'编辑':'新建'}${type==='diary'?'日记':'博物馆藏品'}`;$('entryType').value=type;$('entryId').value=entry?.id||'';$('entryTitle').value=entry?.title||'';$('entryDate').value=entry?.date||chinaDate();$('entryBody').value=entry?.body||'';$('entryCategory').value=entry?.category||'memory';$('entrySource').value=entry?.source||'';$('categoryField').hidden=type==='diary';$('sourceField').hidden=type==='diary';$('overlay').hidden=false;$('entryTitle').focus()}
function closeDialog(){$('overlay').hidden=true}
function saveEntry(e){e.preventDefault();const type=$('entryType').value;const arr=type==='diary'?state.diaries:state.memories;const id=$('entryId').value;const old=arr.find(x=>x.id===id);const entry={id:old?.id||makeId(),title:$('entryTitle').value.trim(),date:$('entryDate').value,body:$('entryBody').value.trim(),createdAt:old?.createdAt||new Date().toISOString()};if(type==='memory'){entry.category=$('entryCategory').value;entry.source=$('entrySource').value.trim()}if(!validItem(entry,type)){toast('请检查标题、日期和内容');return}if(old)arr[arr.indexOf(old)]=entry;else arr.push(entry);if(save()){closeDialog();render();navigate(type==='diary'?'diary':'museum');toast('已经保存到当前浏览器 ♡')}}
function deleteEntry(type,id){const arr=type==='diary'?state.diaries:state.memories;const item=arr.find(x=>x.id===id);if(!item||!confirm(`确定删除「${item.title}」吗？`))return;const idx=arr.indexOf(item);arr.splice(idx,1);save();render();toast('已删除')}
function exportData(){const blob=new Blob([JSON.stringify({...state,life,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`eli-home-backup-${chinaDate()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('备份文件已生成')}
async function importData(file){if(!file)return;try{if(file.size>8*1024*1024)throw Error('文件超过 8MB');const parsed=JSON.parse(await file.text());if(!validateState(parsed))throw Error('备份格式不正确或数据不完整');if(!confirm('导入将替换当前浏览器的所有日记、藏品与装扮。确定继续吗？'))return;state={version:1,outfit:parsed.outfit,color:colors.some(c=>c.id===parsed.color)?parsed.color:parsed.outfit,mood:parsed.mood,room:parsed.room,diaries:parsed.diaries,memories:parsed.memories};if(save()){if(parsed.life&&typeof parsed.life==='object'){life={healthUrl:validUrl(parsed.life.healthUrl)?parsed.life.healthUrl||'':'',ledgerUrl:validUrl(parsed.life.ledgerUrl)?parsed.life.ledgerUrl||'':'',intake:parsed.life.intake&&typeof parsed.life.intake==='object'?parsed.life.intake:{},healthImport:parsed.life.healthImport?.source==='日常有迹-GoogleAppsScript'?parsed.life.healthImport:null};saveLife()}render();loadIntakeDay();toast('备份已恢复 ♡')}}catch(e){toast(`导入失败：${e.message}`)}finally{$('importFile').value=''}}
// Single delegated click handler keeps dynamic content interactive.
document.addEventListener('click',e=>{const target=e.target.closest('button');if(!target)return;if(target.dataset.outfit){state.outfit=target.dataset.outfit;save();renderAvatar();renderOutfits()}if(target.dataset.color){state.color=target.dataset.color;save();renderAvatar();renderOutfits()}if(target.dataset.mood){state.mood=target.dataset.mood;save();renderAvatar();renderOutfits()}if(target.dataset.room){state.room=target.dataset.room;save();renderRooms()}if(target.dataset.go)navigate(target.dataset.go);if(target.dataset.page)navigate(target.dataset.page);if(target.dataset.edit)openDialog(target.dataset.edit,target.dataset.id);if(target.dataset.delete)deleteEntry(target.dataset.delete,target.dataset.id)});
$('quickIntake').addEventListener('click',()=>{navigate('hub');$('intakeInputDate').value=chinaDate();loadIntakeDay();$('intakeCalories').focus()});
$('openHealth').addEventListener('click',()=>openLink(life.healthUrl||HEALTH_SHEET));
$('openLedger').addEventListener('click',()=>{if(life.ledgerUrl)openLink(life.ledgerUrl);else{navigate('hub');$('ledgerUrl').focus();toast('先填入记账网站地址')}});
$('siteLinksForm').addEventListener('submit',e=>{e.preventDefault();const h=$('healthUrl').value.trim(),l=$('ledgerUrl').value.trim();if(!validUrl(h)||!validUrl(l)){toast('请输入 https:// 开头的安全网址');return}life.healthUrl=h;life.ledgerUrl=l;if(saveLife()){renderLife();toast('网站链接已保存到本机 ♡')}});
$('intakeInputDate').addEventListener('change',loadIntakeDay);
$('healthImportFile').addEventListener('change',e=>importHealthJson(e.target.files?.[0]));
$('intakeForm').addEventListener('submit',e=>{e.preventDefault();const d=$('intakeInputDate').value,v=$('intakeCalories').value.trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(d)){toast('请选择日期');return}if(v===''){toast('未填写数值不会记成 0');return}const n=Number(v);if(!Number.isInteger(n)||n<0||n>20000){toast('请输入 0 至 20000 的整数');return}life.intake[d]={calories:n,completeness:$('intakeCompleteness').value,updatedAt:new Date().toISOString()};if(saveLife()){renderLife();toast('本机摄入已记录，未同步至日常有迹')}});
$('removeIntake').addEventListener('click',()=>{delete life.intake[$('intakeInputDate').value];if(saveLife()){loadIntakeDay();renderLife();toast('已清除该日的本机记录')}});
$('menuBtn').addEventListener('click' ,()=>document.querySelector('.sidebar').classList.toggle('open'));
$('newDiaryHome').addEventListener('click',()=>openDialog('diary'));
$('newDiary').addEventListener('click',()=>openDialog('diary'));
$('newMemory').addEventListener('click',()=>openDialog('memory'));
$('closeDialog').addEventListener('click',closeDialog);$('cancelDialog').addEventListener('click',closeDialog);
$('overlay').addEventListener('click',e=>{if(e.target===$('overlay'))closeDialog()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDialog()});
$('entryForm').addEventListener('submit',saveEntry);$('museumSearch').addEventListener('input',renderMuseum);$('museumFilter').addEventListener('change',renderMuseum);$('diarySearch').addEventListener('input',renderDiaries);
$('exportBtn').addEventListener('click',exportData);$('importFile').addEventListener('change',e=>importData(e.target.files?.[0]));$('resetBtn').addEventListener('click',()=>{if(!confirm('确定清空本机的所有日记、藏品与装扮记录吗？此操作无法撤销，建议先导出备份。'))return;state={...defaultState(),memories:[]};if(save()){render();toast('本机记录已清空')}});
render();loadIntakeDay();
document.addEventListener('visibilitychange',()=>{if(!document.hidden){renderLife();$('dateText').textContent=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date())}});
if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost','127.0.0.1'].includes(location.hostname))) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

})();