/* ================================================================
   CONFIG & STATE
================================================================ */
const APPID = 431960, PAGE_SIZE = 30;
const PROXY_DOMAINS = ['steamcommunity.com', 'api.steampowered.com', 'steamusercontent.com'];
const DEFAULT_PROXY_TEMPLATE = 'https://r.jina.ai/http://';
const API_PARAM = new URLSearchParams(location.search).get('api');
const API_BASE = (API_PARAM || localStorage.getItem('wallhub_api_base') || '').trim().replace(/\/+$/,'');
if(API_PARAM) localStorage.setItem('wallhub_api_base', API_BASE);
const PROXY_PARAM = new URLSearchParams(location.search).get('proxy');
const PROXY_TEMPLATE = (PROXY_PARAM || localStorage.getItem('wallhub_proxy_template') || DEFAULT_PROXY_TEMPLATE).trim();
if(PROXY_PARAM) localStorage.setItem('wallhub_proxy_template', PROXY_TEMPLATE);

const S = {
  page:1, totalPages:1, totalItems:0,
  loading:false, view:'grid',
  items:[],
  f:{ search:'', sort:'trend', days:'30', type:'', rating:'', genres:[] }
};

function apiUrl(path){
  if(!path) return API_BASE || '';
  return API_BASE ? `${API_BASE}${path}` : path;
}
function inBackendMode(){
  return !!API_BASE;
}
function proxyUrl(raw){
  const url = String(raw||'');
  const tpl = PROXY_TEMPLATE || DEFAULT_PROXY_TEMPLATE;
  if(tpl.includes('{url}')) return tpl.split('{url}').join(encodeURIComponent(url));
  if(tpl.includes('{raw}')) return tpl.split('{raw}').join(url);
  return `${tpl}${url.replace(/^https?:\/\//,'')}`;
}
async function readTextUtf8(res){
  const ab = await res.arrayBuffer();
  return new TextDecoder('utf-8').decode(ab);
}
const _entityDecodeEl = document.createElement('textarea');
function decodeHtmlEntities(s){
  let v = String(s ?? '');
  if(!v) return '';
  for(let i=0;i<3;i++){
    _entityDecodeEl.innerHTML = v;
    const dec = _entityDecodeEl.value;
    if(dec === v) break;
    v = dec;
  }
  return v;
}
function decodeUnicodeEscapes(s){
  let v = String(s ?? '');
  if(!v) return '';
  v = v.replace(/\\u([0-9a-fA-F]{4})/g, (_,h)=>String.fromCharCode(parseInt(h,16)));
  v = v.replace(/\\x([0-9a-fA-F]{2})/g, (_,h)=>String.fromCharCode(parseInt(h,16)));
  v = v.replace(/%u([0-9a-fA-F]{4})/g, (_,h)=>String.fromCharCode(parseInt(h,16)));
  return v;
}
function normalizeUserText(s){
  let v = String(s ?? '');
  if(!v) return '';
  v = decodeHtmlEntities(v);
  v = decodeUnicodeEscapes(v);
  v = decodeHtmlEntities(v);
  return v;
}
function buildSteamBrowseUrl(params){
  const sortMap = {1:'trend',2:'mostrecent',21:'lastupdated',16:'totaluniquesubscribers'};
  const sort = sortMap[parseInt(params.query_type)] || 'trend';
  const url = new URL('https://steamcommunity.com/workshop/browse/');
  url.searchParams.set('appid', String(params.appid || APPID));
  url.searchParams.set('browsesort', sort);
  url.searchParams.set('section', 'readytouseitems');
  url.searchParams.set('actualsort', sort);
  url.searchParams.set('p', String(params.page || 1));
  url.searchParams.set('numperpage', String(params.numperpage || PAGE_SIZE));
  if(params.search_text) url.searchParams.set('searchtext', params.search_text);
  if(params.days && sort === 'trend' && String(params.days) !== '0') url.searchParams.set('days', String(params.days));
  Object.entries(params).forEach(([k,v])=>{
    if(/^requiredtags/.test(k) && v) url.searchParams.append('requiredtags[]', String(v));
  });
  return url.toString();
}
async function querySteamViaPublicProxy(params){
  const browseUrl = buildSteamBrowseUrl(params);
  const res = await fetch(proxyUrl(browseUrl), { cache:'no-store' });
  if(!res.ok) throw new Error(`公开代理请求失败：HTTP ${res.status}`);
  const text = await readTextUtf8(res);
  const totalM = text.match(/Showing\s+[\d,]+-[\d,]+\s+of\s+([\d,]+)\s+entries/i);
  const total = totalM ? parseInt(totalM[1].replace(/,/g,'')) : 0;
  const list = [];
  const seen = new Set();
  const re = /!\[Image \d+\]\((https:\/\/images\.steamusercontent\.com\/ugc\/[^)]+)\)[\s\S]*?\[([^\]]+)\]\(https?:\/\/steamcommunity\.com\/sharedfiles\/filedetails\/\?id=(\d+)[^)]*\)[\s\S]*?by\[([^\]]+)\]\(/g;
  let m;
  while((m = re.exec(text))){
    const id = m[3];
    if(seen.has(id)) continue;
    seen.add(id);
    list.push({
      publishedfileid: id,
      title: m[2] || `Wallpaper ${id}`,
      preview_url: m[1] || '',
      short_description: `作者: ${m[4] || '未知'}`,
      subscriptions: 0,
      favorited: 0,
      views: 0,
      tags: []
    });
  }
  return {response:{publishedfiledetails:list,total:total || list.length}};
}

/* ================================================================
   GENRES
================================================================ */
const GENRES=[
  {id:'Abstract',n:'抽象'},{id:'Animal',n:'动物'},{id:'Anime',n:'日本动画'},
  {id:'Cartoon',n:'卡通'},{id:'CGI',n:'CGI'},{id:'Cyberpunk',n:'赛博朋克'},
  {id:'Fantasy',n:'幻想'},{id:'Game',n:'游戏'},{id:'Girls',n:'女孩们'},
  {id:'Guys',n:'伙计们'},{id:'Landscape',n:'景观'},{id:'Medieval',n:'中世纪'},
  {id:'Memes',n:'表情包'},{id:'MMD',n:'MMD'},{id:'Music',n:'音乐'},
  {id:'Nature',n:'自然'},{id:'Pixel art',n:'像素艺术'},{id:'Relaxing',n:'放松'},
  {id:'Retro',n:'复古'},{id:'Sci-Fi',n:'科幻'},{id:'Sports',n:'运动'},
  {id:'Technology',n:'科技'},{id:'Television',n:'电视'},{id:'Vehicle',n:'车辆'},
  {id:'Unspecified',n:'未指定'},
];

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', ()=>{
  renderGenreGrid();
  setupEvents();
  syncDaysVisible();
  checkServer();
  load();
});

function setupEvents(){
  document.getElementById('searchInput').addEventListener('keydown', e=>{ if(e.key==='Enter') doSearch(); });
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('sortSel').addEventListener('change', e=>{ S.f.sort=e.target.value; S.page=1; syncDaysVisible(); load(); });
  document.getElementById('daysSel').addEventListener('change', e=>{ S.f.days=e.target.value; S.page=1; load(); });
  document.getElementById('typeSel').addEventListener('change', e=>{ S.f.type=e.target.value; S.page=1; load(); });
  document.getElementById('ratingSel').addEventListener('change', e=>{ S.f.rating=e.target.value; S.page=1; load(); });
}

function doSearch(){
  S.f.search = document.getElementById('searchInput').value.trim();
  S.page = 1; load();
}

/* 只有"最热门"时才显示时间下拉 */
function syncDaysVisible(){
  document.getElementById('daysGrp').style.display = S.f.sort==='trend' ? '' : 'none';
}

/* ================================================================
   GENRES
   UI：默认全选，支持多选/取消
   逻辑：单选时走 requiredtags；多选时走 genre_or 交给后端做 OR 过滤
================================================================ */
let activeGenres = new Set(GENRES.map(g=>g.id));

function renderGenreGrid(){
  document.getElementById('genreGrid').innerHTML = GENRES.map(g=>`
    <div class="gc ${activeGenres.has(g.id) ? 'sel2' : ''}"
         onclick="toggleGenre('${g.id}')">
      <div class="gc-chk"></div><span>${g.n}</span>
    </div>`).join('');
  updateBadge();
}

function toggleGenre(id){
  if(activeGenres.has(id)) activeGenres.delete(id);
  else activeGenres.add(id);
  S.f.genres = Array.from(activeGenres);
  renderGenreGrid();
}

function updateBadge(){
  const cnt = activeGenres.size;
  const all = cnt === GENRES.length;
  document.getElementById('fbadge').textContent = all ? '全' : String(cnt);
  document.getElementById('filterBtn').classList.toggle('active', !all);
  const btn = document.getElementById('genreToggleBtn');
  if (btn) btn.textContent = all ? '清除' : '全选';
}
function openSB(){ document.getElementById('sb').classList.add('open'); document.getElementById('sbOv').classList.add('open'); document.body.style.overflow='hidden'; }
function closeSB(){ document.getElementById('sb').classList.remove('open'); document.getElementById('sbOv').classList.remove('open'); document.body.style.overflow=''; }
function toggleGenresAll(){
  if (activeGenres.size === GENRES.length) activeGenres = new Set();
  else activeGenres = new Set(GENRES.map(g=>g.id));
  S.f.genres = Array.from(activeGenres);
  renderGenreGrid();
}
function applyFilters(){ closeSB(); S.page=1; load(); }

/* ================================================================
   VIEW
================================================================ */
function setView(v){
  S.view=v;
  document.getElementById('vgrid').classList.toggle('active',v==='grid');
  document.getElementById('vlist').classList.toggle('active',v==='list');
  renderItems(S.items);
}

/* ================================================================
   BUILD PARAMS
================================================================ */
function buildParams(){
  const f = S.f;
  const params = {
    appid: APPID,
    query_type: {trend:1,mostrecent:2,lastupdated:21,totaluniquesubscribers:16}[f.sort]||1,
    page: S.page,
    numperpage: PAGE_SIZE,
  };
  if(f.search) params.search_text = f.search;
  if(f.days && f.sort==='trend' && f.days!=='0') params.days = parseInt(f.days);

  // requiredtags：type / rating 直接传；genre 多选时仅在“单个选中”时透传到 Steam
  const tags=[];
  if(f.type)   tags.push(f.type);
  if(f.rating) tags.push(f.rating);
  const validGenres = (f.genres||[]).filter(g=>GENRES.some(x=>x.id===g));
  if(validGenres.length === 1) tags.push(validGenres[0]);
  if(validGenres.length > 1 && validGenres.length < GENRES.length){
    validGenres.forEach((g,i)=>{ params[`genre_or[${i}]`] = g; });
  }

  tags.forEach((t,i)=>{ params[`requiredtags[${i}]`]=t; });

  return params;
}

/* ================================================================
   LOAD
================================================================ */
async function load(){
  if(S.loading) return;
  S.loading=true;
  showLoading();
  try {
    const data = inBackendMode()
      ? await (async()=>{
          const res  = await fetch(apiUrl('/api/steam/query'),{
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({params:buildParams()})
          });
          if(!res.ok){
            let serverMsg='';
            try{
              const j = await res.json();
              serverMsg = j && (j.error || j.message) ? String(j.error || j.message) : '';
            }catch{}
            throw new Error(serverMsg || (res.status===405 ? `服务器 405（后端地址不正确或未放行 POST）: ${apiUrl('/api/steam/query')}` : `服务器 ${res.status}`));
          }
          return res.json();
        })()
      : await querySteamViaPublicProxy(buildParams());
    const resp = data.response||data;
    const list = resp.publishedfiledetails||[];

    if(!list.length){
      document.getElementById('resCnt').textContent='0 个结果';
      if(canShowProxyGuideByFilters()){
        showError('未获取到壁纸列表，当前网络可能无法访问 Steam 社区服务。');
      }else{
        showEmpty('未找到匹配的壁纸，请尝试修改筛选条件');
      }
      document.getElementById('pgn').innerHTML='';
    } else {
      S.items      = list;
      S.totalItems = parseInt(resp.total) || list.length;
      // Steam workshop browse 最多支持翻到第 999 页
      S.totalPages = Math.min(999, Math.max(1, Math.ceil(S.totalItems / PAGE_SIZE)));
      const dispTotal = S.totalItems >= 50000 ? '50,000+' : S.totalItems.toLocaleString();
      document.getElementById('resCnt').textContent = `约 ${dispTotal} 个 · 共 ${S.totalPages} 页`;
      renderItems(S.items);
      renderPagination();
    }
  } catch(err){
    console.error(err);
    showError(err.message);
  } finally { S.loading=false; }
}

/* ================================================================
   RENDER
================================================================ */
function showLoading(){
  document.getElementById('wcon').innerHTML=`
    <div class="loading-state">
      <div class="spinner"></div>
      <span style="font-size:14px;color:var(--text3)">正在抓取 Steam 创意工坊...</span>
      <span style="font-size:12px;color:var(--text3);margin-top:2px">抓取列表 → 批量获取详情数据</span>
    </div>`;
  document.getElementById('pgn').innerHTML='';
}
function showEmpty(msg){
  document.getElementById('wcon').innerHTML=`
    <div class="empty-state"><div class="empty-icon">🖼️</div><div>${msg}</div></div>`;
}
function showError(msg){
  const content = `
      <div style="font-size:44px">⚠️</div>
      <div style="color:var(--danger);font-size:16px;font-weight:600">加载失败</div>
      <div style="font-size:13px;color:var(--text3);max-width:420px">${esc(msg)}</div>
      <button onclick="load()" style="background:var(--accent);border:none;border-radius:8px;color:#fff;padding:9px 22px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;margin-top:4px">🔄 重试</button>
      ${proxyTipHtml(msg)}
  `;
  document.getElementById('wcon').innerHTML=`
    <div class="empty-state" style="gap:14px">${content}</div>`;
  document.getElementById('resCnt').textContent='失败';
}
function canShowProxyGuideByFilters(){
  return !S.f.search && !S.f.type && !S.f.rating && (!S.f.genres || !S.f.genres.length || S.f.genres.length===GENRES.length);
}
function proxyTipHtml(msg){
  const m = String(msg||'');
  const badApi = m.includes('服务器 405');
  const title = badApi ? '🧩 当前是后端接口配置问题' : '🌐 当前网络可能受限，请开启代理后再访问';
  const desc = badApi ? '检测到后端接口不可用。请确认你配置的 ?api 地址支持 POST /api/steam/query。' : '检测到请求 Steam 社区服务失败。请先开启 VPN/代理，再点击重试。';
  const extra = badApi ? `当前 API：${esc(apiUrl('/api/steam/query') || '(未设置)')}` : `原始错误：${esc(msg || '网络请求失败')}`;
  return `
    <div class="proxy-tip">
      <div class="proxy-title">${title}</div>
      <div class="proxy-desc">${desc}</div>
      <div class="proxy-desc">${extra}</div>
      <div class="proxy-actions">
        <button class="proxy-btn" onclick="load()">已开启代理，立即重试</button>
        <button class="proxy-btn alt" onclick="copyProxyDomains()">复制代理域名</button>
      </div>
    </div>`;
}
function copyProxyDomains(){
  const txt = PROXY_DOMAINS.join('\n');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>toast('代理域名已复制','ok')).catch(()=>toast('复制失败，请手动复制','warn'));
    return;
  }
  toast('当前环境不支持自动复制，请手动复制域名','warn');
}

function renderItems(items){
  if(!items||!items.length){ showEmpty('暂无壁纸数据'); return; }
  const isL = S.view==='list';
  const con  = document.getElementById('wcon');
  con.innerHTML=`<div class="wgrid ${isL?'lv':''}">${items.map((it,i)=>cardHtml(it,isL,i)).join('')}</div>`;
  // Lazy load images - only load if src is non-empty
  con.querySelectorAll('img[data-src]').forEach(img=>{
    const src = img.dataset.src;
    if (!src || src === 'PLACEHOLDER') {
      img.src = PLACEHOLDER;
      img.previousElementSibling?.remove();
      return;
    }
    const ob=new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){
          const el=e.target;
          const realSrc = el.dataset.src;
          if (!realSrc) { el.src=PLACEHOLDER; el.previousElementSibling?.remove(); ob.disconnect(); return; }
          el.src = realSrc;
          el.onload = () => { el.previousElementSibling?.remove(); };
          el.onerror = () => { el.previousElementSibling?.remove(); el.src = PLACEHOLDER; el.style.opacity='.4'; };
          ob.disconnect();
        }
      });
    },{rootMargin:'150px'});
    ob.observe(img);
  });
}

/* Placeholder SVG for missing thumbnails */
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Crect width='320' height='320' fill='%231c2030'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%235a6278' font-size='14'%3E🖼%3C/text%3E%3C/svg%3E`;

function cardHtml(item, isL, idx){
  const fid   = item.publishedfileid;
  const title = item.title || '未命名壁纸';
  const thumb = item.preview_url || '';
  const type  = getType(item);
  const subs  = fmtN(item.subscriptions||item.lifetime_subscriptions||0);
  const views = fmtN(item.views||0);
  const delay = Math.min(idx*25,400);

  return `
  <div class="card ${isL?'lv':''}" style="animation-delay:${delay}ms" onclick="openModal('${fid}')">
    <div class="card-thumb">
      <div class="skel"></div>
      <img data-src="${thumb||'PLACEHOLDER'}" data-id="${fid}" alt="${esc(title)}" loading="lazy">
      <span class="type-badge ${type.toLowerCase()}">${type}</span>
    </div>
    <div class="card-body">
      <div class="card-title" title="${esc(title)}">${esc(title)}</div>
      <div class="card-meta">
        <span class="cstat">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${subs}
        </span>
        <span class="cstat">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          ${views}
        </span>
      </div>
    </div>
    <div class="card-foot">
      <button class="sub-btn" id="sub-${fid}" data-fid="${fid}" data-title="${esc(title)}" onclick="event.preventDefault();event.stopPropagation();dlWall(this.dataset.fid,this.dataset.title);return false;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        订阅
      </button>
    </div>
  </div>`;
}

/* ================================================================
   PAGINATION
================================================================ */
function renderPagination(){
  const pg=document.getElementById('pgn'), cur=S.page, tot=S.totalPages;
  if(tot<=1){ pg.innerHTML=''; return; }
  let pages=[1];
  if(cur>3) pages.push('…');
  for(let i=Math.max(2,cur-1);i<=Math.min(tot-1,cur+1);i++) pages.push(i);
  if(cur<tot-2) pages.push('…');
  if(tot>1) pages.push(tot);
  pg.innerHTML=`
    <button class="pbtn" onclick="goPage(${cur-1})" ${cur===1?'disabled':''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>上一页</button>
    ${pages.map(p=>p==='…'
      ?`<span class="pbtn" style="pointer-events:none;opacity:.4">…</span>`
      :`<button class="pbtn ${p===cur?'cur':''}" onclick="goPage(${p})">${p}</button>`
    ).join('')}
    <button class="pbtn" onclick="goPage(${cur+1})" ${cur===tot?'disabled':''}>下一页<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>`;
}
function goPage(p){ if(p<1||p>S.totalPages||p===S.page) return; S.page=p; window.scrollTo({top:0,behavior:'smooth'}); load(); }

/* ================================================================
   MODAL
================================================================ */
function openModal(id){
  const item = S.items.find(w=>w.publishedfileid===id);
  if(!item) return;

  const thumb = item.preview_url||'';
  document.getElementById('mTitle').textContent = item.title||'未命名壁纸';
  document.getElementById('mSub').innerHTML = `<span>🆔 ${id}</span><span>作者: 加载中...</span>`;
  document.getElementById('mImg').src   = thumb||PLACEHOLDER;
  document.getElementById('mImg').style.display = '';
  document.getElementById('mDesc').textContent = item.short_description||'加载详细描述中...';
  document.getElementById('mSteam').href = `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
  document.getElementById('mSubBtn').onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); closeModal(); dlWall(id, item.title); };

  // Initial stats from list data
  renderStats({
    subs:  fmtN(item.subscriptions||item.lifetime_subscriptions||0),
    favs:  fmtN(item.favorited||item.lifetime_favorited||0),
    views: fmtN(item.views||0),
    size:  item.file_size ? fmtBytes(parseInt(item.file_size)) : '加载中...',
    upd:   item.time_updated ? fmtTime(item.time_updated) : '加载中...',
    id,
  });

  // Tags
  const tags=(item.tags||[]).map(t=>t.tag||t).filter(Boolean);
  document.getElementById('mTags').innerHTML = tags.map(t=>`<span class="tag-chip">${esc(t)}</span>`).join('');

  // Comments loading
  document.getElementById('mCmts').innerHTML=`<div class="cmt-spin"><div class="spinner-sm"></div>正在抓取留言...</div>`;

  document.getElementById('mOv').classList.add('open');
  document.body.style.overflow='hidden';
  if(!inBackendMode()){ renderCmts([]); return; }

  // Fetch details
  fetch(apiUrl(`/api/steam/details?id=${id}`))
    .then(r=>{ if(!r.ok) throw new Error(`${r.status}`); return r.json(); })
    .then(d=>{
      // Update image if better
      if(d.preview_url) document.getElementById('mImg').src=d.preview_url;
      // Update description
      if(d.description) document.getElementById('mDesc').textContent=d.description;
      // Update subtitle
      if(d.author) document.getElementById('mSub').innerHTML=`<span>🆔 ${id}</span><span>作者: ${esc(d.author)}</span>`;
      // Update tags
      if(d.tags && d.tags.length) document.getElementById('mTags').innerHTML=d.tags.map(t=>`<span class="tag-chip">${esc(t)}</span>`).join('');
      // Update stats
      renderStats({
        subs:  d.subscriptions || fmtN(item.subscriptions||0),
        favs:  d.favorited     || fmtN(item.favorited||0),
        views: d.views         || fmtN(item.views||0),
        size:  d.file_size     || '未知',
        upd:   d.time_updated  || '未知',
        id,
      });
      // Comments
      renderCmts(d.comments||[]);
    })
    .catch(err=>{ console.warn('[Detail]',err.message); renderCmts([]); });
}

function renderStats(d){
  document.getElementById('mStats').innerHTML=`
    <div class="msi"><div class="msi-ico">❤️</div><div class="msi-val">${d.subs}</div><div class="msi-lbl">订阅数</div></div>
    <div class="msi"><div class="msi-ico">⭐</div><div class="msi-val">${d.favs}</div><div class="msi-lbl">收藏数</div></div>
    <div class="msi"><div class="msi-ico">👁️</div><div class="msi-val">${d.views}</div><div class="msi-lbl">浏览量</div></div>
    <div class="msi"><div class="msi-ico">📦</div><div class="msi-val">${d.size}</div><div class="msi-lbl">文件大小</div></div>
    <div class="msi"><div class="msi-ico">🕒</div><div class="msi-val" style="font-size:11px">${d.upd}</div><div class="msi-lbl">最后更新</div></div>
    <div class="msi"><div class="msi-ico">🆔</div><div class="msi-val" style="font-size:10px;word-break:break-all">${d.id}</div><div class="msi-lbl">文件 ID</div></div>`;
}

function renderCmts(list){
  const el=document.getElementById('mCmts');
  if(!list.length){ el.innerHTML='<div class="cmt-empty">暂无留言</div>'; return; }
  el.innerHTML=list.map(c=>`
    <div class="cmt">
      <div class="cmt-head"><span class="cmt-author">${esc(normalizeUserText(c.author||'Steam用户'))}</span><span class="cmt-date">${esc(normalizeUserText(c.date||''))}</span></div>
      <div class="cmt-text">${esc(normalizeUserText(c.text||''))}</div>
    </div>`).join('');
}

function closeModal(){
  document.getElementById('mOv').classList.remove('open');
  document.body.style.overflow='';
}
function mOvClick(e){ if(e.target===document.getElementById('mOv')) closeModal(); }

/* ================================================================
   DOWNLOAD  – Call local /api/download
================================================================ */
function dlWall(fid, title){
  if(!inBackendMode()){
    const page = `https://steamcommunity.com/sharedfiles/filedetails/?id=${fid}`;
    const steamUri = `steam://openurl/${page}`;
    window.open(steamUri, '_blank');
    setTimeout(()=>window.open(page, '_blank'), 120);
    toast(`已跳转订阅页面：${title||fid}`, 'ok');
    return;
  }
  const btn=document.getElementById(`sub-${fid}`);
  let packTimer=0;
  if(btn){
    btn.classList.add('dling');
    btn.innerHTML='<i>⏳</i> 正在处理';
    packTimer=setTimeout(()=>{
      if(!btn.classList.contains('dling')) return;
      btn.innerHTML='<i>📦</i> 项目正在打包中';
      toast('项目正在打包中，请稍候…','info');
    },1800);
  }
  fetch(apiUrl(`/api/download?id=${fid}&title=${encodeURIComponent(title||'')}`))
    .then(async r=>{
      if(!r.ok){
        let msg=`HTTP ${r.status}`;
        try{
          const j=await r.json();
          msg=j.error||msg;
        }catch{}
        throw new Error(msg);
      }
      const d=r.headers.get('content-disposition')||'';
      const m=d.match(/filename\*=UTF-8''([^;]+)/i) || d.match(/filename="([^"]+)"/i);
      const name=decodeURIComponent((m&&m[1])?m[1]:(`${title||('wallpaper-'+fid)}.bin`));
      return r.blob().then(b=>({b,name}));
    })
    .then(({b,name})=>{
      if(packTimer) clearTimeout(packTimer);
      const u=URL.createObjectURL(b);
      const a=document.createElement('a');
      a.href=u;
      a.download=name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(u),1500);
      toast(`已开始下载：${name}`, 'ok');
      if(btn){
        btn.classList.remove('dling');
        btn.classList.add('done');
        btn.innerHTML='<i>✓</i> 已下载';
      }
    })
    .catch(e=>{
      if(packTimer) clearTimeout(packTimer);
      toast('工坊项目下载失败: '+e.message, 'warn');
      if(btn){ btn.classList.remove('dling'); btn.innerHTML='<i>⚠</i> 失败'; }
    });
}

/* ================================================================
   SERVER STATUS
================================================================ */
async function checkServer(){
  try{
    if(inBackendMode()){
      const r=await fetch(apiUrl(`/health?_=${Date.now()}`),{cache:'no-store'});
      if(r.ok){ document.getElementById('dot').className='dot ok'; document.getElementById('srvTxt').textContent='服务在线'; return; }
    }else{
      const r=await fetch(proxyUrl(`https://steamcommunity.com/workshop/browse/?appid=${APPID}&section=readytouseitems&p=1&numperpage=1&_=${Date.now()}`),{cache:'no-store'});
      if(r.ok){ document.getElementById('dot').className='dot ok'; document.getElementById('srvTxt').textContent='代理直连模式'; return; }
    }
  } catch{
    document.getElementById('dot').className='dot err';
    document.getElementById('srvTxt').textContent='连接失败';
  }
}

/* ================================================================
   HELPERS
================================================================ */
function getType(item){
  const ts=(item.tags||[]).map(t=>(t.tag||t).toLowerCase());
  if(ts.includes('video'))       return 'Video';
  if(ts.includes('scene'))       return 'Scene';
  if(ts.includes('application')) return 'App';
  if(ts.includes('web'))         return 'Web';
  return 'Scene';
}
function fmtN(n){ n=parseInt(n)||0; if(n>=1e6) return (n/1e6).toFixed(1)+'M'; if(n>=1e3) return (n/1e3).toFixed(1)+'K'; return n.toString(); }
function fmtBytes(b){ b=parseInt(b)||0; if(!b) return '未知'; if(b>=1073741824) return (b/1073741824).toFixed(1)+' GB'; if(b>=1048576) return (b/1048576).toFixed(1)+' MB'; if(b>=1024) return (b/1024).toFixed(1)+' KB'; return b+' B'; }
function fmtTime(ts){ ts=parseInt(ts); if(!ts) return '未知'; return new Date(ts*1000).toLocaleDateString('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function toast(msg,type='info'){
  const wrap=document.getElementById('toasts');
  const el=document.createElement('div');
  el.className=`toast ${type}`;
  el.innerHTML=`<span class="ti">${type==='ok'?'✓':type==='warn'?'⚠':'↗'}</span>${msg}`;
  wrap.appendChild(el);
  setTimeout(()=>el.remove(),2700);
}
