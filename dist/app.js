const pages=[...document.querySelectorAll('.page')];
const pageNo=document.querySelector('#pageNo');
const meter=document.querySelector('.page-meter');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('in-view');
    const n=entry.target.dataset.page||'00';
    pageNo.textContent=n;
    meter.style.setProperty('--progress',Math.min(100,Number(n)/8*100)+'%');
  });
},{threshold:.32});
pages.forEach(page=>observer.observe(page));

const mapButton=document.querySelector('.map-button');
const map=document.querySelector('#map');
mapButton.addEventListener('click',()=>{
  const open=map.classList.toggle('open');
  mapButton.setAttribute('aria-expanded',String(open));
  mapButton.textContent=open?'CLOSE THE MAP':'OPEN THE MAP';
});
document.querySelectorAll('#map a').forEach(a=>a.addEventListener('click',()=>{map.classList.remove('open');mapButton.setAttribute('aria-expanded','false');mapButton.textContent='OPEN THE MAP'}));
document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.jump).scrollIntoView({behavior:'smooth'})));

const ranks=[["MEMBER", "Your activated level determines your reward points. Explore the planned access below.", "REWARD POINTS: 1", "Big Coffer: future release with published eligibility rules", "Holder Center + agent research previews", "Burn 20,000 $COFFERS for this step.", "Token activation only"], ["BUILDER", "Your activated level determines your reward points. Explore the planned access below.", "REWARD POINTS: 2", "Big Coffer: future release with published eligibility rules", "Planned: DCA bot + research tools", "Burn 80,000 $COFFERS for this step.", "1× Member or 2× Inactive"], ["STEWARD", "Your activated level determines your reward points. Explore the planned access below.", "REWARD POINTS: 3.5", "Big Coffer: future release with published eligibility rules", "Planned: adaptive DCA + Big Coffer eligibility", "Burn 320,000 $COFFERS for this step.", "1× Builder or 2× Member or 3× Inactive"], ["PARTNER", "Your activated level determines your reward points. Explore the planned access below.", "REWARD POINTS: 5", "Big Coffer: future release with published eligibility rules", "Planned: DCA + Grid + expanded strategy access", "Burn 1,000,000 $COFFERS for this step.", "1× Steward or 2× Builder or 3× Member or 4× Inactive"], ["KEYHOLDER", "Your activated level determines your reward points. Explore the planned access below.", "REWARD POINTS: 8", "Big Coffer: future release with published eligibility rules", "Planned: advanced bots, agents and tools", "Burn 2,000,000 $COFFERS for this step.", "1× Partner or 2× Steward or 3× Builder or 4× Member or 5× Inactive"]];

let selectedRank=0;
document.querySelector('.rank.active').append(document.querySelector('.moving-key'));
document.querySelector('#rankCopy').textContent=ranks[0][1];
document.querySelector('#rankMultiplier').textContent=ranks[0][2];
document.querySelector('#rankVault').textContent=ranks[0][3];
document.querySelector('#rankTools').textContent=ranks[0][4];
document.querySelector('#methodCopy').textContent=ranks[0][5];
document.querySelectorAll('.rank').forEach((button,index)=>button.addEventListener('click',()=>{
  selectedRank=index;
  document.querySelectorAll('.rank').forEach(x=>x.classList.remove('active'));button.classList.add('active');
  document.querySelector('#rankTitle').textContent=ranks[index][0];
  document.querySelector('#rankCopy').textContent=ranks[index][1];
  document.querySelector('#rankMultiplier').textContent=ranks[index][2];
  document.querySelector('#rankVault').textContent=ranks[index][3];
  document.querySelector('#rankTools').textContent=ranks[index][4];
  const tokenActive=document.querySelector('.burn-switch [data-method="token"]').classList.contains('active');
  document.querySelector('#methodCopy').textContent=tokenActive?ranks[index][5]:ranks[index][6];
  button.append(document.querySelector('.moving-key'));
}));
document.querySelectorAll('.burn-switch button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.burn-switch button').forEach(x=>x.classList.remove('active'));button.classList.add('active');
  document.querySelector('#methodCopy').textContent=button.dataset.method==='token'?ranks[selectedRank][5]:ranks[selectedRank][6];
}));

const bots={
  dca:['DCA BOT','Recurring buys into $COFFERS, crypto or tokenized assets using a chosen schedule.','BUILDER · FIRST RELEASE'],
  grid:['GRID BOT','Places automated buys and sells across a defined range to work sideways markets.','PARTNER · STAGED TESTING'],
  scan:['MARKET SCANNER','Ranks Arc, crypto and tokenized-asset opportunities by liquidity, persistence and estimated risk.','KEYHOLDER · IN DEVELOPMENT'],
  copy:['COPY BOT','Mirrors selected public strategies with position sizing and risk limits defined by the holder.','KEYHOLDER · LATER-STAGE DEVELOPMENT'],
  predict:['PREDICTION BOT','Surfaces probability edges and assists with risk-managed prediction-market execution.','KEYHOLDER · LATER-STAGE DEVELOPMENT'],
  defi:['DEFI ROUTER','Compares lending and liquidity opportunities and routes capital only through approved integrations.','KEYHOLDER · IN DEVELOPMENT']
};
document.querySelectorAll('[data-bot]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.agent').forEach(x=>x.classList.remove('active'));button.classList.add('active');
  const item=bots[button.dataset.bot];document.querySelector('#botTitle').textContent=item[0];document.querySelector('#botCopy').textContent=item[1];document.querySelector('#botStatus').textContent='SIMULATION · NO LIVE EXECUTION';
}));
const runAgent=document.querySelector('#runAgent');
if(runAgent)runAgent.addEventListener('click',()=>{
  const strategy=document.querySelector('#demoStrategy').value;
  const asset=document.querySelector('#demoAsset').value;
  const amount=Math.max(10,Math.min(10000,Number(document.querySelector('#demoAmount').value)||250));
  const lang=window.CofferI18n?.language||'en';
  const output={
    en:`${strategy} preview · ${asset} · test balance ${amount.toLocaleString()} USDC · planned split only on actual realized profit: user 95% / maintenance 5%. No funds moved.`,
    zh:`${strategy} 预览 · ${asset} · 测试余额 ${amount.toLocaleString()} USDC · 已实现利润示例分配：用户 95% / 维护 5%。未移动任何资金。`,
    ja:`${strategy} プレビュー・${asset}・テスト残高 ${amount.toLocaleString()} USDC・実現利益の配分例：ユーザー 95% / 保守 5%。資金移動はありません。`,
    hi:`${strategy} पूर्वावलोकन · ${asset} · परीक्षण बैलेंस ${amount.toLocaleString()} USDC · वास्तविक लाभ का उदाहरण विभाजन: उपयोगकर्ता 95% / रखरखाव 5%। कोई फंड स्थानांतरित नहीं हुआ।`,
    es:`Demo de ${strategy} · ${asset} · saldo de prueba ${amount.toLocaleString()} USDC · distribución prevista solo sobre ganancias realizadas reales: usuario 95% / mantenimiento 5%. No se movieron fondos.`
  };
  document.querySelector('#agentOutput').textContent=output[lang]||output.en;
});
const scanPools=document.querySelector('#scanPools');
if(scanPools)scanPools.addEventListener('click',()=>{
  const rows=[...document.querySelectorAll('.pool-row')];
  const board=document.querySelector('.scanner-board');
  if(rows.length)board.insertBefore(rows[0],board.querySelector('footer'));
  const lang=window.CofferI18n?.language||'en';
  const status={en:'Demo refreshed · scored by liquidity, illustrative net APR and risk · no funds routed',zh:'演示已刷新 · 按流动性、示例净 APR 与风险评分 · 未路由资金',ja:'デモを更新・流動性、参考純 APR、リスクで評価・資金ルーティングなし',hi:'डेमो रीफ़्रेश · लिक्विडिटी, उदाहरण नेट APR और जोखिम के आधार पर स्कोर · कोई फंड रूट नहीं हुआ',es:'Demo actualizado · evaluado por liquidez, APR neto ilustrativo y riesgo · no se dirigieron fondos'};
  document.querySelector('#scanStatus').textContent=status[lang]||status.en;
});
document.querySelectorAll('.nft-card').forEach(card=>card.addEventListener('click',()=>card.classList.toggle('open')));
window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  const progress=max?scrollY/max*100:0;
  document.querySelector('.page-meter').style.setProperty('--progress',progress+'%');
},{passive:true});

// Navigation is present in index.html so official links also work without JavaScript.

// Keep the Big Coffer panels in a single flow, rather than overlapping absolutes.
const vaultStage=document.querySelector('#vault .vault-focus');
const vaultRules=document.querySelector('#vault .vault-priority');
const vaultMarket=document.querySelector('#vault .mini-dashboard');
if(vaultStage&&vaultRules&&vaultMarket){
 const panels=document.createElement('div');panels.className='vault-panel-stack';
 vaultStage.append(panels);panels.append(vaultRules,vaultMarket);
}
