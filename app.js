const drugs = [
  {name:'アミカシン', en:'Amikacin', group:'アミノグリコシド系', dose:'15〜20 mg/kg/日', calc:[15,20], split:'1日1回、または7.5 mg/kgを8時間ごと', max:'—', route:'静注 / 筋注', page:1},
  {name:'ゲンタマイシン', en:'Gentamicin', group:'アミノグリコシド系', dose:'5〜7 mg/kg/日', calc:[5,7], split:'1日1回、または2.5 mg/kgを8時間ごと', max:'105 mg/日', route:'静注 / 筋注', page:1},
  {name:'トブラマイシン', en:'Tobramycin', group:'アミノグリコシド系', dose:'5〜7 mg/kg/日', calc:[5,7], split:'1日1回、または2.5 mg/kgを8時間ごと', max:'—', route:'静注 / 筋注', page:1},
  {name:'ストレプトマイシン', en:'Streptomycin', group:'アミノグリコシド系', dose:'15〜30 mg/kg/日', calc:[15,30], split:'1日1回、または2.5 mg/kgを8時間ごと', max:'—', route:'筋注', page:1},
  {name:'エルタペネム', en:'Ertapenem', group:'カルバペネム系', dose:'生後3か月〜12歳：30 mg/kg/日', calc:[30,30], split:'12時間ごとに分割。13歳以上：24時間ごと', max:'1 g/日', route:'静注 / 筋注', page:2},
  {name:'イミペネム・シラスタチン', en:'Imipenem / Cilastatin', group:'カルバペネム系', dose:'25 mg/kg/回', calc:[25,25], split:'生後1週〜4週：12時間ごと / 生後4週〜3か月：6時間ごと', max:'4 g/日', route:'静注', page:2},
  {name:'メロペネム', en:'Meropenem', group:'カルバペネム系', dose:'通常量：60 mg/kg/日', calc:[60,60], split:'8時間ごとに分割。髄膜炎・嚢胞性線維症：120 mg/kg/日', max:'6 g/日', route:'静注', page:2},
  {name:'セファドロキシル', en:'Cefadroxil', group:'第1世代セファロスポリン（経口）', dose:'30 mg/kg/日', calc:[30,30], split:'12時間ごとに分割', max:'2 g/日', route:'経口', page:3},
  {name:'セファレキシン', en:'Cephalexin', group:'第1世代セファロスポリン（経口）', dose:'25〜100 mg/kg/日', calc:[25,100], split:'6時間ごとに分割', max:'4 g/日', route:'経口', page:3},
  {name:'セファクロル', en:'Cefaclor', group:'第2世代セファロスポリン（経口）', dose:'20〜40 mg/kg/日', calc:[20,40], split:'8〜12時間ごとに分割', max:'1 g/日', route:'経口', page:3},
  {name:'セフプロジル', en:'Cefprozil', group:'第2世代セファロスポリン（経口）', dose:'15〜30 mg/kg/日', calc:[15,30], split:'12時間ごとに分割。急性中耳炎は30 mg/kg/日', max:'1 g/日', route:'経口', page:3},
  {name:'セフジニル', en:'Cefdinir', group:'第3世代セファロスポリン（経口）', dose:'14 mg/kg/日', calc:[14,14], split:'12〜24時間ごとに分割', max:'—', route:'経口', page:3},
  {name:'セフィキシム', en:'Cefixime', group:'第3世代セファロスポリン（経口）', dose:'8 mg/kg/日', calc:[8,8], split:'12〜24時間ごとに分割', max:'—', route:'経口', page:3},
  {name:'セフポドキシム プロキセチル', en:'Cefpodoxime proxetil', group:'第3世代セファロスポリン（経口）', dose:'10 mg/kg/日', calc:[10,10], split:'12時間ごとに分割', max:'400 mg/日', route:'経口', page:3},
  {name:'セフトリアキソン', en:'Ceftriaxone', group:'セファロスポリン系（静注）', dose:'50〜100 mg/kg/日', calc:[50,100], split:'24時間ごと。髄膜炎：50 mg/kgを12時間ごと', max:'—', route:'静注', page:4},
  {name:'セフォタキシム', en:'Cefotaxime', group:'セファロスポリン系（静注）', dose:'生後28日超：150〜200 mg/kg/日', calc:[150,200], split:'6〜8時間ごとに分割。髄膜炎は8〜12時間ごと', max:'—', route:'静注', page:4},
  {name:'セフタジジム', en:'Ceftazidime', group:'セファロスポリン系（静注）', dose:'150〜200 mg/kg/日', calc:[150,200], split:'8時間ごとに分割。髄膜炎：300 mg/kg/日', max:'6 g/日', route:'静注', page:5},
  {name:'セフェピム', en:'Cefepime', group:'第3・4世代セファロスポリン', dose:'通常：100 mg/kg/日', calc:[100,100], split:'8時間ごとに分割。Pseudomonas：150 mg/kg/日', max:'—', route:'静注', page:4},
  {name:'アズトレオナム', en:'Aztreonam', group:'モノバクタム系', dose:'90〜120 mg/kg/日', calc:[90,120], split:'6〜8時間ごとに分割', max:'8 g/日', route:'静注', page:6},
  {name:'トリメトプリム', en:'Trimethoprim', group:'ST（尿路感染症、その他）', dose:'4 mg/kg/日', calc:[4,4], split:'12時間ごとに分割', max:'—', route:'経口 / 静注', page:2}
];

const $ = id => document.getElementById(id);
const normalize = s => (s||'').toLowerCase().replace(/[・\s　]/g,'');
const weight = () => parseFloat($('weight').value);
const age = () => parseFloat($('age').value);
function doseRange(d){ const w=weight(); if(!w) return null; const lo=d.calc[0]*w, hi=d.calc[1]*w; return d.calc[0]===d.calc[1] ? `${fmt(lo)} mg/日` : `${fmt(lo)}〜${fmt(hi)} mg/日`; }
function fmt(v){ return Number.isInteger(v)?v.toLocaleString('ja-JP'):v.toLocaleString('ja-JP',{maximumFractionDigits:1}); }
function render(){
  const q=normalize($('drugSearch').value); const all=$('showAll').checked; let list=drugs.filter(d=>!q || normalize(`${d.name}${d.en}${d.group}`).includes(q));
  if(!all && !q) list=[];
  $('count').textContent=list.length?`${list.length} 件`:' '; $('resultTitle').textContent=q?`「${$('drugSearch').value}」の検索結果`:all?'収載薬一覧':'薬品を選択してください';
  $('resultsList').innerHTML=list.map((d,i)=>`<article class="drug-card" style="animation-delay:${i*20}ms"><div class="drug-main"><div><h4 class="drug-name">${d.name}</h4><div class="drug-en">${d.en}</div></div><span class="tag">${d.group}</span></div><div class="dose-box"><div class="dose"><span class="label">標準用量（原本）</span><strong>${d.dose}</strong></div><div class="dose"><span class="label">${weight()?'体重からの1日量換算':'体重を入力すると換算'}</span><strong>${doseRange(d)||'—'}</strong></div></div><div class="admin"><div class="admin-label">投与方法</div><div class="admin-text">${d.route} / ${d.split}</div></div>${age()>=0&&!Number.isNaN(age())?`<div class="age-note">入力年齢：${age()}歳　｜　年齢・出生後日数による区分は原本 p.${d.page} で確認</div>`:''}${d.max!=='—'?`<div class="max">最大用量：${d.max}</div>`:''}<div class="source"><span>原本 p.${d.page}</span><span>個別条件は必ず原本確認</span></div></article>`).join(''); $('empty').hidden=!!list.length;
}
const quickNames=['アミカシン','メロペネム','セフトリアキソン','セファレキシン'];
$('quickRow').innerHTML=quickNames.map(n=>`<button class="quick" data-name="${n}">${n}</button>`).join('');
document.querySelectorAll('.quick').forEach(b=>b.onclick=()=>{$('drugSearch').value=b.dataset.name;render()});
['drugSearch','weight','age','showAll'].forEach(id=>$(id).addEventListener('input',render));
$('reset').onclick=()=>{$('drugSearch').value='';$('weight').value='';$('age').value='';$('showAll').checked=false;render()};
render();
