/* AviOrg Pro 6.3 – local, accessible application appearance controls. */
(() => {
  'use strict';
  const storageKey = 'aviorg_signature_luxe_appearance_v1';
  const options = [
    {id:'royal',label:'Royal',color:'linear-gradient(135deg,#8d71fb,#286ebd)'},
    {id:'ocean',label:'Ocean',color:'linear-gradient(135deg,#207ad8,#1ac7d6)'},
    {id:'emerald',label:'Emerald',color:'linear-gradient(135deg,#137f8e,#44c79a)'}
  ];
  const getStored = () => {
    try { const value = localStorage.getItem(storageKey); return options.some(option => option.id === value) ? value : 'royal'; }
    catch (_) { return 'royal'; }
  };
  const choose = (id, persist = true) => {
    if (!options.some(option => option.id === id)) return;
    document.body.dataset.luxeAppearance = id;
    document.querySelectorAll('.luxe-swatch').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.appearance === id)));
    if (persist) { try { localStorage.setItem(storageKey, id); } catch (_) { /* local/private mode */ } }
  };
  function init(){
    const panel = document.querySelector('#panel-themes');
    if (!panel || document.querySelector('#luxeAppearance')) return;
    const selectedCard = panel.querySelector('.selected-theme-card');
    const section = document.createElement('section');
    section.className='luxe-appearance';
    section.id='luxeAppearance';
    section.setAttribute('aria-label','Studio appearance');
    section.innerHTML = `<div class="luxe-appearance-head"><span class="luxe-appearance-title">Studio appearance</span><span class="luxe-appearance-kicker">SIGNATURE</span></div><div class="luxe-appearance-desc">Choose the look of your workspace. Your chart designs stay unchanged.</div><div class="luxe-swatches" role="group" aria-label="Color theme">${options.map(option => `<button type="button" class="luxe-swatch" data-appearance="${option.id}" style="--swatch:${option.color}" aria-pressed="false" title="${option.label} workspace">${option.label}</button>`).join('')}</div>`;
    if (selectedCard) selectedCard.insertAdjacentElement('afterend',section);
    else panel.insertAdjacentElement('afterbegin',section);
    section.querySelectorAll('.luxe-swatch').forEach(button => button.addEventListener('click', () => choose(button.dataset.appearance)));
    choose(getStored(),false);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
