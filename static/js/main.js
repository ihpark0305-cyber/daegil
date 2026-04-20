
// ════════════════════════════════════════
//  대길 마법학교 v2 — main.js
// ════════════════════════════════════════
const MAGIC_TYPES=[
  {k:"수호 마법사",e:"🦁",c:"#c0392b",sym:"방패",desc:"든든하고 믿음직한, 곁을 지켜주는"},
  {k:"지혜 마법사",e:"🦉",c:"#2980b9",sym:"책",desc:"깊이 생각하고 신중한"},
  {k:"빛 마법사",  e:"🌟",c:"#f39c12",sym:"별",desc:"밝고 따뜻하게 주변을 빛내는"},
  {k:"치유 마법사",e:"🌿",c:"#27ae60",sym:"잎사귀",desc:"공감과 배려로 마음을 치유하는"},
  {k:"열정 마법사",e:"🔥",c:"#e67e22",sym:"불꽃",desc:"끈기있고 뜨거운 에너지의"},
  {k:"자유 마법사",e:"💫",c:"#8e44ad",sym:"바람",desc:"창의적이고 자유로운 영혼의"},
  {k:"고요 마법사",e:"🌙",c:"#34495e",sym:"달",desc:"조용하지만 깊고 단단한"},
  {k:"창조 마법사",e:"🎨",c:"#16a085",sym:"붓",desc:"섬세하고 독창적인 감각의"},
];
const STAGES=[
  {e:"🌱",l:"씨앗",req:0},{e:"🌿",l:"새싹",req:3},
  {e:"🍃",l:"잎사귀",req:7},{e:"🌸",l:"꽃봉오리",req:14},
  {e:"💐",l:"활짝 핀 꽃",req:30},{e:"🌺",l:"마법의 나무",req:60},
];
const QUIZ=[
  {q:"친구가 힘들어 보일 때 나는?",e:"🤝",opts:[
    {t:"🤗 말 걸고 위로해줘",s:{수호:2,치유:2,빛:1}},
    {t:"👀 조용히 옆에 있어줘",s:{고요:2,지혜:1,치유:1}},
    {t:"💡 해결책을 찾아줘",s:{지혜:2,열정:1,수호:1}},
  ]},
  {q:"나를 한 마디로 표현하면?",e:"🪞",opts:[
    {t:"🌡️ 따뜻한",s:{치유:2,빛:2,수호:1}},
    {t:"🧊 차분한",s:{고요:2,지혜:2,자유:1}},
    {t:"⚡ 에너지 넘치는",s:{열정:2,빛:1,자유:1}},
  ]},
  {q:"기분이 좋아지는 순간은?",e:"😊",opts:[
    {t:"🍽️ 맛있는 걸 먹을 때",s:{치유:2,빛:1,수호:1}},
    {t:"🎵 좋아하는 노래를 들을 때",s:{창조:2,자유:2,고요:1}},
    {t:"📱 핸드폰·TV를 볼 때",s:{고요:2,자유:1,빛:1}},
  ]},
  {q:"대길푸른초장에 와서 가장 좋은 것은?",e:"🌸",opts:[
    {t:"🎨 다양한 프로그램",s:{열정:2,창조:2,자유:1}},
    {t:"🌸 선생님·친구들",s:{빛:2,치유:2,수호:1}},
    {t:"✨ 실습 학생들",s:{수호:2,빛:1,치유:1}},
  ]},
  {q:"가장 하고 싶은 것은?",e:"💭",opts:[
    {t:"✈️ 여행을 떠나고 싶어",s:{자유:2,열정:2,빛:1}},
    {t:"😴 푹 자고 싶어",s:{고요:2,치유:1,자유:1}},
    {t:"💼 일을 하고 싶어",s:{열정:2,수호:2,지혜:1}},
  ]},
  {q:"나에게 더 가까운 것은?",e:"🌈",opts:[
    {t:"🌙 밤하늘처럼 고요한",s:{고요:2,지혜:1,창조:1}},
    {t:"☀️ 햇살처럼 따뜻한",s:{빛:2,치유:1,수호:1}},
    {t:"🌊 파도처럼 자유로운",s:{자유:2,열정:1,창조:1}},
  ]},
];
const EMOTIONS=[
  {e:"😊",l:"행복"},{e:"😌",l:"평온"},{e:"😔",l:"슬픔"},
  {e:"😤",l:"화남"},{e:"😰",l:"불안"},{e:"🥱",l:"지침"},
  {e:"🥰",l:"설렘"},{e:"😤",l:"답답"},{e:"🌟",l:"감사"},
];
const CHEERS=["대단해요! 🌟","응원해요! 💛","같이 있을게요! 🌿","정말 멋져요! ✨","힘내요! 🔥","최고예요! 🏆"];
const CARD_COLORS=["#4a2a9a","#1a5a3a","#8a2a2a","#2a4a8a","#6a1a6a","#2a5a5a","#6a4a1a","#1a4a5a"];
const SPELLS=["오늘도 충분히 잘하고 있어요 ✨","당신의 감정은 모두 유효해요 🌙","작은 한 걸음이 큰 변화를 만들어요 🌱","당신의 존재 자체가 빛이에요 ⭐","쉬어가도 괜찮아요 🌸","당신은 훨씬 강한 사람이에요 💪","오늘의 힘듦은 내일의 강함이 돼요 🔥","지금 이 순간도 소중한 기억이 돼요 💫"];
const PLANT_TYPES=[
  {id:'장미',color:'#ff6b9d',stem:'#2d6b1b',petal2:'#ff4081'},
  {id:'라일락',color:'#b39ddb',stem:'#5c3d7a',petal2:'#9575cd'},
  {id:'해바라기',color:'#ffc107',stem:'#558b2f',petal2:'#ff8f00'},
  {id:'벚꽃',color:'#f8bbd0',stem:'#8d6e63',petal2:'#f48fb1'},
  {id:'튤립',color:'#e91e63',stem:'#388e3c',petal2:'#c2185b'},
  {id:'민들레',color:'#fff176',stem:'#689f38',petal2:'#fdd835'},
  {id:'단풍나무',color:'#e53935',stem:'#5d4037',petal2:'#ef6c00'},
  {id:'무궁화',color:'#ce93d8',stem:'#33691e',petal2:'#ab47bc'},
];
const CAT_GRADIENTS={
  '일상':'linear-gradient(160deg,#3d1a6b 0%,#1a3a6b 100%)',
  '감정':'linear-gradient(160deg,#6b1a3d 0%,#3d1a6b 100%)',
  '음악':'linear-gradient(160deg,#1a3d6b 0%,#1a6b5a 100%)',
  '운동':'linear-gradient(160deg,#6b3d1a 0%,#1a6b1a 100%)',
  '응원':'linear-gradient(160deg,#6b5a1a 0%,#6b1a6b 100%)',
  '고민':'linear-gradient(160deg,#1a1a6b 0%,#3d1a3d 100%)',
  'all':'linear-gradient(160deg,#2a1a5a 0%,#1a2a5a 100%)',
};

// ── 상태 ──────────────────────────────────
let me=null, curPage='garden', todayEmo=null, breathIv=null;
let quizScores={}, selType=null, selColor=CARD_COLORS[0], selGender='미선택';
let curPostCat='일상', breathDone=false, curReelCat='all';
let postsCache=[];

// ── 유틸 ──────────────────────────────────
const $=id=>document.getElementById(id);
const $q=sel=>document.querySelector(sel);
const $qa=sel=>document.querySelectorAll(sel);

// ── 아바타 스프라이트 ──────────────────────
// avatars.jpg = 4열×2행 (남0~3 상단, 여0~3 하단)
function getAvatarHtml(name, gender){
  const hash=(name||'마법사').split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const col=hash%4;
  const row=(gender==='여')?1:(gender==='남')?0:hash%2;
  return `<div class="avatar-sprite-wrap"><img src="/static/img/avatars.jpg" class="avatar-sprite" style="left:-${col*100}%;top:-${row*100}%" alt=""></div>`;
}

// ── 활동 카운트 서버 동기화 ──────────────────
async function incActivity(){
  if(!me)return;
  me.activity_count=(me.activity_count||0)+1;
  localStorage.setItem('me_cache',JSON.stringify(me));
  try{
    await fetch('/api/user/update',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:me.id,activity_count:me.activity_count})});
  }catch(e){}
}

// ── 물주기 ────────────────────────────────
function getWaterData(){
  const today=new Date().toISOString().slice(0,10);
  const w=JSON.parse(localStorage.getItem('water_data')||'null');
  if(!w||w.date!==today) return {date:today,count:0};
  return w;
}
function saveWaterData(w){localStorage.setItem('water_data',JSON.stringify(w));}
async function waterPlant(){
  const today=new Date().toISOString().slice(0,10);
  const w=getWaterData();
  if(w.count>=3){toast('오늘 물을 다 줬어요 💧 내일 또 줄 수 있어요');return;}
  w.count++;saveWaterData(w);
  const wrap=$('plant-svg-wrap');
  if(wrap){wrap.classList.add('water-shake');setTimeout(()=>wrap.classList.remove('water-shake'),600);}
  await incActivity();
  toast(`물을 줬어요 💧 (${w.count}/3)`);
  const btn=$('water-btn');
  if(btn){btn.textContent=`💧 물주기 (${w.count}/3)`;if(w.count>=3){btn.disabled=true;btn.style.opacity='.4';}}
}

// ── 식물 SVG ──────────────────────────────
function renderPlantSVG(plantId,stage){
  const pt=PLANT_TYPES.find(p=>p.id===plantId)||PLANT_TYPES[0];
  const s=stage||0;
  const c=pt.color, c2=pt.petal2, stemCol=pt.stem;

  // 공통 defs: 그라디언트 + 필터
  const uid=plantId.replace(/[^a-z]/gi,'')+(s||0);
  const defs=`<defs>
    <radialGradient id="sg${uid}" cx="40%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#b87333"/>
      <stop offset="55%" stop-color="#7a4a1a"/>
      <stop offset="100%" stop-color="#3e2008"/>
    </radialGradient>
    <linearGradient id="stemG${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${stemCol}" stop-opacity=".7"/>
      <stop offset="40%" stop-color="${stemCol}"/>
      <stop offset="100%" stop-color="${stemCol}" stop-opacity=".8"/>
    </linearGradient>
    <radialGradient id="leafG${uid}" cx="35%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#8bc34a"/>
      <stop offset="60%" stop-color="${stemCol}"/>
      <stop offset="100%" stop-color="#1b5e20"/>
    </radialGradient>
    <radialGradient id="petalG${uid}" cx="30%" cy="20%" r="75%">
      <stop offset="0%" stop-color="${c2}"/>
      <stop offset="55%" stop-color="${c}"/>
      <stop offset="100%" stop-color="${c}" stop-opacity=".6"/>
    </radialGradient>
    <radialGradient id="budG${uid}" cx="40%" cy="25%" r="65%">
      <stop offset="0%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c}" stop-opacity=".8"/>
    </radialGradient>
    <filter id="dropshadow${uid}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,.4)"/>
    </filter>
    <filter id="glow${uid}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <linearGradient id="soilG${uid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#6d4c2a"/>
      <stop offset="100%" stop-color="#3e2308"/>
    </linearGradient>
  </defs>`;

  // 흙
  const soil=`
    <ellipse cx="80" cy="186" rx="62" ry="12" fill="url(#soilG${uid})" filter="url(#dropshadow${uid})"/>
    <ellipse cx="80" cy="183" rx="58" ry="8" fill="#8d6239" opacity=".45"/>
    <path d="M38 183 Q55 178 80 180 Q105 178 122 183" stroke="#5d3d1e" stroke-width="1.2" fill="none" opacity=".5"/>`;

  // 잎 path 헬퍼 (곡선 잎)
  function leaf(x,y,angle,size,flip){
    const s2=size||18;
    const f=flip?-1:1;
    return `<g transform="translate(${x},${y}) rotate(${angle})">
      <path d="M0 0 C${f*s2*0.6} ${-s2*0.9} ${f*s2*1.1} ${-s2*0.5} ${f*s2*0.8} 0 C${f*s2*0.5} ${s2*0.4} ${f*s2*0.1} ${s2*0.15} 0 0Z"
        fill="url(#leafG${uid})" opacity=".92"/>
      <path d="M0 0 L${f*s2*0.55} ${-s2*0.55}" stroke="#2e7d32" stroke-width=".9" fill="none" opacity=".5"/>
    </g>`;
  }

  // 줄기 path (살짝 곡선)
  function stem(x1,y1,x2,y2,w){
    const mx=(x1+x2)/2+((Math.random()>.5?1:-1)*3);
    return `<path d="M${x1} ${y1} Q${mx} ${(y1+y2)/2} ${x2} ${y2}"
      stroke="url(#stemG${uid})" stroke-width="${w}" stroke-linecap="round" fill="none"/>
      <path d="M${x1+1} ${y1} Q${mx+1} ${(y1+y2)/2} ${x2+1} ${y2}"
      stroke="rgba(255,255,255,.12)" stroke-width="${w*0.3}" stroke-linecap="round" fill="none"/>`;
  }

  let plant='';

  if(s===0){
    // 씨앗: 실사 타원 씨앗
    plant=`
      ${stem(80,182,80,174,2.5)}
      <ellipse cx="80" cy="170" rx="12" ry="9" fill="url(#sg${uid})" filter="url(#dropshadow${uid})"/>
      <path d="M80 161 Q83 165 80 179" stroke="rgba(0,0,0,.2)" stroke-width=".8" fill="none"/>
      <ellipse cx="77" cy="167" rx="3" ry="5" fill="rgba(255,255,255,.12)" transform="rotate(-15,77,167)"/>`;

  } else if(s===1){
    // 새싹: 가는 줄기 + 작은 떡잎
    plant=`
      ${stem(80,182,80,148,3.5)}
      ${leaf(72,156,-50,14,false)}
      ${leaf(88,156,50,14,true)}
      <ellipse cx="80" cy="145" rx="4" ry="5" fill="#a5d6a7" opacity=".8"/>
      <path d="M76 149 Q80 143 84 149" stroke="#81c784" stroke-width="1" fill="none"/>`;

  } else if(s===2){
    // 잎사귀: 중간 줄기 + 잎 4장
    plant=`
      ${stem(80,182,80,118,5)}
      ${leaf(67,158,-45,17)}
      ${leaf(93,158,45,17,true)}
      ${leaf(62,138,-38,16)}
      ${leaf(98,138,38,16,true)}
      <path d="M80 182 Q82 160 80 118" stroke="rgba(255,255,255,.08)" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;

  } else if(s===3){
    // 꽃봉오리: 튼튼한 줄기 + 잎 4-6장 + 봉오리
    plant=`
      ${stem(80,182,80,95,6.5)}
      ${leaf(62,160,-42,19)}
      ${leaf(98,160,42,19,true)}
      ${leaf(57,138,-35,17)}
      ${leaf(103,138,35,17,true)}
      <ellipse cx="80" cy="104" rx="7" ry="9" fill="#2e7d32" opacity=".9"/>
      <ellipse cx="74" cy="107" rx="5" ry="9" fill="#388e3c" opacity=".8" transform="rotate(-20,74,107)"/>
      <ellipse cx="86" cy="107" rx="5" ry="9" fill="#388e3c" opacity=".8" transform="rotate(20,86,107)"/>
      <ellipse cx="80" cy="93" rx="10" ry="14" fill="url(#budG${uid})" filter="url(#dropshadow${uid})"/>
      <ellipse cx="77" cy="88" rx="3" ry="7" fill="rgba(255,255,255,.18)" transform="rotate(-10,77,88)"/>`;

  } else if(s===4){
    // 활짝 핀 꽃
    const petals=[0,51,102,153,204,255,306].map((a,i)=>{
      const r=a*Math.PI/180;
      const dist=22;
      const px=(80+Math.cos(r)*dist).toFixed(1);
      const py=(72+Math.sin(r)*dist).toFixed(1);
      return `<ellipse cx="${px}" cy="${py}" rx="13" ry="8"
        fill="url(#petalG${uid})" opacity=".9"
        transform="rotate(${a},${px},${py})"
        filter="url(#dropshadow${uid})"/>`;
    }).join('');
    plant=`
      ${stem(80,182,80,85,7)}
      ${leaf(58,130,-40,20)}
      ${leaf(102,130,40,20,true)}
      ${leaf(54,155,-30,17)}
      ${leaf(106,155,30,17,true)}
      ${petals}
      <circle cx="80" cy="72" r="12" fill="${c2}" opacity=".85" filter="url(#dropshadow${uid})"/>
      <circle cx="80" cy="72" r="7" fill="#ffd54f"/>
      <circle cx="80" cy="72" r="3.5" fill="#ff8f00"/>
      ${[0,72,144,216,288].map(a=>{const r=a*Math.PI/180;return `<circle cx="${(80+Math.cos(r)*9).toFixed(1)}" cy="${(72+Math.sin(r)*9).toFixed(1)}" r="1.8" fill="#ffd54f" opacity=".7"/>`;}).join('')}`;

  } else {
    // 마법의 나무: 성숙한 나무 + 마법 효과
    const petals=[0,40,80,120,160,200,240,280,320].map(a=>{
      const r=a*Math.PI/180;
      const dist=26;
      const px=(80+Math.cos(r)*dist).toFixed(1);
      const py=(52+Math.sin(r)*dist).toFixed(1);
      return `<ellipse cx="${px}" cy="${py}" rx="15" ry="9"
        fill="url(#petalG${uid})" opacity=".93"
        transform="rotate(${a},${px},${py})"/>`;
    }).join('');
    plant=`
      <path d="M74 182 Q71 155 70 130 Q68 105 72 80" stroke="#5d4037" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M86 182 Q89 155 90 130 Q92 105 88 80" stroke="#4e342e" stroke-width="10" stroke-linecap="round" fill="none"/>
      <path d="M80 182 Q80 145 80 80" stroke="#795548" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M80 140 Q62 128 48 118" stroke="#5d4037" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M80 125 Q98 112 112 104" stroke="#5d4037" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M80 108 Q65 95 55 84" stroke="#4e342e" stroke-width="4" stroke-linecap="round" fill="none"/>
      ${leaf(50,117,-55,22)}${leaf(112,103,55,22,true)}${leaf(55,83,-45,19)}
      ${leaf(58,148,-38,19)}${leaf(100,148,38,19,true)}
      ${leaf(68,165,-25,16)}${leaf(92,165,25,16,true)}
      <ellipse cx="80" cy="52" rx="28" ry="24" fill="${stemCol}" opacity=".25" filter="url(#glow${uid})"/>
      ${petals}
      <circle cx="80" cy="52" r="14" fill="${c2}" opacity=".88" filter="url(#glow${uid})"/>
      <circle cx="80" cy="52" r="8" fill="#ffe082"/>
      <circle cx="80" cy="52" r="4" fill="#fff" opacity=".9"/>
      <g filter="url(#glow${uid})">
        ${[[-16,-22],[18,-28],[-22,5],[22,8],[-6,-38],[8,-36]].map(([dx,dy])=>`<text x="${80+dx}" y="${52+dy}" font-size="8" fill="${c2}" opacity=".8" text-anchor="middle">✦</text>`).join('')}
      </g>`;
  }

  return `<svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;max-width:200px">${defs}${soil}${plant}</svg>`;
}

function toast(msg,dur=2600){
  const t=$('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),dur);
}
function showScreen(id){
  $qa('.screen').forEach(s=>{s.classList.remove('on');s.style.display='none';});
  const el=$(id);el.style.display='block';el.classList.add('on');
}
function go(page){
  curPage=page;
  $qa('.page').forEach(p=>{p.classList.remove('on');p.style.display='none';});
  const pg=$('page-'+page);pg.style.display='flex';pg.classList.add('on');
  $qa('.nb').forEach(b=>b.classList.toggle('on',b.dataset.page===page));
  if(page==='garden')  renderGarden();
  if(page==='square')  loadPosts();
  if(page==='gallery') loadGallery();
  if(page==='record')  renderRecord();
  if(page==='survey')  renderSurvey();
  if(page==='admin')   renderAdmin();
  const fab=$('reels-fab');
  if(fab) fab.style.display=(page==='square')?'flex':'none';
}
function confetti(){
  const colors=['#D4AF37','#F0D060','#4CAF50','#8e44ad','#e67e22','#ff6b9d'];
  for(let i=0;i<50;i++){
    const el=document.createElement('div');el.className='confetti';
    const sz=7+Math.random()*7;
    el.style.cssText=`left:${Math.random()*100}vw;width:${sz}px;height:${sz}px;border-radius:${Math.random()>0.5?'50%':'2px'};background:${colors[0|Math.random()*colors.length]};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.4}s;top:-20px;`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),3200);
  }
}
function typeInfo(k){return MAGIC_TYPES.find(m=>m.k===k)||MAGIC_TYPES[0];}
function stageInfo(n){return STAGES[Math.min(n||0,STAGES.length-1)];}

// ── 별/파티클 ──────────────────────────────
function spawnStars(){
  const s=$('stars');
  for(let i=0;i<90;i++){
    const d=document.createElement('div');d.className='star';
    const sz=1+Math.random()*2.5;
    d.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}vw;top:${Math.random()*100}vh;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s;`;
    s.appendChild(d);
  }
}
function spawnParticles(){
  const c=$('particles');
  const items=['✨','⭐','🌟','💫','🪄','🌸','✦','·'];
  function spawn(){
    if(!$('screen-landing').classList.contains('on'))return;
    const el=document.createElement('div');el.className='fp';
    el.textContent=items[0|Math.random()*items.length];
    el.style.cssText=`left:${Math.random()*100}vw;bottom:-30px;font-size:${12+Math.random()*16}px;animation-duration:${7+Math.random()*8}s;`;
    c.appendChild(el);
    setTimeout(()=>el.remove(),15000);
    setTimeout(spawn,1000+Math.random()*1200);
  }
  spawn();
}

// ── 랜딩 ──────────────────────────────────
function openEnvelope(){
  $('env-flap').classList.add('open');
  setTimeout(()=>{
    const lo=$('letter-overlay');lo.style.display='flex';lo.classList.add('on');
  },650);
}
function startOnboard(){
  const lo=$('letter-overlay');lo.classList.remove('on');lo.style.display='none';
  const saved=localStorage.getItem('magic_name');
  if(saved){enterAsUser(saved);return;}
  $qa('.screen').forEach(s=>{s.classList.remove('on');s.style.display='none';});
  const ob=$('screen-onboard');ob.style.display='block';ob.classList.add('on');
  showOb('ob-name');
  setTimeout(()=>$('name-inp')?.focus(),120);
}

// ── 온보딩 스텝 ────────────────────────────
function showOb(id){
  $qa('[id^="ob-"]').forEach(el=>{el.style.display='none';});
  const el=$(id);if(el) el.style.display='flex';
}
function saveName(){
  const v=$('name-inp').value.trim();
  if(!v){toast('이름을 입력해주세요 ✨');return;}
  localStorage.setItem('magic_name',v);
  me={name:v,id:'tmp_'+Date.now(),activity_count:0,visit_streak:1,total_visits:1,plant_stage:0};
  quizScores={};
  showOb('ob-quiz');
  renderQuiz(0);
}
function saveNameAnon(){
  enterAsUser(null,true);
}

// ── 퀴즈 ──────────────────────────────────
function renderQuiz(idx){
  const q=QUIZ[idx];
  const prog=QUIZ.map((_,i)=>`<div class="qbar ${i<idx?'done':i===idx?'cur':''}"></div>`).join('');
  $('ob-quiz').innerHTML=`
    <div class="qprog">${prog}</div>
    <div class="qcard">
      <div class="qnum">질문 ${idx+1} / ${QUIZ.length}</div>
      <span class="qe">${q.e}</span>
      <div class="qt">${q.q}</div>
      <div class="qopts">
        ${q.opts.map((o,i)=>`<button class="qopt" onclick="answerQ(${idx},${i})">${o.t}</button>`).join('')}
      </div>
    </div>`;
}
function answerQ(qi,oi){
  const scores=QUIZ[qi].opts[oi].s;
  Object.entries(scores).forEach(([k,v])=>quizScores[k]=(quizScores[k]||0)+v);
  if(qi+1<QUIZ.length){renderQuiz(qi+1);return;}
  showSorting();
}
function showSorting(){
  showOb('ob-sorting');
  const orb=$('sort-orb');
  let t=0;
  const cols=MAGIC_TYPES.map(m=>m.c);
  const iv=setInterval(()=>{t++;orb.style.background=`radial-gradient(circle,${cols[t%cols.length]}44,#1a0a3e)`;orb.style.color=cols[t%cols.length];},280);
  setTimeout(()=>{clearInterval(iv);showQuizResult();},2600);
}
async function showQuizResult(){
  try{
    const r=await fetch('/api/quiz/result',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scores:quizScores})});
    const d=await r.json();
    selType=d.magic_type;
    const mt=typeInfo(selType);
    selColor=mt.c;
    $('ob-result').innerHTML=`
      <div class="flex col ac jc gap16 ta-c" style="flex:1;">
        <div class="res-badge" style="background:${mt.c}22;border-color:${mt.c};">${mt.e}</div>
        <div class="res-type">${selType}</div>
        <div class="res-desc">${mt.desc}</div>
        <div class="res-box">당신의 마법 에너지가 깨어나고 있어요 ✨<br>이제 마법사 신분증을 만들어봐요 🪪</div>
        <button class="btn btn-gold" onclick="startBreathing()">마법 호흡 의식 시작 →</button>
        <button class="btn btn-ghost btn-sm" onclick="skipBreathing()">건너뛰기</button>
      </div>`;
    showOb('ob-result');
  } catch(e) {
  console.error('퀴즈 결과 에러:', e);
  showProfile();}
}

// ── 호흡 ──────────────────────────────────
function startBreathing(){
  showOb('ob-breath');
  const phases=[{a:'들이쉬기',d:4,bg:'rgba(76,175,80,.3)'},{a:'참기',d:4,bg:'rgba(212,175,55,.3)'},{a:'내쉬기',d:6,bg:'rgba(100,100,255,.25)'}];
  let pi=0,cnt=0,cycle=0;
  const orb=$('breath-orb'),ba=$('b-action'),bn=$('b-num'),bc=$('b-cycle');
  function next(){
    const p=phases[pi];ba.textContent=p.a;
    orb.style.background=`radial-gradient(circle,${p.bg},#1a0a3e)`;
    if(pi===0)orb.style.transform='scale(1.28)';
    else if(pi===2)orb.style.transform='scale(.85)';
    else orb.style.transform='scale(1.08)';
    cnt=p.d;bn.textContent=cnt;
    clearInterval(breathIv);
    breathIv=setInterval(()=>{
      cnt--;bn.textContent=cnt;
      if(cnt<=0){
        clearInterval(breathIv);
        pi=(pi+1)%3;
        if(pi===0){cycle++;bc.textContent=cycle+'/3 사이클';}
        if(cycle>=3){clearInterval(breathIv);breathDone=true;showProfile();return;}
        next();
      }
    },1000);
  }
  next();
}
function skipBreathing(){clearInterval(breathIv);showProfile();}

// ── 프로필 ─────────────────────────────────
function showProfile(){
  showOb('ob-profile');
  const typeGrid=MAGIC_TYPES.map(m=>`
    <button class="type-btn ${m.k===selType?'sel':''}" onclick="pickType('${m.k}','${m.c}')">
      <span class="type-e">${m.e}</span><span style="font-size:13px">${m.k}</span>
    </button>`).join('');
  const colorDots=CARD_COLORS.map(c=>`
    <div class="cdot ${c===selColor?'sel':''}" data-color="${c}" style="background:${c}" onclick="pickColor('${c}')"></div>`).join('');
  const name=localStorage.getItem('magic_name')||'마법사';
  const savedPhoto=localStorage.getItem('my_photo');
  const photoEl=savedPhoto
    ?`<img id="photo-preview" src="${savedPhoto}" style="width:88px;height:110px;object-fit:cover;border-radius:10px;border:2px solid var(--gold3)">`
    :`<div id="photo-preview" style="width:88px;height:110px;border-radius:10px;border:2px solid var(--gold3);overflow:hidden">${getAvatarHtml(name,selGender)}</div>`;
  $('ob-profile').innerHTML=`
    <div class="ob-screen" style="padding-top:20px;overflow-y:auto;">
      <div class="steps"><div class="step done"></div><div class="step done"></div><div class="step done"></div><div class="step cur"></div></div>
      <div class="ob-crest">🪪</div>
      <div class="ob-title">마법사 신분증을 만들어요</div>
      <div class="prof-form" style="width:100%;max-width:440px;text-align:left;">
        <div class="sec"><label>사진 / 캐릭터</label>
          <div style="display:flex;align-items:center;gap:14px">
            <div style="position:relative">${photoEl}</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;gap:8px">
                <button class="gbtn ${selGender==='남'?'sel':''}" onclick="pickGender('남')">👨 남</button>
                <button class="gbtn ${selGender==='여'?'sel':''}" onclick="pickGender('여')">👩 여</button>
              </div>
              <label class="upload-btn">📷 사진 선택<input type="file" accept="image/*" style="display:none" onchange="handlePhotoUpload(this)"></label>
              ${savedPhoto?`<button class="gbtn" onclick="removePhoto()" style="font-size:12px">삭제</button>`:''}
            </div>
          </div>
        </div>
        <div class="sec"><label>마법사 유형 (재선택 가능)</label><div class="type-grid">${typeGrid}</div></div>
        <div class="sec"><label>나의 마법 ✨</label><input class="inp" id="prof-skill" placeholder="예: 웃기기, 요리, 듣기..."></div>
        <div class="sec"><label>좋아하는 것 💛</label><input class="inp" id="prof-fav" placeholder="예: 음악, 산책, 고양이..."></div>
        <div class="sec"><label>나에게 하는 주문 🔮</label><input class="inp" id="prof-spell" placeholder="예: 오늘도 괜찮아!"></div>
        <div class="sec"><label>카드 색상</label><div class="color-row">${colorDots}</div></div>
        <button class="btn btn-gold w100 mt16" onclick="finishOnboard()">정원으로 입장하기 🌱</button>
      </div>
    </div>`;
}
function pickType(k,c){selType=k;selColor=c;showProfile();}
function pickColor(c){
  selColor=c;
  $qa('#ob-profile .cdot').forEach(d=>d.classList.toggle('sel',d.dataset.color===c));
}
function pickGender(g){
  selGender=g;
  $qa('.gbtn').forEach(b=>b.classList.toggle('sel',b.textContent.includes(g==='남'?'남':'여')));
  const prev=$('photo-preview');
  if(prev&&!localStorage.getItem('my_photo')){
    const name=localStorage.getItem('magic_name')||'마법사';
    prev.innerHTML=getAvatarHtml(name,g);
  }
}
function handlePhotoUpload(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const canvas=document.createElement('canvas');
      const maxS=400;
      let w=img.width,h=img.height;
      if(w>h){if(w>maxS){h=h*maxS/w;w=maxS;}}else{if(h>maxS){w=w*maxS/h;h=maxS;}}
      canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      const b64=canvas.toDataURL('image/jpeg',0.82);
      localStorage.setItem('my_photo',b64);
      const prev=$('photo-preview');
      if(prev){
        prev.outerHTML=`<img id="photo-preview" src="${b64}" style="width:88px;height:110px;object-fit:cover;border-radius:10px;border:2px solid var(--gold3)">`;
      }
      toast('사진이 등록됐어요 📷');
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}
function removePhoto(){
  localStorage.removeItem('my_photo');
  showProfile();
}
async function finishOnboard(){
  const name=localStorage.getItem('magic_name');
  const skill=($('prof-skill')?.value||'').trim();
  const fav=($('prof-fav')?.value||'').trim();
  const spell=($('prof-spell')?.value||'').trim();
  const plantType=PLANT_TYPES[Math.floor(Math.random()*PLANT_TYPES.length)].id;
  const photoUrl=localStorage.getItem('my_photo')||null;
  try{
    await fetch('/api/user/update',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:me?.id,magic_type:selType,card_color:selColor,magic_skill:skill,favorite:fav,my_spell:spell,gender:selGender,plant_type:plantType,photo_url:photoUrl})});
  }catch(e){console.error('finishOnboard update error',e);}
  if(me){
    me.magic_type=selType;me.card_color=selColor;me.magic_skill=skill;
    me.favorite=fav;me.my_spell=spell;me.gender=selGender;
    me.plant_type=plantType;me.photo_url=photoUrl;
  }
  localStorage.setItem('me_cache',JSON.stringify(me));
  enterAsUser(name);
}

// ── 메인 진입 ──────────────────────────────
async function enterAsUser(name,anon=false){
  try{
    const r=await fetch('/api/user/enter',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name,anon})});
    const d=await r.json();
    if(d.error)throw new Error(d.error);
    // 서버 데이터를 기본으로 하되, 로컬에서 방금 저장한 값(me)이 있으면 우선 유지
    const prev=me||{};
    me=Object.assign({},d.user);
    // 방금 onboard에서 입력한 필드는 서버 응답이 null이면 로컬값 사용
    const keepFields=['magic_type','card_color','magic_skill','favorite','my_spell','gender','plant_type','photo_url'];
    keepFields.forEach(k=>{if(!me[k]&&prev[k])me[k]=prev[k];});
    localStorage.setItem('me_cache',JSON.stringify(me));
    if(anon)localStorage.setItem('magic_name',me.name);
  }catch(e){
    const c=JSON.parse(localStorage.getItem('me_cache')||'null');
    me=c||{name:name||'마법사',id:'local_'+Date.now(),activity_count:0,visit_streak:1,total_visits:1,plant_stage:0};
  }
  const st=stageInfo(me.plant_stage);
  $('nav-plant').textContent=st.e;
  $('nav-nm').textContent=me.name;
  $qa('.screen').forEach(s=>{s.classList.remove('on');s.style.display='none';});
  const main=$('screen-main');main.style.display='block';main.classList.add('on');
  go('garden');
  toast('✨ 어서오세요, '+me.name+'님!');
  // 오늘 감정 로드
  try{
    const er=await fetch('/api/emotion/month?user_id='+me.id+'&ym='+new Date().toISOString().slice(0,7));
    const ed=await er.json();
    const today=new Date().toISOString().slice(0,10);
    todayEmo=ed.calendar?.[today]||null;
  }catch(e){}
}

// ── 정원 ───────────────────────────────────
function renderGarden(){
  if(!me)return;
  const st=stageInfo(me.plant_stage);
  const next=STAGES[(me.plant_stage||0)+1];
  const visits=me.total_visits||1;
  const nextReq=next?next.req:STAGES[STAGES.length-1].req;
  const prevReq=st.req;
  const pct=next?Math.min(100,Math.round((visits-prevReq)/(nextReq-prevReq)*100)):100;
  const mt=typeInfo(me.magic_type);
  const stagesHtml=STAGES.map((s,i)=>{
    const unlocked=i<=(me.plant_stage||0);
    return `<div class="sp ${i===(me.plant_stage||0)?'cur':unlocked?'unl':''}"><span class="sp-e">${s.e}</span><span>${s.l}</span></div>`;
  }).join('');
  const emoHtml=todayEmo
    ?`<div class="emo-done">오늘의 감정: ${todayEmo} 기록 완료 🌟<br><span style="font-size:13px;color:var(--cream3)">내일 또 기록해요</span></div>`
    :`<div class="emo-grid">${EMOTIONS.map(em=>`<button class="emo-btn" onclick="saveEmotion('${em.e} ${em.l}')"><span class="emo-e">${em.e}</span><span class="emo-l">${em.l}</span></button>`).join('')}</div>`;
  const plantType=me.plant_type||(PLANT_TYPES[Math.floor(Math.random()*PLANT_TYPES.length)].id);
  const plantSvg=renderPlantSVG(plantType,me.plant_stage||0);
  const w=getWaterData();
  const waterDisabled=w.count>=3;
  $('page-garden').innerHTML=`
    <div class="garden-card">
      <div class="g-meta flex ac gap12">
        <div>
          <div class="g-name">${me.name}의 정원</div>
          <div class="g-badge">${mt.e} ${me.magic_type||'마법사'} · ${plantType}</div>
        </div>
        <div class="streak" style="margin-left:auto">🔥 <strong>${me.visit_streak||1}일</strong> 연속</div>
      </div>
      <div class="plant-center">
        <div class="plant-svg-wrap" id="plant-svg-wrap">${plantSvg}</div>
        <div class="plant-stage-lbl">${st.l}</div>
        <button class="water-btn ${waterDisabled?'disabled':''}" id="water-btn" onclick="waterPlant()" ${waterDisabled?'disabled':''} style="${waterDisabled?'opacity:.4':''}">
          💧 물주기 (${w.count}/3)
        </button>
      </div>
      <div class="stages-row">${stagesHtml}</div>
      <div class="prog-bar-wrap">
        <div class="prog-head"><span>성장 진행도</span><span>${visits} / ${nextReq} 방문</span></div>
        <div class="prog-bar"><div class="prog-fill" id="pfill" style="width:0%"></div></div>
      </div>
      <div class="chips">
        <div class="chip">총 방문 <strong>${visits}회</strong></div>
        <div class="chip">활동 <strong>${me.activity_count||0}회</strong></div>
        ${next?`<div class="chip">다음 단계까지 <strong>${nextReq-visits}회</strong></div>`:'<div class="chip">최고 단계 🏆</div>'}
      </div>
    </div>
    <div class="emo-box"><div class="box-title">✨ 오늘의 감정은?</div>${emoHtml}</div>
    <div class="spell-box">
      <div class="spell-lbl">✦ 오늘의 마법 주문 ✦</div>
      <div class="spell-txt" id="spell-txt">${SPELLS[0|Math.random()*SPELLS.length]}</div>
      <div class="spell-btns">
        <button class="spell-act" onclick="newSpell()">🔮 새 주문</button>
        <button class="spell-act" onclick="go('record')">📝 일기 쓰기</button>
      </div>
    </div>`;
  setTimeout(()=>{const f=$('pfill');if(f)f.style.width=pct+'%';},100);
}
async function saveEmotion(emo){
  todayEmo=emo;
  try{await fetch('/api/emotion',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:me.id,emotion:emo})});}catch(e){}
  await incActivity();
  toast('감정을 기록했어요 '+emo);
  renderGarden();
}
function newSpell(){
  const el=$('spell-txt');if(el)el.textContent=SPELLS[0|Math.random()*SPELLS.length];
}

// ── 광장 ───────────────────────────────────
function openPostModal(){
  const m=$('post-modal');m.style.display='flex';m.classList.add('on');
  setTimeout(()=>$('post-inp')?.focus(),100);
}
function closePostModal(){
  const m=$('post-modal');m.classList.remove('on');m.style.display='none';
}
async function loadPosts(cat){
  if(cat!==undefined) curReelCat=cat;
  $qa('.reel-filter .cat-btn').forEach(b=>b.classList.toggle('on',b.dataset.cat===curReelCat));
  const feed=$('feed');
  feed.className='feed-grid';
  feed.innerHTML='<div class="feed-empty">불러오는 중...</div>';
  try{
    const r=await fetch('/api/posts?category='+curReelCat);
    const d=await r.json();
    if(!d.posts?.length){
      postsCache=[];
      feed.innerHTML='<div class="feed-empty">아직 게시글이 없어요<br>첫 번째 글을 남겨봐요 ✨</div>';
      return;
    }
    postsCache=d.posts;
    feed.innerHTML=d.posts.map(p=>{
      const yid=p.yt_url?ytId(p.yt_url):'';
      const bgImg=yid
        ?`url(https://img.youtube.com/vi/${yid}/maxresdefault.jpg)`
        :CAT_GRADIENTS[p.category]||CAT_GRADIENTS['all'];
      return `<div class="feed-tile" style="background-image:${bgImg}" onclick="openFeedDetail('${p.id}')">
        <div class="feed-tile-overlay"></div>
        <div class="feed-tile-info">
          <span class="feed-tile-nm">${p.users?.name||'익명'}</span>
          <span class="feed-tile-cat">${p.category}</span>
        </div>
      </div>`;
    }).join('');
  }catch(e){feed.innerHTML='<div class="feed-empty">불러오기 실패 😢</div>';}
}
function openFeedDetail(pid){
  const p=postsCache.find(x=>String(x.id)===String(pid));
  if(!p)return;
  const mt=typeInfo(p.users?.magic_type);
  const ago=timeAgo(p.created_at);
  const yid=p.yt_url?ytId(p.yt_url):'';
  const isOwner=me&&p.user_id===me.id;
  const likes=p.likes||0;
  const cheerBtns=CHEERS.slice(0,4).map((c,i)=>`<button class="reel-cheer-btn" onclick="sendCheer('${p.id}','${c}',this)" title="${c}">${['✨','💛','🌿','🔥'][i]}</button>`).join('');
  const ownerBtns=isOwner?`<button class="reel-edit-btn" onclick="editFeedPost('${p.id}')">수정</button><button class="reel-edit-btn" onclick="deleteFeedPost('${p.id}')" style="color:#e88">삭제</button>`:'';

  if(yid){
    // YouTube 영상: iframe 재생 + 하단 정보
    $('feed-detail-body').innerHTML=`
      <div class="detail-card detail-card-yt">
        <button class="detail-close" onclick="closeFeedDetail()">✕</button>
        <div class="yt-embed-wrap">
          <iframe src="https://www.youtube.com/embed/${yid}?rel=0&playsinline=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
        <div class="yt-detail-bottom">
          <div class="yt-detail-right">
            <div class="reel-av" style="background:radial-gradient(circle,${p.users?.card_color||'#3d1a6b'},#1a0a3e)">${mt.e}</div>
            ${cheerBtns}
            <div class="reel-likes">${likes}</div>
          </div>
          <div class="yt-detail-info">
            <div class="reel-user">
              <span class="reel-nm">${p.users?.name||'익명'}</span>
              <span class="reel-cat">${p.category}</span>
              <span class="reel-time">${ago}</span>
              ${ownerBtns}
            </div>
            <div class="reel-content" id="fpb-${p.id}">${p.content}</div>
          </div>
        </div>
      </div>`;
  } else {
    // 일반 게시글: 그라디언트 배경
    const bgImg=CAT_GRADIENTS[p.category]||CAT_GRADIENTS['all'];
    $('feed-detail-body').innerHTML=`
      <div class="detail-card" style="background-image:${bgImg};background-size:cover;background-position:center">
        <div class="reel-bg-overlay"></div>
        <button class="detail-close" onclick="closeFeedDetail()">✕</button>
        <div class="reel-right">
          <div class="reel-av" style="background:radial-gradient(circle,${p.users?.card_color||'#3d1a6b'},#1a0a3e)">${mt.e}</div>
          ${cheerBtns}
          <div class="reel-likes">${likes}</div>
        </div>
        <div class="reel-bottom">
          <div class="reel-user">
            <span class="reel-nm">${p.users?.name||'익명'}</span>
            <span class="reel-cat">${p.category}</span>
            <span class="reel-time">${ago}</span>
            ${ownerBtns}
          </div>
          <div class="reel-content" id="fpb-${p.id}">${p.content}</div>
        </div>
      </div>`;
  }
  $('feed-detail-modal').style.display='flex';
}
function closeFeedDetail(){$('feed-detail-modal').style.display='none';}
function editFeedPost(pid){
  const el=$(`fpb-${pid}`);if(!el)return;
  const cur=el.textContent;
  el.innerHTML=`<textarea id="edit-fp-ta" class="inp" rows="3" style="width:100%;margin-bottom:6px">${cur}</textarea>
    <div style="display:flex;gap:6px">
      <button class="cheer-btn" onclick="saveFeedPost('${pid}')" style="font-size:11px;padding:4px 10px">저장</button>
      <button class="cheer-btn" onclick="closeFeedDetail()" style="font-size:11px;padding:4px 10px">취소</button>
    </div>`;
}
async function saveFeedPost(pid){
  const content=($('edit-fp-ta')?.value||'').trim();
  if(!content){toast('내용을 입력해주세요');return;}
  try{
    const r=await fetch(`/api/posts/${pid}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:me.id,content})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('수정됐어요 ✨');closeFeedDetail();loadPosts();
  }catch(e){toast('오류: '+e.message);}
}
async function deleteFeedPost(pid){
  if(!confirm('게시글을 삭제할까요?'))return;
  try{
    const r=await fetch(`/api/posts/${pid}`,{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:me.id})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('삭제했어요');closeFeedDetail();loadPosts();
  }catch(e){toast('오류: '+e.message);}
}
function ytId(url){
  // YouTube ID는 항상 11자리 [a-zA-Z0-9_-]
  // watch?v=, youtu.be/, shorts/, embed/ 모두 지원
  const m=url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m?m[1]:'';
}
function timeAgo(iso){
  const d=Date.now()-new Date(iso).getTime(),m=0|d/60000;
  if(m<1)return '방금';if(m<60)return m+'분 전';
  const h=0|m/60;if(h<24)return h+'시간 전';
  return (0|h/24)+'일 전';
}
function checkYT(){
  const url=$('post-yt-url')?.value||'';
  const id=ytId(url);
  const prev=$('yt-prev');
  if(!prev)return;
  if(id){prev.style.display='block';prev.querySelector('img').src=`https://img.youtube.com/vi/${id}/hqdefault.jpg`;}
  else{prev.style.display='none';}
}
async function submitPost(){
  const ta=$('post-inp'),yt=$('post-yt-url');
  const content=(ta?.value||'').trim();
  if(!content){toast('내용을 입력해주세요');return;}
  if(!me){toast('로그인이 필요해요');return;}
  try{
    const r=await fetch('/api/posts',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me.id,user_name:me.name||'익명',content,category:curPostCat,yt_url:yt?.value||''})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'서버 오류 '+r.status);
    ta.value='';if(yt)yt.value='';
    const prev=$('yt-prev');if(prev)prev.style.display='none';
    await incActivity();
    toast('게시글을 올렸어요 ✨');
    closePostModal();
    loadPosts();
  }catch(e){toast('오류가 발생했어요: '+e.message);}
}
function editPost(pid,btn){
  const bodyEl=$(`pb-${pid}`);if(!bodyEl)return;
  const cur=bodyEl.textContent;
  bodyEl.innerHTML=`<textarea id="edit-post-ta" class="inp" rows="3" style="width:100%;margin-bottom:6px">${cur}</textarea>
    <div style="display:flex;gap:6px">
      <button class="cheer-btn" onclick="savePost('${pid}')" style="font-size:11px;padding:4px 10px">저장</button>
      <button class="cheer-btn" onclick="loadPosts(undefined)" style="font-size:11px;padding:4px 10px">취소</button>
    </div>`;
}
async function savePost(pid){
  const content=($('edit-post-ta')?.value||'').trim();
  if(!content){toast('내용을 입력해주세요');return;}
  try{
    const r=await fetch(`/api/posts/${pid}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me.id,content})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('수정됐어요 ✨');loadPosts(undefined);
  }catch(e){toast('오류: '+e.message);}
}
async function deletePost(pid){
  if(!confirm('게시글을 삭제할까요?'))return;
  try{
    const r=await fetch(`/api/posts/${pid}`,{method:'DELETE',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me.id})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('삭제했어요');loadPosts(undefined);
  }catch(e){toast('오류: '+e.message);}
}
async function sendCheer(pid,msg,btn){
  try{
    const r=await fetch(`/api/posts/${pid}/cheer`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({msg,from_name:me?.name||''})});
    const d=await r.json();
    btn.style.background='rgba(212,175,55,.2)';btn.style.borderColor='var(--gold)';
    toast('✨ 응원을 보냈어요!');
  }catch(e){}
}

// ── 갤러리 ─────────────────────────────────
async function loadGallery(type='all'){
  $qa('.gallery-filter .cat-btn').forEach(b=>b.classList.toggle('on',b.dataset.type===type));
  const grid=$('gallery-grid');
  grid.innerHTML='<div style="text-align:center;padding:36px;color:var(--cream3)">불러오는 중...</div>';
  try{
    const r=await fetch('/api/gallery?type='+type);
    const d=await r.json();
    if(!d.users?.length){grid.innerHTML='<div style="text-align:center;padding:36px;color:var(--cream3)">아직 마법사가 없어요 🌱</div>';return;}
    grid.innerHTML=d.users.map(u=>{
      const mt=typeInfo(u.magic_type);
      const isMe=me&&u.id===me.id;
      const photoSrc=u.photo_url||(isMe?localStorage.getItem('my_photo'):null);
      const photoEl=photoSrc
        ?`<img src="${photoSrc}" class="idn-photo-img" style="object-fit:cover;width:100%;height:100%">`
        :getAvatarHtml(u.name,u.gender||'미선택');
      return `<div class="idn-card" style="--card-color:${u.card_color||'#1a4a1a'}">
        <div class="idn-hdr">
          <span class="idn-school">✦ 대길 마법학교 신분증 ✦</span>
          <span class="idn-badge">${mt.e} ${u.magic_type||'마법사'}</span>
        </div>
        <div class="idn-body">
          <div class="idn-photo-wrap">${photoEl}</div>
          <div class="idn-info">
            <div class="idn-row"><span class="idn-lbl">이 름</span><span class="idn-val idn-name">${u.name}${isMe?' 👈':''}</span></div>
            <div class="idn-row"><span class="idn-lbl">성 별</span><span class="idn-val">${u.gender||'미선택'}</span></div>
            <div class="idn-row"><span class="idn-lbl">마법유형</span><span class="idn-val">${u.magic_type||'-'}</span></div>
            <div class="idn-row"><span class="idn-lbl">나의마법</span><span class="idn-val">${u.magic_skill||'-'}</span></div>
            <div class="idn-row"><span class="idn-lbl">좋아하는것</span><span class="idn-val">${u.favorite||'-'}</span></div>
          </div>
        </div>
        ${u.my_spell?`<div class="idn-spell">"${u.my_spell}"</div>`:''}
        <div class="idn-footer">
          <span style="font-size:11px;color:rgba(255,255,255,.35)">활동 ${u.activity_count||0}회</span>
          <div style="display:flex;gap:5px;flex-wrap:wrap">
            ${isMe?`<button class="msend" onclick="openEditCard()" style="border-color:var(--gold)">✏️ 수정</button>`:''}
            ${!isMe?CHEERS.slice(0,2).map(c=>`<button class="msend" onclick="sendMagic('${u.id}','${c}')">✨ ${c}</button>`).join(''):''}
          </div>
        </div>
      </div>`;
    }).join('');
  }catch(e){grid.innerHTML='<div style="text-align:center;padding:36px;color:var(--cream3)">불러오기 실패 😢</div>';}
}
async function sendMagic(toId,msg){
  try{
    await fetch('/api/gallery/magic',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({to_id:toId,from_name:me?.name||'익명',msg})});
    toast('✨ 마법을 보냈어요!');
  }catch(e){toast('오류가 발생했어요');}
}
let _editPhotoB64=undefined; // undefined=변경없음, null=제거, string=새사진
function openEditCard(){
  if(!me)return;
  _editPhotoB64=undefined;
  const ov=$('overlay-edit');ov.style.display='flex';ov.classList.add('on');
  $('edit-skill').value=me.magic_skill||'';
  $('edit-fav').value=me.favorite||'';
  $('edit-spell').value=me.my_spell||'';
  const eg=$('edit-gender');if(eg)eg.value=me.gender||'미선택';
  // 기존 사진 미리보기
  const prev=$('edit-photo-preview');
  const existingPhoto=me.photo_url||localStorage.getItem('my_photo');
  if(prev){prev.innerHTML=existingPhoto?`<img src="${existingPhoto}" style="width:100%;height:100%;object-fit:cover">`:'📷';}
}
function previewEditPhoto(inp){
  const file=inp.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      // 캔버스로 압축 (최대 400px)
      const canvas=document.createElement('canvas');
      const maxS=400;
      let w=img.width,h=img.height;
      if(w>h){if(w>maxS){h=h*maxS/w;w=maxS;}}else{if(h>maxS){w=w*maxS/h;h=maxS;}}
      canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      const b64=canvas.toDataURL('image/jpeg',0.82);
      _editPhotoB64=b64;
      const prev=$('edit-photo-preview');
      if(prev)prev.innerHTML=`<img src="${b64}" style="width:100%;height:100%;object-fit:cover">`;
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
}
function clearEditPhoto(){
  _editPhotoB64=null;
  const prev=$('edit-photo-preview');if(prev)prev.innerHTML='📷';
  const inp=$('edit-photo-inp');if(inp)inp.value='';
}
async function saveEditCard(){
  const skill=$('edit-skill').value.trim();
  const fav=$('edit-fav').value.trim();
  const spell=$('edit-spell').value.trim();
  const gender=$('edit-gender')?.value||me.gender||'미선택';
  const payload={id:me.id,magic_skill:skill,favorite:fav,my_spell:spell,gender};
  if(_editPhotoB64!==undefined) payload.photo_url=_editPhotoB64; // null이면 제거
  try{
    await fetch('/api/user/update',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)});
    me.magic_skill=skill;me.favorite=fav;me.my_spell=spell;me.gender=gender;
    if(_editPhotoB64!==undefined){
      me.photo_url=_editPhotoB64;
      if(_editPhotoB64)localStorage.setItem('my_photo',_editPhotoB64);
      else localStorage.removeItem('my_photo');
    }
    localStorage.setItem('me_cache',JSON.stringify(me));
    closeOverlay('overlay-edit');
    toast('신분증을 수정했어요 ✨');
    loadGallery();
  }catch(e){toast('저장 실패');}
}
function closeOverlay(id){const ov=$(id);if(ov){ov.classList.remove('on');ov.style.display='none';}}

// ── 설문 ───────────────────────────────────
const SURVEY_QS=[
  {id:'q1',section:'🧠 자기 이해',q:'본 활동을 통해 나 자신에 대해 더 잘 알게 된 것 같나요?',type:'scale'},
  {id:'q2',section:'🧠 자기 이해',q:'면허증 제작을 통해 나 자신을 더 잘 표현할 수 있었나요?',type:'scale'},
  {id:'q3',section:'🌬️ 이완 효과',q:'마법 호흡 활동 후 마음이 편안해졌나요?',type:'scale'},
  {id:'q4',section:'🪪 신분증 제작',q:'나만의 신분증을 만드는 것이 즐거웠나요?',type:'scale'},
  {id:'q5',section:'🪪 신분증 제작',q:'신분증을 완성했나요?',type:'yn'},
  {id:'q6',section:'🤝 사회적 상호작용',q:'다른 마법사들의 신분증을 보는 것이 재미있었나요?',type:'scale'},
  {id:'q7',section:'⭐ 전반 만족도',q:'오늘 활동이 나에게 도움이 되었나요?',type:'scale'},
  {id:'q8',section:'⭐ 전반 만족도',q:'이 앱을 계속 이용하고 싶나요?',type:'yn'},
];
const SCALE_EMOJIS=['😞','😕','😐','🙂','😊'];

async function renderSurvey(){
  const pg=$('page-survey');if(!pg)return;
  // 오늘 이미 제출했는지 확인 (로컬에서)
  const today=new Date().toISOString().slice(0,10);
  const doneKey='survey_done_'+today;
  if(localStorage.getItem(doneKey)){
    pg.innerHTML=`
      <div class="section-title">📋 오늘의 만족도 설문</div>
      <div class="survey-done-card">
        <div style="font-size:56px;margin-bottom:16px">✅</div>
        <div style="font-family:var(--f2);font-size:20px;color:var(--gold2);margin-bottom:10px">오늘 설문을 완료했어요!</div>
        <div style="font-size:15px;color:var(--cream3);line-height:1.8">소중한 응답 감사해요 🌟<br>내일 또 참여할 수 있어요</div>
      </div>`;
    return;
  }
  // 섹션별로 그룹
  const sections={};
  SURVEY_QS.forEach(q=>{if(!sections[q.section])sections[q.section]=[];sections[q.section].push(q);});
  const surveyHtml=Object.entries(sections).map(([sec,qs])=>`
    <div class="survey-section">
      <div class="survey-sec-title">${sec}</div>
      ${qs.map(q=>q.type==='scale'?`
        <div class="survey-item" id="item-${q.id}">
          <div class="survey-q">${q.q}</div>
          <div class="survey-scale">
            ${SCALE_EMOJIS.map((em,i)=>`
              <button class="scale-btn" data-q="${q.id}" data-v="${i+1}" onclick="pickScale('${q.id}',${i+1})">
                <span class="scale-em">${em}</span>
                <span class="scale-num">${i+1}점</span>
              </button>`).join('')}
          </div>
        </div>` : `
        <div class="survey-item" id="item-${q.id}">
          <div class="survey-q">${q.q}</div>
          <div class="survey-yn">
            <button class="yn-btn" data-q="${q.id}" data-v="yes" onclick="pickYn('${q.id}',true)">✅ 예</button>
            <button class="yn-btn" data-q="${q.id}" data-v="no" onclick="pickYn('${q.id}',false)">❌ 아니오</button>
          </div>
        </div>`).join('')}
    </div>`).join('');

  pg.innerHTML=`
    <div class="section-title">📋 오늘의 만족도 설문</div>
    <div style="font-size:15px;color:var(--cream3);margin-bottom:4px;line-height:1.8">오늘 활동은 어떠셨나요?<br>솔직한 답변이 큰 도움이 돼요 💛</div>
    ${surveyHtml}
    <button class="btn btn-gold w100" onclick="submitSurvey()" id="survey-submit-btn">제출하기 ✨</button>`;
}

const _surveyAns={};
function pickScale(qid,val){
  _surveyAns[qid]=val;
  document.querySelectorAll(`.scale-btn[data-q="${qid}"]`).forEach(b=>{
    b.classList.toggle('sel',parseInt(b.dataset.v)===val);
  });
  document.getElementById('item-'+qid)?.classList.remove('survey-unanswered');
}
function pickYn(qid,val){
  _surveyAns[qid]=val;
  document.querySelectorAll(`.yn-btn[data-q="${qid}"]`).forEach(b=>{
    b.classList.toggle('sel',(b.dataset.v==='yes')===val);
  });
  document.getElementById('item-'+qid)?.classList.remove('survey-unanswered');
}
async function submitSurvey(){
  // 미응답 확인
  const unanswered=SURVEY_QS.filter(q=>_surveyAns[q.id]===undefined);
  if(unanswered.length){
    unanswered.forEach(q=>document.getElementById('item-'+q.id)?.classList.add('survey-unanswered'));
    toast('모든 문항에 답해주세요 🙏');return;
  }
  const btn=$('survey-submit-btn');btn.disabled=true;btn.textContent='제출 중...';
  try{
    const r=await fetch('/api/survey',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me?.id,..._surveyAns})});
    const d=await r.json();
    if(d.error){toast(d.error);btn.disabled=false;btn.textContent='제출하기 ✨';return;}
    const today=new Date().toISOString().slice(0,10);
    localStorage.setItem('survey_done_'+today,'1');
    confetti();toast('설문 완료! 감사해요 🌟');
    renderSurvey();
  }catch(e){toast('제출 실패');btn.disabled=false;btn.textContent='제출하기 ✨';}
}

// ── 기록 ───────────────────────────────────
async function renderRecord(){
  renderStats();
  await renderCalendar();
  await loadDiaries();
}
function renderStats(){
  const el=$('stats-grid');if(!el||!me)return;
  el.innerHTML=`
    <div class="stat-b"><div class="stat-n">${me.total_visits||1}</div><div class="stat-l">총 방문</div></div>
    <div class="stat-b"><div class="stat-n">${me.activity_count||0}</div><div class="stat-l">총 활동</div></div>
    <div class="stat-b"><div class="stat-n">${me.visit_streak||1}</div><div class="stat-l">연속 방문</div></div>`;
}
async function renderCalendar(){
  const now=new Date();const y=now.getFullYear(),mo=now.getMonth();
  const first=new Date(y,mo,1).getDay();const days=new Date(y,mo+1,0).getDate();
  const today=now.getDate();
  let calData={};
  try{
    const r=await fetch(`/api/emotion/month?user_id=${me?.id}&ym=${y}-${String(mo+1).padStart(2,'0')}`);
    const d=await r.json();calData=d.calendar||{};
  }catch(e){}
  const mNames=['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const dNames=['일','월','화','수','목','금','토'];
  let cells='';
  for(let i=0;i<first;i++)cells+=`<div class="cal-d"></div>`;
  for(let d=1;d<=days;d++){
    const ds=`${y}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const emo=calData[ds];
    cells+=`<div class="cal-d ${d===today?'today':''} ${emo?'has':''}">${d}${emo?`<span class="emo-dot">${emo.split(' ')[0]}</span>`:''}</div>`;
  }
  $('cal-container').innerHTML=`
    <div class="cal-card">
      <div class="cal-hdr"><div class="cal-title">📅 ${y}년 ${mNames[mo]}</div></div>
      <div class="cal-grid">
        ${dNames.map(d=>`<div class="cal-dh">${d}</div>`).join('')}${cells}
      </div>
    </div>`;
}
async function loadDiaries(){
  const list=$('diary-list');if(!list)return;
  try{
    const r=await fetch('/api/diary/list?user_id='+(me?.id||''));
    const d=await r.json();
    if(!d.diaries?.length){list.innerHTML='<div style="color:var(--cream3);text-align:center;padding:20px">아직 일기가 없어요 📝</div>';return;}
    list.innerHTML=d.diaries.map(di=>`<div class="diary-card">
      <div class="diary-date" style="display:flex;align-items:center;justify-content:space-between">
        <span>📅 ${di.date}</span>
        <div style="display:flex;gap:6px">
          <button class="cheer-btn" onclick="editDiary('${di.id}',this)" style="font-size:11px;padding:3px 8px">수정</button>
          <button class="cheer-btn" onclick="deleteDiary('${di.id}')" style="font-size:11px;padding:3px 8px;color:#e88">삭제</button>
        </div>
      </div>
      <div class="diary-body" id="db-${di.id}">${di.content}</div>
    </div>`).join('');
  }catch(e){}
}
function editDiary(id,btn){
  const bodyEl=$(`db-${id}`);if(!bodyEl)return;
  const cur=bodyEl.textContent;
  bodyEl.innerHTML=`<textarea id="edit-diary-ta" class="inp" rows="3" style="width:100%;margin-bottom:6px">${cur}</textarea>
    <div style="display:flex;gap:6px">
      <button class="cheer-btn" onclick="saveDiaryEdit('${id}')" style="font-size:11px;padding:4px 10px">저장</button>
      <button class="cheer-btn" onclick="loadDiaries()" style="font-size:11px;padding:4px 10px">취소</button>
    </div>`;
}
async function saveDiaryEdit(id){
  const content=($('edit-diary-ta')?.value||'').trim();
  if(!content){toast('내용을 입력해주세요');return;}
  try{
    const r=await fetch(`/api/diary/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me.id,content})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('수정됐어요 ✨');await loadDiaries();
  }catch(e){toast('오류: '+e.message);}
}
async function deleteDiary(id){
  if(!confirm('일기를 삭제할까요?'))return;
  try{
    const r=await fetch(`/api/diary/${id}`,{method:'DELETE',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({user_id:me.id})});
    const d=await r.json();
    if(!r.ok||!d.ok) throw new Error(d.error||'오류');
    toast('삭제했어요');await loadDiaries();await renderCalendar();renderStats();
  }catch(e){toast('오류: '+e.message);}
}
async function saveDiary(){
  const content=$('diary-inp').value.trim();
  if(!content){toast('내용을 입력해주세요');return;}
  if(!me){toast('로그인이 필요해요');return;}
  const btn=$('diary-save-btn');btn.disabled=true;btn.textContent='저장 중...';
  try{
    await fetch('/api/diary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user_id:me.id,content})});
    $('diary-inp').value='';
    await incActivity();
    toast('일기를 저장했어요 📝');confetti();
    await loadDiaries();await renderCalendar();renderStats();
  }catch(e){toast('저장 실패');}
  btn.disabled=false;btn.textContent='저장하기 ✨';
}



// ── INIT ───────────────────────────────────
spawnStars();
spawnParticles();
const savedName=localStorage.getItem('magic_name');
if(savedName){enterAsUser(savedName);}

// ── 관리자 ─────────────────────────────────
let adminPw = null;

async function renderAdmin(){
  if(!adminPw){ showAdminLogin(); return; }
  renderAdminPanel();
}

function showAdminLogin(){
  $('page-admin').innerHTML=`
    <div class="section-title">⚙️ 관리자</div>
    <div style="max-width:340px;width:100%">
      <div class="sec"><label>관리자 비밀번호</label>
        <input class="inp" id="admin-pw-inp" type="password" placeholder="비밀번호 입력"
          onkeydown="if(event.key==='Enter')tryAdminLogin()">
      </div>
      <button class="btn btn-gold btn-sm w100" onclick="tryAdminLogin()">로그인</button>
    </div>`;
}

async function tryAdminLogin(){
  const pw = $('admin-pw-inp')?.value||'';
  try{
    const r = await fetch('/api/admin/login',{method:'POST',
      headers:{'Content-Type':'application/json'},body:JSON.stringify({pw})});
    const d = await r.json();
    if(d.error){ toast('❌ '+d.error); return; }
    adminPw = pw;
    toast('✅ 관리자 로그인 성공!');
    renderAdminPanel();
  }catch(e){ toast('오류 발생'); }
}

async function renderAdminPanel(){
  $('page-admin').innerHTML=`
    <div class="flex sb ac" style="margin-bottom:14px">
      <div class="section-title" style="margin:0">⚙️ 관리자 패널</div>
      <button class="btn btn-ghost btn-xs" onclick="adminPw=null;renderAdmin()">로그아웃</button>
    </div>

    <div class="admin-card" style="margin-bottom:14px">
      <div class="admin-title">📊 마법사 현황</div>
      <div style="font-size:26px;font-weight:900;color:var(--gold);margin-bottom:12px" id="admin-total">-</div>
      <div class="dist-chart" id="dist-chart"></div>
    </div>

    <div class="admin-card" style="margin-bottom:14px">
      <div class="admin-title">🎬 진행 단계 컨트롤</div>
      <div class="stage-btns" id="stage-btns"></div>
    </div>

    <div class="admin-card" id="admin-survey-card" style="margin-bottom:14px">
      <div class="admin-title">📋 만족도 설문 결과</div>
      <div id="admin-survey-result"><div style="color:var(--cream3)">불러오는 중...</div></div>
    </div>

    <div class="admin-card" style="margin-bottom:14px">
      <div class="admin-title">🗑️ 마법사 프로필 관리</div>
      <div id="admin-user-list"><div style="color:var(--cream3)">불러오는 중...</div></div>
    </div>

    <div class="admin-card" style="margin-bottom:14px">
      <div class="admin-title">🔄 테스트 초기화</div>
      <div style="font-size:14px;color:var(--cream3);margin-bottom:12px;line-height:1.7">내 로컬 세션을 초기화해서<br>처음부터 다시 테스트할 수 있어요</div>
      <button class="btn btn-sm" style="background:rgba(200,50,50,.2);border:1.5px solid rgba(200,50,50,.5);color:#ff8080;" onclick="resetMySession()">🔄 내 세션 초기화 (처음부터)</button>
    </div>
    <div class="admin-card">
      <div class="admin-title">📱 QR 코드</div>
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div class="qr-box"><img id="qr-img" width="160" height="160" alt="QR"></div>
        <div>
          <div style="font-size:13px;color:var(--cream3);margin-bottom:6px">앱 URL</div>
          <div id="qr-url" style="font-family:var(--f3);font-size:12px;color:var(--gold);word-break:break-all"></div>
          <button class="btn btn-ghost btn-xs mt8" onclick="navigator.clipboard.writeText(location.origin).then(()=>toast('복사됨!'))">복사</button>
        </div>
      </div>
    </div>`;

  // 통계
  try{
    const r = await fetch('/api/admin/stats');
    const d = await r.json();
    $('admin-total').textContent = (d.total ?? d.users?.length ?? 0)+'명';
    const mc = Object.entries(d.dist||{}).sort((a,b)=>b[1]-a[1]);
    const maxCnt = mc[0]?.[1]||1;
    $('dist-chart').innerHTML = mc.map(([t,c])=>{
      const mt=typeInfo(t);
      const pct=Math.round(c/maxCnt*100);
      return `<div class="dist-row"><span class="dist-label">${mt.e} ${t.replace(' 마법사','')}</span><div class="dist-bar-bg"><div class="dist-bar" style="width:${pct}%;background:${mt.c}"></div></div><span class="dist-cnt">${c}</span></div>`;
    }).join('');
  }catch(e){}

  // 단계 버튼
  const ADMIN_STAGES=['온보딩 시작 (이름 입력)','마법사 분류 의식','신분증 만들기','졸업 앨범 보기','정원 가꾸기'];
  let curStageText='';
  try{const r=await fetch('/api/admin/stage');const d=await r.json();curStageText=d.stage;}catch(e){}
  $('stage-btns').innerHTML=ADMIN_STAGES.map(s=>`
    <button class="stage-btn ${curStageText===s?'on':''}" onclick="setStage('${s}')">${s}</button>`).join('');

  // 설문 결과
  try{
    const sr=await fetch('/api/admin/survey?pw='+encodeURIComponent(adminPw||''));
    const sd=await sr.json();
    const qLabels={q1:'본 활동 자기 이해',q2:'면허증 자기 표현',q3:'호흡 이완 효과',q4:'신분증 즐거움',q6:'갤러리 상호작용',q7:'전반 도움됨'};
    const avgRows=Object.entries(qLabels).map(([k,lbl])=>{
      const v=sd.avgs?.[k];
      const pct=v?Math.round((v/5)*100):0;
      return `<div class="dist-row">
        <span class="dist-label" style="font-size:12px;min-width:120px">${lbl}</span>
        <div class="dist-bar-bg"><div class="dist-bar" style="width:${pct}%;background:var(--gold)"></div></div>
        <span class="dist-cnt">${v??'-'}</span>
      </div>`;
    }).join('');
    $('admin-survey-result').innerHTML=`
      <div style="font-size:14px;color:var(--cream3);margin-bottom:12px">총 ${sd.count||0}건 응답</div>
      <div class="dist-chart" style="margin-bottom:14px">${avgRows||'<div style="color:var(--cream3)">응답 없음</div>'}</div>
      <div style="display:flex;gap:16px;font-size:14px;color:var(--cream2)">
        <span>🪪 신분증 완성: <strong style="color:var(--gold)">${sd.yes_q5||0}명</strong></span>
        <span>🔁 재참여 희망: <strong style="color:var(--gold)">${sd.yes_q8||0}명</strong></span>
      </div>`;
  }catch(e){if($('admin-survey-result'))$('admin-survey-result').innerHTML='<div style="color:var(--cream3)">불러오기 실패</div>';}

  // QR
  const url=location.origin;
  $('qr-url').textContent=url;
  $('qr-img').src=`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`;

  // 유저 목록
  await loadAdminUsers();
}

async function loadAdminUsers(){
  const el=$('admin-user-list');if(!el)return;
  try{
    const r = await fetch('/api/admin/users?pw='+encodeURIComponent(adminPw||''));
    const d = await r.json();
    if(d.error){el.innerHTML='<div style="color:var(--cream3)">불러오기 실패</div>';return;}
    if(!d.users?.length){el.innerHTML='<div style="color:var(--cream3)">등록된 마법사가 없어요</div>';return;}
    el.innerHTML=`
      <div style="font-size:13px;color:var(--cream3);margin-bottom:10px">총 ${d.users.length}명 · 클릭해서 삭제</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
      ${d.users.map(u=>{
        const mt=typeInfo(u.magic_type);
        const st=stageInfo(u.plant_stage);
        return `<div class="admin-user-row flex ac sb" style="padding:11px 14px;border:1.5px solid rgba(212,175,55,.25);border-radius:13px;background:rgba(255,255,255,.05);">
          <div class="flex ac gap8">
            <span style="font-size:22px">${mt.e}</span>
            <div>
              <div style="font-size:15px;color:var(--cream);font-weight:700">${u.name}</div>
              <div style="font-size:12px;color:var(--cream3)">${u.magic_type||'미분류'} · ${st.l} · 활동 ${u.activity_count||0}회</div>
            </div>
          </div>
          <button class="btn btn-xs" style="background:rgba(200,50,50,.2);border:1.5px solid rgba(200,50,50,.5);color:#ff8080;"
            onclick="confirmDeleteUser('${u.id}','${u.name}')">🗑️ 삭제</button>
        </div>`;
      }).join('')}
      </div>`;
  }catch(e){el.innerHTML='<div style="color:var(--cream3)">오류 발생</div>';}
}

function confirmDeleteUser(uid, name){
  if(!confirm(`"${name}" 마법사를 삭제할까요?\n(일기, 감정, 게시글 모두 삭제됩니다)`))return;
  deleteUser(uid);
}

async function deleteUser(uid){
  try{
    const r = await fetch('/api/admin/users/'+uid,{method:'DELETE',
      headers:{'Content-Type':'application/json'},body:JSON.stringify({pw:adminPw})});
    const d = await r.json();
    if(d.error){toast('❌ '+d.error);return;}
    toast('🗑️ 삭제 완료!');
    loadAdminUsers();
    // 통계 새로고침
    try{
      const r2=await fetch('/api/admin/stats');
      const d2=await r2.json();
      if($('admin-total'))$('admin-total').textContent=d2.total+'명';
    }catch(e){}
  }catch(e){toast('삭제 실패');}
}

async function setStage(s){
  try{
    await fetch('/api/admin/stage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({stage:s})});
    toast('진행 단계: '+s);
    renderAdminPanel();
  }catch(e){toast('오류');}
}

function resetMySession(){
  if(!confirm('내 로컬 세션을 초기화할까요?\n(서버 데이터는 유지됩니다)\n처음부터 다시 테스트됩니다.'))return;
  localStorage.removeItem('magic_name');
  localStorage.removeItem('me_cache');
  toast('✅ 초기화 완료! 2초 후 새로고침...');
  setTimeout(()=>location.reload(),2000);
}
