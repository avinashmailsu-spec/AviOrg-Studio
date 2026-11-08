/* AviOrg Signature UX: progressively enhances Pro 6.0 without modifying the data model. */
(function(){
 'use strict';
 const $id=id=>document.getElementById(id);
 const svgPaths={
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="8" r="1"/><circle cx="14" cy="6" r="1"/><circle cx="18" cy="12" r="1"/><path d="M12 21a3 3 0 0 1-3-3c0-1.6 1.5-2 3-2h2a2 2 0 0 0 0-4"/>',
  layout:'<rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="8" rx="1"/><rect x="14" y="15" width="7" height="6" rx="1"/>',
  upload:'<path d="M12 16V3m-5 5 5-5 5 5"/><path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/>',
  sheet:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M9 9v12M4 15h16"/>',
  chart:'<path d="M4 20V13M10 20V8M16 20V4M22 20V11"/><path d="M2 21h21"/>',
  plan:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M7 2v4M17 2v4M3 10h18M8 15h3M8 18h7"/>',
  spark:'<path d="m12 2 1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8L12 2Z"/><path d="m19 18 .5 2 2 .5-2 .5-.5 2-.5-2-2-.5 2-.5.5-2Z"/>',
  arrow:'<path d="M6 12h12M13 7l5 5-5 5"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
  expand:'<path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3m13 5h3a2 2 0 0 0 2-2v-3"/>',
  settings:'<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 1.2 1.2-2.4 3-1.7-.8a8 8 0 0 1-2.1.9l-.5 1.9h-3.8l-.5-1.9a8 8 0 0 1-2.1-.9l-1.7.8-2.4-3L4.6 15a8 8 0 0 1 0-3l-1.2-1.2 2.4-3 1.7.8a8 8 0 0 1 2.1-.9l.5-1.9h3.8l.5 1.9a8 8 0 0 1 2.1.9l1.7-.8 2.4 3-1.2 1.2a8 8 0 0 1 0 3Z" transform="translate(0 -1.4) scale(.98)"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  chevron:'<path d="m5 9 7 7 7-7"/>',
  lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/>',
  briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  lines:'<path d="M4 4h16M4 9h10M4 14h16M4 19h9"/>',
  compass:'<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-4 1 2-5 4-1Z"/>',
  keyboard:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1M10 9h1M14 9h1M18 9h1M6 12h1M10 12h1M14 12h1M18 12h1M7 16h10"/>',
  check:'<path d="m5 12 4 4L19 6"/>'
 };
 const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svgPaths[name]||svgPaths.grid}</svg>`;
 const navMeta={
  people:['People','people','Create and edit reporting relationships','Create'],
  themes:['Design','palette','500 themes and corporate branding','Create'],
  layout:['Layout','layout','Adjust spacing, card shapes and connectors','Create'],
  universal:['Import','upload','Recover existing PowerPoint, Visio, SVG and PDF charts','Data'],
  officerefresh:['Office','sheet','Excel updates and editable PowerPoint workflows','Data'],
  intelligence:['Analytics','chart','Workforce and organizational intelligence','Planning'],
  scenarios:['Scenarios','plan','Save a baseline and compare reorganizations','Planning'],
  copilot:['Copilot','spark','Preview supported natural-language editing commands','Intelligence'],
  insights:['Org insights','chart','Headcount and organization diagnostics','Planning'],
  office:['Office exports','sheet','PowerPoint, Excel and document outputs','Data'],
  precision:['Precision editor','layout','Coordinates, alignment and detailed controls','Create'],
  ai:['AI outline studio','spark','Build hierarchy from a typed outline','Intelligence'],
  workforce:['Workforce planning','people','FTE, position cost and snapshots','Planning'],
  reviews:['Review center','check','Review comments and offline approval packets','Planning'],
  navigator:['Navigator','compass','Saved chart views and team navigation','Create'],
  datahub:['Smart data hub','sheet','Column mapping and spreadsheet import','Data'],
  forecast:['Forecast studio','chart','Model hires, attrition and cost changes','Planning'],
  layoutdoctor:['Layout doctor','layout','Check overlaps and tidy diagrams','Create'],
  performance:['Performance center','settings','Large-chart rendering and benchmark','System']
 };
 const mainNav=['people','themes','layout','universal','officerefresh','intelligence','scenarios','copilot'];
 const stateUX={mode:'command',index:0,items:[],previousFocus:null,focus:false,inspectorHidden:false};
 const htmlEl=(tag,cls,content)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(content!==undefined)e.innerHTML=content;return e};
 function setupRail(){
  const rail=document.querySelector('.rail'),space=rail.querySelector('.rail-spacer');
  const original=[...rail.querySelectorAll('.rail-btn[data-panel]')],map=new Map(original.map(el=>[el.dataset.panel,el]));
  const hidden=htmlEl('div','ux-hidden-buttons');hidden.hidden=true;hidden.id='uxLegacyNav';rail.appendChild(hidden);
  original.forEach(b=>hidden.append(b));
  const intro=htmlEl('div','ux-rail-label','STUDIO');rail.insertBefore(intro,space);
  mainNav.forEach(k=>{
    const b=map.get(k);if(!b)return;
    const m=navMeta[k];b.querySelector('.rail-ico').innerHTML=icon(m[1]);b.querySelectorAll('span').forEach((s,i)=>{if(i===1)s.textContent=m[0]});b.title=m[2];
    rail.insertBefore(b,space);
  });
  const all=htmlEl('button','rail-btn ux-rail-tools',`<span class="rail-ico">${icon('grid')}</span><span>All tools</span>`);all.type='button';all.id='uxAllToolsBtn';all.title='Browse all tools (Ctrl+K)';rail.insertBefore(all,space);
  all.addEventListener('click',()=>openLauncher('all'));
  const railHelp=$id('helpBtn');if(railHelp){railHelp.querySelector('.rail-ico').innerHTML=icon('keyboard');railHelp.title='Help and shortcuts'}
  // Keep original panel buttons with their already-bound handlers, accessible to keyboard search.
  return map;
 }
 let navButtons;
 function setupHeader(){
  const top=document.querySelector('.topbar'),crumb=top.querySelector('.breadcrumb');
  if(crumb)crumb.innerHTML='<span class="ux-home-crumb">Studio</span> <span>/</span> <strong>Organization designer</strong>';
  const cmd=htmlEl('button','ux-command-button',`${icon('search')}<span class="ux-placeholder">Search tools, people, and actions</span><span class="ux-kbd">Ctrl K</span>`);
  cmd.type='button';cmd.id='uxCommandBtn';cmd.title='Open command search (Ctrl or Cmd + K)';
  top.insertBefore(cmd,top.querySelector('.top-actions'));
  cmd.addEventListener('click',()=>openLauncher('command'));
  const tools=htmlEl('div','ux-top-tools');
  const focus=htmlEl('button','ux-action-icon ux-action-focus',icon('expand'));focus.type='button';focus.id='uxFocusBtn';focus.title='Focus on canvas (Shift+F)';focus.setAttribute('aria-label','Focus on canvas');
  const props=htmlEl('button','ux-action-icon ux-action-props',icon('settings'));props.type='button';props.id='uxPropertiesBtn';props.title='Toggle properties inspector';props.setAttribute('aria-label','Toggle properties inspector');
  tools.append(focus,props);top.insertBefore(tools,top.querySelector('.top-actions'));
  focus.addEventListener('click',()=>setFocus(!stateUX.focus));props.addEventListener('click',toggleInspector);
  const local=$id('chartName')?.parentElement?.querySelector('.live-pill');if(local)local.innerHTML='<i></i> LOCAL';
  document.querySelector('.app-bottom')?.querySelector('span:last-child')?.replaceChildren(document.createTextNode('AviOrg Studio · Pro 6.3'));
  const proPill=document.querySelector('.pro-pill');if(proPill)proPill.textContent='PRO 6.3';const footVersion=document.querySelector('.foot-version');if(footVersion)footVersion.textContent='v6.3';
 }
 function setupCanvasToolbar(){
  const toolbar=document.querySelector('.editor-toolbar'),cluster=toolbar?.querySelector('.tool-cluster'),zoom=cluster?.querySelector('.zoom-controller');
  if(!toolbar||!cluster||!zoom)return;
  const read=htmlEl('button','pill-tool ux-read-btn',`${icon('eye')} <span>100% view</span>`);
  read.type='button';read.id='uxReadableBtn';read.title='Zoom to full reading size';read.setAttribute('aria-label','Zoom chart to 100%');
  read.addEventListener('click',()=>{if(typeof changeZoom==='function')changeZoom(1)});
  const more=htmlEl('button','pill-tool ux-more-btn',`${icon('grid')} <span>More</span>`);
  more.type='button';more.id='uxToolbarMoreBtn';more.title='More editing tools';more.setAttribute('aria-expanded','false');
  const menu=htmlEl('div','ux-toolbar-menu');menu.id='uxToolbarMenu';menu.hidden=true;
  const label=htmlEl('div','ux-menu-label','MORE EDITING TOOLS');menu.append(label);
  ['scenarioTopBtn','v4QuickSelectBtn','collapseAllBtn','undoBtn','redoBtn','newChartBtn'].forEach(id=>{const btn=$id(id);if(btn){btn.classList.add('ux-more-item');if(id==='undoBtn')btn.innerHTML=`↶ <span>Undo</span>`;if(id==='redoBtn')btn.innerHTML=`↷ <span>Redo</span>`;if(id==='newChartBtn')btn.innerHTML=`＋ <span>New blank chart</span>`;menu.append(btn);btn.addEventListener('click',()=>{menu.hidden=true;more.setAttribute('aria-expanded','false')})}});
  cluster.insertBefore(read,zoom);cluster.insertBefore(more,zoom);toolbar.append(menu);
  more.addEventListener('click',e=>{e.stopPropagation();menu.hidden=!menu.hidden;more.setAttribute('aria-expanded',String(!menu.hidden))});
  document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&e.target!==more&&!more.contains(e.target)){menu.hidden=true;more.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){menu.hidden=true;more.setAttribute('aria-expanded','false')}});
 }
 function setupInspector(){
  const fields=document.querySelector('.inspector .fields-block');if(!fields)return;
  const nodes=[...fields.children];let group=null,inner=null,n=0;
  nodes.forEach(node=>{
   if(node.classList.contains('inspector-block-title')){
    group=document.createElement('details');group.className='ux-field-group';if(n===0)group.open=true;
    const label=node.textContent.trim().replace(/^PRO \d\.\d\s*/,'');
    const summary=htmlEl('summary','',`<span></span>${icon('chevron')}`);
    summary.querySelector('span').textContent=label;
    summary.querySelector('svg').classList.add('ux-chevron');
    inner=htmlEl('div','ux-field-content');group.append(summary,inner);fields.append(group);n++;
    node.remove();
   }else if(group){inner.append(node)}
  });
  fields.querySelectorAll('.ux-field-group').forEach((g,i)=>{g.addEventListener('toggle',()=>{if(g.open&&i!==0){/* independently collapsible sections */}})});
 }
 function setFocus(on){
  stateUX.focus=!!on;$id('appShell').classList.toggle('ux-focus-mode',stateUX.focus);
  $id('uxFocusBtn')?.classList.toggle('ux-on',stateUX.focus);
  $id('uxFocusBtn')?.setAttribute('aria-pressed',String(stateUX.focus));
  $id('uxFocusBtn').title=stateUX.focus?'Exit canvas focus (Shift+F)':'Focus on canvas (Shift+F)';
  // Fitting on next frame leaves room for browser to recompute the resized canvas.
  window.requestAnimationFrame(()=>{try{if(typeof fitChart==='function'&&state?.autoFit)fitChart(true)}catch(e){}});
 }
 function toggleInspector(){
  const shell=$id('appShell');if(window.innerWidth<=1180){shell.classList.toggle('show-inspector');return}
  stateUX.inspectorHidden=!stateUX.inspectorHidden;shell.classList.toggle('ux-inspector-hidden',stateUX.inspectorHidden);
  $id('uxPropertiesBtn')?.classList.toggle('ux-on',!stateUX.inspectorHidden);
  window.requestAnimationFrame(()=>{try{if(state?.autoFit)fitChart(true)}catch(e){}});
 }
 function setupLauncher(){
  const bg=htmlEl('div','ux-backdrop');bg.id='uxLauncher';bg.hidden=true;
  bg.innerHTML=`<div class="ux-launcher" role="dialog" aria-modal="true" aria-labelledby="uxLauncherTitle"><div class="ux-launch-header"><div><div class="ux-launch-title" id="uxLauncherTitle">Quick command</div><div class="ux-launch-caption" id="uxLauncherCaption">Search your workspace, tools and actions</div></div><button class="ux-close" id="uxLauncherClose" aria-label="Close">×</button></div><label class="ux-search-field">${icon('search')}<input id="uxLauncherSearch" autocomplete="off" spellcheck="false" placeholder="Try ‘Excel’, ‘Tidy’, or an employee name…" aria-label="Find commands and people"/><span class="ux-kbd">ESC</span></label><div class="ux-result-list" id="uxLauncherResults" role="listbox"></div><div class="ux-launch-footer"><span><b>↑ ↓</b> Navigate &nbsp; <b>↵</b> Open &nbsp; <b>Esc</b> Close</span><span>19 tools · local workspace</span></div></div>`;
  document.body.appendChild(bg);
  bg.addEventListener('click',e=>{if(e.target===bg||e.target.closest('#uxLauncherClose'))closeLauncher()});
  const input=$id('uxLauncherSearch');
  input.addEventListener('input',()=>renderLauncher());
  bg.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const all=[...bg.querySelectorAll('button:not([disabled]), input:not([disabled])')].filter(x=>x.getClientRects().length);const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
  input.addEventListener('keydown',e=>{
   if(e.key==='ArrowDown'){e.preventDefault();setSelection(stateUX.index+1)}
   else if(e.key==='ArrowUp'){e.preventDefault();setSelection(stateUX.index-1)}
   else if(e.key==='Enter'){e.preventDefault();const target=stateUX.items[stateUX.index];if(target)selectResult(target)}
  });
 }
 function actionItems(){
  const btn=id=>$id(id)?.click();
  return [
   {name:'Add a person',desc:'Create a new position in the hierarchy',icon:'people',cat:'Quick actions',run:()=>btn('addRootBtn'),key:'Create'},
   {name:'Import Excel',desc:'Upload an XLSX or CSV workbook',icon:'sheet',cat:'Quick actions',run:()=>btn('importTopBtn'),key:'Import'},
   {name:'Export chart',desc:'PowerPoint, Excel, PDF, PNG, SVG and JSON',icon:'upload',cat:'Quick actions',run:()=>btn('exportTopBtn'),key:'Export'},
   {name:'Tidy layout',desc:'Rebalance and align the organization chart',icon:'layout',cat:'Quick actions',run:()=>btn('tidyTopBtn'),key:'Canvas'},
   {name:'Fit chart to screen',desc:'Display the entire diagram within the canvas',icon:'expand',cat:'Quick actions',run:()=>btn('fitBtn'),key:'View'},
   {name:'Zoom to 100%',desc:'Read employee cards at full size',icon:'search',cat:'Quick actions',run:()=>{if(typeof changeZoom==='function')changeZoom(1)},key:'View'},
   {name:'Focus on canvas',desc:'Temporarily hide side panels (Shift+F)',icon:'eye',cat:'Quick actions',run:()=>setFocus(!stateUX.focus),key:'Shift F'},
   {name:'Run layout quality scan',desc:'Check for card overlaps and connector issues',icon:'check',cat:'Quick actions',run:()=>{navigate('layoutdoctor');btn('v6QualityScan')},key:'Quality'},
   {name:'Undo last change',desc:'Reverse your most recent data or layout edit',icon:'arrow',cat:'Quick actions',run:()=>btn('undoBtn'),key:'Ctrl Z'},
   {name:'Redo last change',desc:'Reapply the most recently undone edit',icon:'arrow',cat:'Quick actions',run:()=>btn('redoBtn'),key:'Ctrl Y'},
   {name:'New blank chart',desc:'Create a fresh organization chart',icon:'grid',cat:'Quick actions',run:()=>btn('newChartBtn'),key:'Create'},
   {name:'Editable PowerPoint export',desc:'Open PowerPoint presentation options',icon:'sheet',cat:'Quick actions',run:()=>navigate('officerefresh'),key:'PPTX'}
  ];
 }
 function allItems(){
  const panels=Object.entries(navMeta).map(([key,meta])=>({name:meta[0],desc:meta[2],icon:meta[1],cat:meta[3],run:()=>navigate(key),key:mainNav.includes(key)?'Main':'Tool',search:key}));
  const actions=actionItems();
  const persons=typeof state!=='undefined'&&state?.people?state.people.map(p=>({name:p.name||'Unnamed employee',desc:`${p.role||'Position'} · ${p.dept||'Unassigned'} · ${p.id}`,icon:'people',cat:'People',run:()=>{if(typeof selectPerson==='function')selectPerson(p.id);navigate('people')},key:'Person',search:p.id+' '+(p.role||'')+' '+(p.dept||'')})) : [];
  return stateUX.mode==='all'?panels:[...actions,...panels,...persons.slice(0,600)];
 }
 function navigate(key){
  const button=navButtons.get(key);if(button)button.click();else if(typeof showPanel==='function')showPanel(key);
  if(typeof activePanel!=='undefined')document.querySelector('#uxAllToolsBtn')?.classList.toggle('active',!mainNav.includes(activePanel));
  if(window.innerWidth<=740)$id('appShell').classList.add('show-mobile-side');
 }
 function renderLauncher(){
  const q=($id('uxLauncherSearch')?.value||'').trim().toLowerCase();
  const items=allItems().filter(it=>(it.name+' '+it.desc+' '+(it.search||'')+' '+it.cat).toLowerCase().includes(q));
  const weight=o=>o.name.toLowerCase().startsWith(q)?0:o.name.toLowerCase().includes(q)?1:2;
  if(q)items.sort((a,b)=>weight(a)-weight(b));
  stateUX.items=items.slice(0,65);stateUX.index=0;
  const list=$id('uxLauncherResults');list.replaceChildren();
  if(!stateUX.items.length){list.append(htmlEl('div','ux-empty','No matches. Try a name, department, or tool.'));return}
  let lastCat='';stateUX.items.forEach((item,i)=>{
   if(!q&&item.cat!==lastCat){list.append(htmlEl('div','ux-result-group',item.cat.toUpperCase()));lastCat=item.cat}
   const b=htmlEl('button','ux-result-item'+(i===0?' ux-result-selected':''));b.type='button';b.setAttribute('role','option');b.setAttribute('aria-selected',i===0?'true':'false');b.dataset.index=String(i);
   const wrap=htmlEl('span','ux-result-text');const name=document.createElement('b');name.textContent=item.name;const d=document.createElement('small');d.textContent=item.desc;wrap.append(name,d);
   const iconBox=htmlEl('span','ux-result-icon',icon(item.icon));const key=htmlEl('span','ux-result-key');key.textContent=item.key;
   b.append(iconBox,wrap,key);b.addEventListener('mouseenter',()=>setSelection(i,false));b.addEventListener('click',()=>selectResult(item));list.append(b)
  });
 }
 function setSelection(num,scroll=true){
  if(!stateUX.items.length)return;
  stateUX.index=(num+stateUX.items.length)%stateUX.items.length;
  const list=$id('uxLauncherResults');list.querySelectorAll('.ux-result-item').forEach((b,i)=>{b.classList.toggle('ux-result-selected',i===stateUX.index);b.setAttribute('aria-selected',String(i===stateUX.index))});
  if(scroll)list.querySelector(`[data-index="${stateUX.index}"]`)?.scrollIntoView({block:'nearest'});
 }
 function selectResult(item){closeLauncher();try{item.run()}catch(e){console.error(e);if(typeof toast==='function')toast(e.message||'Action could not be completed',true)}}
 function openLauncher(mode='command'){
  stateUX.previousFocus=document.activeElement;stateUX.mode=mode;
  $id('uxLauncher').hidden=false;
  $id('uxLauncherTitle').textContent=mode==='all'?'Explore all tools':'Quick command';
  $id('uxLauncherCaption').textContent=mode==='all'?'Every AviOrg capability, in one searchable place':'Actions, people, or tools—without leaving your canvas';
  const input=$id('uxLauncherSearch');input.value='';input.placeholder=mode==='all'?'Search 19 tools by capability…':'Try “Excel”, “Tidy”, or an employee name…';renderLauncher();input.focus();
 }
 function closeLauncher(){const bg=$id('uxLauncher');if(!bg||bg.hidden)return;bg.hidden=true;try{stateUX.previousFocus?.focus()}catch(e){}}
 function setupKeyboard(){
  document.addEventListener('keydown',e=>{
   const target=e.target,editable=!!(target?.isContentEditable||target?.closest?.('input, textarea, select, [contenteditable="true"]'));
   if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$id('uxLauncher').hidden?openLauncher('command'):closeLauncher();return}
   if(e.key==='Escape'){
    if(!$id('uxLauncher').hidden){e.preventDefault();closeLauncher();return}
    if(stateUX.focus){e.preventDefault();setFocus(false);return}
   }
   if(e.shiftKey&&!e.ctrlKey&&!e.metaKey&&e.key.toLowerCase()==='f'&&!editable&&$id('uxLauncher').hidden){e.preventDefault();setFocus(!stateUX.focus);return}
  },true);
 }
 function setupToolFeedback(){
  document.querySelectorAll('.rail-btn[data-panel]').forEach(b=>{
    b.addEventListener('click',()=>{
      const shell=$id('appShell');
      b.dataset.uxWasOpen=String(window.innerWidth<=740 && shell.classList.contains('show-mobile-side') && b.classList.contains('active'));
    },true);
    b.addEventListener('click',()=>{
      const shell=$id('appShell');
      if(b.dataset.uxWasOpen==='true')shell.classList.remove('show-mobile-side');
      $id('uxAllToolsBtn')?.classList.toggle('active',!mainNav.includes(b.dataset.panel));
      if($id('uxLauncher')&&!$id('uxLauncher').hidden)closeLauncher();
    });
  });
 }

 function setupDeveloperCredits(){
  const button=$id('uxAboutCreditBtn');
  if(!button)return;
  button.addEventListener('click',()=>{
    if(typeof openModal!=='function')return;
    openModal('About AviOrg Studio','APPLICATION CREDITS',`<div class="ux-credit-modal">
      <div class="ux-credit-hero"><div class="ux-credit-logo" aria-hidden="true">AE</div><div><div class="ux-credit-heading">Developed by Avinash Ekka</div><div class="ux-credit-desc">AviOrg Studio · Pro 6.3 · Intelligent Organization Design</div></div></div>
      <p class="ux-credit-text">A premium, offline-first workspace for building organization charts, editing reporting structures, designing professional layouts, and preparing editable Office presentations.</p>
      <p class="ux-credit-text">Application developer: <span class="ux-credit-author">Avinash Ekka</span>.</p>
    </div>`);
  });
 }
 function bootPremium(){
  if($id('uxLauncher'))return;
  navButtons=setupRail();setupHeader();setupCanvasToolbar();setupInspector();setupLauncher();setupKeyboard();setupToolFeedback();setupDeveloperCredits();
  console.info('AviOrg Studio UI 6.1 ready: searchable tools, collapsible inspector, keyboard navigation, canvas focus');
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bootPremium);else bootPremium();
 window.StructuraSignature={openSearch:()=>openLauncher('command'),openTools:()=>openLauncher('all'),focus:setFocus,closeSearch:closeLauncher};
window.AviOrgStudio=window.StructuraSignature;
})();
