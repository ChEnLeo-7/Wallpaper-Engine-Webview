const APPID = 431960, PAGE_SIZE = 30;
const PROXY_DOMAINS = ['steamcommunity.com', 'api.steampowered.com', 'steamusercontent.com'];
const PREFS_KEY = 'wallhub-prefs-v1';

const S = {
  page:1, totalPages:1, totalItems:0,
  loading:false, view:'grid',
  items:[],
  f:{ search:'', sort:'trend', days:'7', type:'Video', rating:'', genres:[] }
};

const I18N = {
  zh: {
    docTitle: 'WE · Steam 壁纸工坊',
    searchPlaceholder: '搜索壁纸名称...',
    searchTitle: '搜索',
    themeToDark: '切换到暗色主题',
    themeToLight: '切换到淡色主题',
    usageBtn: '说明',
    sortLabel: '排序依据',
    sortTrend: '最热门',
    sortMostRecent: '最近',
    sortMostVotes: '最多投票',
    sortMostSubs: '最多订阅',
    daysLabel: '时间排序',
    day1: '今天',
    day7: '一周',
    day30: '一个月',
    day90: '三个月',
    day180: '半年',
    day365: '一年',
    day0: '有史以来',
    typeLabel: '类型选择',
    typeAll: '全部',
    typeScene: '场景',
    typeVideo: '视频',
    typeWeb: '网站',
    typeApp: '应用',
    ratingLabel: '年龄评级',
    ratingAll: '全部',
    ratingEveryone: '大众级',
    ratingQuestionable: '家长指导级',
    ratingMature: '限制成人级',
    filterBtn: '筛选',
    sidebarTitle: 'Genre 类型筛选',
    clear: '清除',
    selectAll: '全选',
    applyFilters: '应用筛选',
    sectionTitle: 'Steam 创意工坊壁纸',
    loadingResults: '加载中...',
    gridView: '网格',
    listView: '列表',
    commentsTitle: '💬 用户留言',
    loadingComments: '加载留言中...',
    subDownload: '订阅 / 下载到本地',
    steamPage: 'Steam页面',
    usageTitle: '使用说明',
    usageIntro: '此项目不需要登陆Steam账号，即可下载 wallpaper engine 所有壁纸项目。',
    usageLimit: '<b>访问限制：</b><br>网络访问能力因地区与运营商而异。若可直连 Steam 创意工坊则无需代理；若访问受限，请开启系统代理后使用。',
    usagePack: '<b>下载与打包规则：</b><br>所有壁纸类型都可直接下载到客户端；<br>后台下载仅用于将文件保存到服务端本地供后续管理。',
    usageDev: '<b>开发说明：</b><br>本项目全程依托人工智能辅助完成构建，发布者未审阅、未编写任何一行代码内容，若与其他项目存在代码雷同，均属巧合。',
    usageNote: '本工具并非用于规避 Wallpaper Engine 正版购买权益，严格遵循非商用、个人自用的使用场景。',
    disclaimerText: '免责声明：本项目在人工智能辅助下完成开发与整理，发布者未逐行人工审阅或手写核心代码；若与其他项目存在相似实现，可能属于技术方案趋同。项目仅供学习交流，请勿用于商业用途或侵权场景。',
    resultsZero: '0 个结果',
    noListByNetwork: '未获取到壁纸列表，当前网络可能无法访问 Steam 社区服务。',
    noMatched: '未找到匹配的壁纸，请尝试修改筛选条件',
    resultsApprox: '约 {total} 个 · 共 {pages} 页',
    loadingWorkshop: '正在抓取 Steam 创意工坊...',
    loadingWorkflow: '抓取列表 → 批量获取详情数据',
    loadFailed: '加载失败',
    retry: '重试',
    resFailed: '失败',
    proxyTitle: '🌐 当前网络可能受限，请开启代理后再访问',
    proxyDesc: '检测到请求 Steam 社区服务失败。请先开启 VPN/代理，再点击重试。',
    proxyRaw: '原始错误：{msg}',
    proxyRetest: '已开启代理，立即重试',
    copyProxyDomains: '复制代理域名',
    copiedProxyDomains: '代理域名已复制',
    copyFailed: '复制失败，请手动复制',
    noClipboard: '当前环境不支持自动复制，请手动复制域名',
    emptyData: '暂无壁纸数据',
    untitled: '未命名壁纸',
    subscribe: '订阅',
    prevPage: '上一页',
    nextPage: '下一页',
    authorLoading: '作者: 加载中...',
    loadingDesc: '加载详细描述中...',
    loadingData: '加载中...',
    loadingCmts: '正在抓取留言...',
    unknown: '未知',
    statSubs: '订阅数',
    statFavs: '收藏数',
    statViews: '浏览量',
    statSize: '文件大小',
    statUpdated: '最后更新',
    statFileId: '文件 ID',
    noComments: '暂无留言',
    steamUser: 'Steam用户',
    processing: '正在处理',
    packaging: '项目正在打包中',
    packagingToast: '项目正在打包中，请稍候…',
    downloadStarted: '已开始下载：{name}',
    downloadFailed: '工坊项目下载失败: {msg}',
    btnDownloaded: '已下载',
    btnFailed: '失败',

    playVideo: '播放视频',
    watchLater: '稍后再看',
    videoPreparing: '视频准备中...',
    videoOpening: '视频打开中...',
    videoWaitingTitle: '视频等待',
    videoWaitingDesc: '视频正在等待加载...',
    videoQueuedTip: '视频已加入播放队列',
    videoNotReady: '视频暂不可用',
    playFailed: '播放失败: {msg}',
    close: '关闭',
    settingsTitle: '设置',
    settingsBtnTitle: '设置',
    queueBtnTitle: '下载队列',
    languageSection: '语言 / Language',
    accountSection: 'Steam 账号 / Account',
    loginSteam: '登录 Steam 账号',
    loggedInSteam: '已登录: {name} (点击退出)',
    steamUserFallback: 'Steam用户',
    steamApiPlaceholder: '输入你的 Steam API Key',
    steamApiEnabled: '已启用 Steam API',
    steamApiDisabled: '未启用 Steam API',
    saveApiSettings: '保存 API 设置',
    settingsSaved: '设置已保存',
    saveFailed: '保存失败',
    saveSettingsFailed: '保存设置失败',
    serverSection: '服务端 / Server',
    restartServer: '重启服务端',
    loginTitle: 'Steam 账号登录',
    loginInfo: '登录后可下载需要账号权限的壁纸。凭据仅保存在本地会话中。',
    usernameLabel: 'Steam 用户名',
    usernamePlaceholder: '输入 Steam 用户名',
    passwordLabel: 'Steam 密码',
    passwordPlaceholder: '输入 Steam 密码',
    steamGuardLabel: 'Steam Guard 验证码',
    steamGuardPlaceholder: '输入 Steam Guard 验证码',
    steamGuardHint: '请检查邮箱或 Steam 手机应用获取验证码',
    cancel: '取消',
    login: '登录',
    submitSteamGuard: '提交验证码',
    loginRequired: '请输入用户名和密码',
    loginChecking: '登录验证中...',
    verifying: '验证中...',
    steamGuardRequired: '请输入 Steam Guard 验证码',
    loginFailed: '登录失败',
    loginSuccess: '登录成功',
    loginFailedCheck: '登录失败，请检查账号信息',
    logoutConfirm: '确定要退出 Steam 登录吗？',
    logoutFailed: '退出失败',
    logoutSuccess: '已退出登录',
    queueTitle: '📦 下载队列',
    queueStartAll: '全部开始',
    queuePauseAll: '全部暂停',
    queueClearDone: '清理完成与失败',
    queueEmpty: '当前队列空空如也',
    queueNoCover: '无封面',
    queueSizeUnknown: '大小未知',
    queuePlay: '播放',
    queueDownload: '下载',
    bgDownload: '添加到后台下载',
    queuePause: '暂停',
    queueResume: '继续',
    queuePriority: '调整优先级',
    queueMoveUp: '上移',
    queueMoveDown: '下移',
    queueDelete: '删除',
    jumpPageTitleAttr: '输入页码跳转',
    searchAuthorTitle: '搜TA的作品',
    qPending: '排队中',
    qDownloading: '下载中',
    qMoving: '转移中',
    qPaused: '已暂停',
    qError: '失败',
    qCompleted: '已完成',
  },
  en: {
    docTitle: 'WE · Steam Workshop Wallpapers',
    searchPlaceholder: 'Search wallpapers...',
    searchTitle: 'Search',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    usageBtn: 'Guide',
    sortLabel: 'Sort By',
    sortTrend: 'Trending',
    sortMostRecent: 'Most Recent',
    sortMostVotes: 'Most Votes',
    sortMostSubs: 'Most Subscribed',
    daysLabel: 'Time Range',
    day1: 'Today',
    day7: '7 Days',
    day30: '30 Days',
    day90: '3 Months',
    day180: '6 Months',
    day365: '1 Year',
    day0: 'All Time',
    typeLabel: 'Type',
    typeAll: 'All',
    typeScene: 'Scene',
    typeVideo: 'Video',
    typeWeb: 'Web',
    typeApp: 'Application',
    ratingLabel: 'Content Rating',
    ratingAll: 'All',
    ratingEveryone: 'All ages',
    ratingQuestionable: 'Parental guidance',
    ratingMature: 'Mature',
    filterBtn: 'Filter',
    sidebarTitle: 'Genre Filter',
    clear: 'Clear',
    selectAll: 'Select All',
    applyFilters: 'Apply',
    sectionTitle: 'Steam Workshop Wallpapers',
    loadingResults: 'Loading...',
    gridView: 'Grid',
    listView: 'List',
    commentsTitle: '💬 Comments',
    loadingComments: 'Loading comments...',
    subDownload: 'Subscribe / Download locally',
    steamPage: 'Steam Page',
    usageTitle: 'Usage',
    usageIntro: 'This project can download most Wallpaper Engine workshop items without logging into a Steam account.',
    usageLimit: '<b>Network Access:</b><br>Proxy requirement depends on your region and ISP. If Steam Workshop is directly reachable, no proxy is needed. If access is restricted, enable a system proxy before use.',
    usagePack: '<b>Download & Packaging Rules:</b><br>Scene/Web/Application wallpapers are packaged into a .zip file and require extraction.<br>Video wallpapers are downloaded as raw video files with no zip packaging.',
    usageDev: '<b>Development Statement:</b><br>This project was built with AI assistance. The publisher did not manually write or review the source code. Any similarity to other projects is coincidental.',
    usageNote: 'This tool is not intended to bypass legitimate Wallpaper Engine purchase rights and is only for non-commercial personal use.',
    disclaimerText: 'Disclaimer: This project was developed and organized with AI assistance. The publisher did not manually review every line or handwrite the core code. Similarities with other projects may result from convergent technical approaches. For learning and communication only; do not use for commercial or infringing purposes.',
    resultsZero: '0 results',
    noListByNetwork: 'No wallpaper list returned. Your network may not reach Steam Community.',
    noMatched: 'No matching wallpapers found. Try adjusting filters.',
    resultsApprox: '~ {total} items · {pages} pages',
    loadingWorkshop: 'Fetching Steam Workshop data...',
    loadingWorkflow: 'Fetch list → Batch details',
    loadFailed: 'Load failed',
    retry: 'Retry',
    resFailed: 'Failed',
    proxyTitle: '🌐 Network may be restricted. Enable proxy and retry.',
    proxyDesc: 'Request to Steam Community failed. Enable VPN/proxy and try again.',
    proxyRaw: 'Original error: {msg}',
    proxyRetest: 'Retry after enabling proxy',
    copyProxyDomains: 'Copy proxy domains',
    copiedProxyDomains: 'Proxy domains copied',
    copyFailed: 'Copy failed, please copy manually',
    noClipboard: 'Clipboard API unavailable, please copy manually',
    emptyData: 'No wallpaper data',
    untitled: 'Untitled Wallpaper',
    subscribe: 'Subscribe',
    prevPage: 'Prev',
    nextPage: 'Next',
    authorLoading: 'Author: Loading...',
    loadingDesc: 'Loading detailed description...',
    loadingData: 'Loading...',
    loadingCmts: 'Fetching comments...',
    unknown: 'Unknown',
    statSubs: 'Subscribers',
    statFavs: 'Favorites',
    statViews: 'Views',
    statSize: 'File Size',
    statUpdated: 'Updated',
    statFileId: 'File ID',
    noComments: 'No comments',
    steamUser: 'Steam User',
    processing: 'Processing',
    packaging: 'Packaging',
    packagingToast: 'Packaging in progress, please wait…',
    downloadStarted: 'Download started: {name}',
    downloadFailed: 'Workshop download failed: {msg}',
    btnDownloaded: 'Downloaded',
    btnFailed: 'Failed',
    playVideo: 'Play Video',
    watchLater: 'Watch Later',
    videoPreparing: 'Preparing video cache...',
    videoOpening: 'Cache ready, opening player...',
    videoWaitingTitle: 'Caching Video',
    videoWaitingDesc: 'Please wait while server downloads and caches the video.',
    videoQueuedTip: 'Added to cache queue. Check progress in queue list.',
    videoNotReady: 'Video is still caching. Please try again later.',
    playFailed: 'Play failed: {msg}',
    close: 'Close',
    settingsTitle: 'Settings',
    settingsBtnTitle: 'Settings',
    queueBtnTitle: 'Download queue',
    languageSection: 'Language',
    accountSection: 'Steam Account',
    loginSteam: 'Log in to Steam',
    loggedInSteam: 'Logged in: {name} (click to sign out)',
    steamUserFallback: 'Steam user',
    steamApiPlaceholder: 'Enter your Steam API Key',
    steamApiEnabled: 'Steam API enabled',
    steamApiDisabled: 'Steam API disabled',
    saveApiSettings: 'Save API Settings',
    settingsSaved: 'Settings saved',
    saveFailed: 'Save failed',
    saveSettingsFailed: 'Failed to save settings',
    serverSection: 'Server',
    restartServer: 'Restart server',
    loginTitle: 'Steam Account Login',
    loginInfo: 'Log in to download wallpapers that require account access. Credentials are kept only in the local session.',
    usernameLabel: 'Steam username',
    usernamePlaceholder: 'Enter Steam username',
    passwordLabel: 'Steam password',
    passwordPlaceholder: 'Enter Steam password',
    steamGuardLabel: 'Steam Guard code',
    steamGuardPlaceholder: 'Enter Steam Guard code',
    steamGuardHint: 'Check your email or Steam mobile app for the code',
    cancel: 'Cancel',
    login: 'Log in',
    submitSteamGuard: 'Submit code',
    loginRequired: 'Please enter username and password',
    loginChecking: 'Checking login...',
    verifying: 'Verifying...',
    steamGuardRequired: 'Enter the Steam Guard code',
    loginFailed: 'Login failed',
    loginSuccess: 'Login successful',
    loginFailedCheck: 'Login failed. Check your account information.',
    logoutConfirm: 'Sign out of Steam?',
    logoutFailed: 'Sign out failed',
    logoutSuccess: 'Signed out',
    queueTitle: '📦 Download Queue',
    queueStartAll: 'Start All',
    queuePauseAll: 'Pause All',
    queueClearDone: 'Clear Completed/Failed',
    queueEmpty: 'The queue is empty',
    queueNoCover: 'No cover',
    queueSizeUnknown: 'Size unknown',
    queuePlay: 'Play',
    queueDownload: 'Download',
    bgDownload: 'Add to background downloads',
    queuePause: 'Pause',
    queueResume: 'Resume',
    queuePriority: 'Adjust priority',
    queueMoveUp: 'Move up',
    queueMoveDown: 'Move down',
    queueDelete: 'Delete',
    jumpPageTitleAttr: 'Enter page number',
    searchAuthorTitle: 'Search this author',
    qPending: 'Queued',
    qDownloading: 'Downloading',
    qMoving: 'Moving',
    qPaused: 'Paused',
    qError: 'Failed',
    qCompleted: 'Completed',
  }
};

let currentLang = 'zh';
let steamApiEnabled = false;

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

document.addEventListener('DOMContentLoaded', ()=>{
  setupLanguage();
  initTheme();
  restorePrefs();
  renderGenreGrid();
  setupEvents();
  applyStateToControls();
  syncFiltersFromControls();
  loadServerRuntime();
  checkSteamLoginStatus();
  load();
});

function t(k, vars){
  let s = (I18N[currentLang] && I18N[currentLang][k]) || I18N.zh[k] || k;
  if (vars && typeof vars === 'object') {
    Object.keys(vars).forEach((name)=>{
      s = s.replace(new RegExp(`\\{${name}\\}`, 'g'), String(vars[name]));
    });
  }
  return s;
}
function setFirstTextNode(el, value){
  if (!el) return;
  const n = Array.from(el.childNodes).find(x => x.nodeType === 3 && String(x.nodeValue || '').trim().length > 0);
  if (n) {
    n.nodeValue = ` ${value}`;
    return;
  }
  el.appendChild(document.createTextNode(` ${value}`));
}
function setupLanguage(){
  const saved = localStorage.getItem('wallhub-lang');
  if (saved === 'zh' || saved === 'en') currentLang = saved;
  else currentLang = /^zh/i.test(String(navigator.language || '')) ? 'zh' : 'en';
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', ()=>{
      switchLanguage(currentLang === 'zh' ? 'en' : 'zh');
    });
  }
  applyLanguage();
}
function switchLanguage(lang){
  if (lang !== 'zh' && lang !== 'en') return;
  if (currentLang === lang) return;
  currentLang = lang;
  localStorage.setItem('wallhub-lang', lang);
  applyLanguage();
  updateSettingsCheckmarks();
  updateSteamApiToggleUI();
  checkSteamLoginStatus();
  renderGenreGrid();
  renderItems(S.items || []);
  renderPagination();
  lastQueueRenderKey = '';
  fetchQueue();
}
function applyLanguage(){
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  document.title = t('docTitle');
  const langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.classList.add('active');
    langBtn.textContent = currentLang === 'zh' ? '中' : 'EN';
    const title = currentLang === 'zh' ? '切换到英文' : 'Switch to Chinese';
    langBtn.title = title;
    langBtn.setAttribute('aria-label', title);
  }
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const usageBtn = document.getElementById('usageBtn');
  const filterBtn = document.getElementById('filterBtn');
  const genreToggleBtn = document.getElementById('genreToggleBtn');
  const settingsBtn = document.getElementById('settingsBtn');
  const queueBtn = document.getElementById('queueBtn');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');
  if (searchBtn) {
    searchBtn.title = t('searchTitle');
    searchBtn.setAttribute('aria-label', t('searchTitle'));
  }
  if (usageBtn) {
    usageBtn.title = t('usageBtn');
    usageBtn.setAttribute('aria-label', t('usageBtn'));
  }
  if (settingsBtn) {
    settingsBtn.title = t('settingsBtnTitle');
    settingsBtn.setAttribute('aria-label', t('settingsBtnTitle'));
  }
  if (queueBtn) {
    queueBtn.title = t('queueBtnTitle');
    queueBtn.setAttribute('aria-label', t('queueBtnTitle'));
  }
  if (filterBtn) setFirstTextNode(filterBtn, t('filterBtn'));
  if (genreToggleBtn) genreToggleBtn.textContent = activeGenres.size === GENRES.length ? t('clear') : t('selectAll');
  const sortLabel = document.querySelector('#sortGrp .fl');
  const daysLabel = document.querySelector('#daysGrp .fl');
  const typeLabel = document.querySelector('#typeGrp .fl');
  const ratingLabel = document.querySelector('#ratingGrp .fl');
  if (sortLabel) sortLabel.textContent = t('sortLabel');
  if (daysLabel) daysLabel.textContent = t('daysLabel');
  if (typeLabel) typeLabel.textContent = t('typeLabel');
  if (ratingLabel) ratingLabel.textContent = t('ratingLabel');
  const sortSel = document.getElementById('sortSel');
  if (sortSel) {
    sortSel.options[0].text = t('sortTrend');
    sortSel.options[1].text = t('sortMostRecent');
    sortSel.options[2].text = t('sortMostVotes');
    sortSel.options[3].text = t('sortMostSubs');
  }
  const daysSel = document.getElementById('daysSel');
  if (daysSel) {
    daysSel.options[0].text = t('day1');
    daysSel.options[1].text = t('day7');
    daysSel.options[2].text = t('day30');
    daysSel.options[3].text = t('day90');
    daysSel.options[4].text = t('day180');
    daysSel.options[5].text = t('day365');
    daysSel.options[6].text = t('day0');
  }
  const typeSel = document.getElementById('typeSel');
  if (typeSel) {
    typeSel.options[0].text = t('typeAll');
    typeSel.options[1].text = t('typeScene');
    typeSel.options[2].text = t('typeVideo');
    typeSel.options[3].text = t('typeWeb');
    typeSel.options[4].text = t('typeApp');
  }
  const ratingSel = document.getElementById('ratingSel');
  if (ratingSel) {
    ratingSel.options[0].text = t('ratingAll');
    ratingSel.options[1].text = t('ratingEveryone');
    ratingSel.options[2].text = t('ratingQuestionable');
    ratingSel.options[3].text = t('ratingMature');
  }
  const sidebarTitle = document.querySelector('.sb-title');
  if (sidebarTitle) sidebarTitle.lastChild.textContent = ` ${t('sidebarTitle')}`;
  const applyBtn = document.querySelector('.sb-foot .btn-p');
  if (applyBtn) applyBtn.textContent = t('applyFilters');
  const secTitle = document.querySelector('.sec-title');
  if (secTitle) secTitle.textContent = t('sectionTitle');
  const resCnt = document.getElementById('resCnt');
  if (resCnt && !resCnt.textContent.trim()) resCnt.textContent = t('loadingResults');
  const vgrid = document.getElementById('vgrid');
  const vlist = document.getElementById('vlist');
  if (vgrid) vgrid.title = t('gridView');
  if (vlist) vlist.title = t('listView');
  const cmtTitle = document.querySelector('.cmt-title');
  if (cmtTitle) cmtTitle.textContent = t('commentsTitle');
  const cmtSpin = document.querySelector('#mCmts .cmt-spin');
  if (cmtSpin) cmtSpin.innerHTML = `<div class="spinner-sm"></div>${t('loadingComments')}`;
  const mSubBtn = document.getElementById('mSubBtn');
  if (mSubBtn) setFirstTextNode(mSubBtn, t('subDownload'));
  const mPlayBtn = document.getElementById('mPlayBtn');
  if (mPlayBtn) setFirstTextNode(mPlayBtn, currentLang === 'zh' ? '播放视频' : t('playVideo'));
  const mWatchLaterBtn = document.getElementById('mWatchLaterBtn');
  if (mWatchLaterBtn) setFirstTextNode(mWatchLaterBtn, currentLang === 'zh' ? '稍后再看' : t('watchLater'));
  const mBgDownloadBtn = document.getElementById('mBgDownloadBtn');
  if (mBgDownloadBtn) setFirstTextNode(mBgDownloadBtn, t('bgDownload'));
  const mSteam = document.getElementById('mSteam');
  if (mSteam) setFirstTextNode(mSteam, t('steamPage'));
  const usageTitle = document.querySelector('.usage-title');
  if (usageTitle) usageTitle.textContent = t('usageTitle');
  const usageIntro = document.querySelector('.usage-topic-text');
  if (usageIntro) usageIntro.textContent = t('usageIntro');
  const usageItems = document.querySelectorAll('.usage-item');
  if (usageItems[0]) usageItems[0].innerHTML = t('usageLimit');
  if (usageItems[1]) usageItems[1].innerHTML = t('usagePack');
  if (usageItems[2]) usageItems[2].innerHTML = t('usageDev');
  const usageNote = document.querySelector('.usage-note');
  if (usageNote) usageNote.textContent = t('usageNote');
  const siteDisclaimerText = document.getElementById('siteDisclaimerText');
  if (siteDisclaimerText) siteDisclaimerText.textContent = t('disclaimerText');
  const settingsTitle = document.querySelector('#settingsModalOv .settings-modal-title');
  if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
  const settingsSections = document.querySelectorAll('#settingsModalOv .settings-section-title');
  if (settingsSections[0]) settingsSections[0].textContent = t('languageSection');
  if (settingsSections[1]) settingsSections[1].textContent = t('accountSection');
  if (settingsSections[2]) settingsSections[2].textContent = 'Steam API';
  if (settingsSections[3]) settingsSections[3].textContent = t('serverSection');
  const apiInput = document.getElementById('steamApiKeyInput');
  if (apiInput) apiInput.placeholder = t('steamApiPlaceholder');
  const saveApiBtn = document.querySelector('#settingsModalOv .settings-save-btn');
  if (saveApiBtn) saveApiBtn.textContent = t('saveApiSettings');
  const restartTxt = document.getElementById('restartServerText');
  if (restartTxt) restartTxt.textContent = t('restartServer');
  const loginTitle = document.querySelector('#loginModalOv .login-modal-title');
  if (loginTitle) loginTitle.textContent = t('loginTitle');
  const loginInfo = document.querySelector('#loginModalOv .login-info span');
  if (loginInfo) loginInfo.textContent = t('loginInfo');
  const userLabel = document.querySelector('label[for="steamUsername"]');
  if (userLabel) userLabel.textContent = t('usernameLabel');
  const userInput = document.getElementById('steamUsername');
  if (userInput) userInput.placeholder = t('usernamePlaceholder');
  const passLabel = document.querySelector('label[for="steamPassword"]');
  if (passLabel) passLabel.textContent = t('passwordLabel');
  const passInput = document.getElementById('steamPassword');
  if (passInput) passInput.placeholder = t('passwordPlaceholder');
  const guardLabel = document.querySelector('label[for="steamGuardCode"]');
  if (guardLabel) guardLabel.textContent = t('steamGuardLabel');
  const guardInput = document.getElementById('steamGuardCode');
  if (guardInput) guardInput.placeholder = t('steamGuardPlaceholder');
  const guardHint = document.querySelector('#steamGuardGroup .form-hint');
  if (guardHint) guardHint.textContent = t('steamGuardHint');
  const loginCancel = document.querySelector('#loginModalOv .login-modal-foot .btn-s');
  if (loginCancel) loginCancel.textContent = t('cancel');
  const loginSubmit = document.getElementById('loginSubmitBtn');
  if (loginSubmit && !loginSubmit.disabled) loginSubmit.textContent = t('login');
  const queueTitle = document.querySelector('#queueModalOv .settings-modal-title');
  if (queueTitle) queueTitle.textContent = t('queueTitle');
  const queueButtons = document.querySelectorAll('#queueModalOv .settings-modal-head .btn-s');
  if (queueButtons[0]) queueButtons[0].textContent = t('queueStartAll');
  if (queueButtons[1]) queueButtons[1].textContent = t('queuePauseAll');
  if (queueButtons[2]) queueButtons[2].textContent = t('queueClearDone');
}

function setupEvents(){
  document.getElementById('searchInput').addEventListener('keydown', e=>{ if(e.key==='Enter') doSearch(); });
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('settingsBtn').addEventListener('click', openSettingsModal);
  document.getElementById('sortSel').addEventListener('change', e=>{ S.f.sort=e.target.value; S.page=1; syncDaysVisible(); savePrefs(); load(); });
  document.getElementById('daysSel').addEventListener('change', e=>{ S.f.days=e.target.value; S.page=1; savePrefs(); load(); });
  document.getElementById('typeSel').addEventListener('change', e=>{ S.f.type=e.target.value; S.page=1; savePrefs(); load(); });
  document.getElementById('ratingSel').addEventListener('change', e=>{ S.f.rating=e.target.value; S.page=1; savePrefs(); load(); });
}
function syncFiltersFromControls(){
  const sortSel = document.getElementById('sortSel');
  const daysSel = document.getElementById('daysSel');
  const typeSel = document.getElementById('typeSel');
  const ratingSel = document.getElementById('ratingSel');

  if (sortSel) S.f.sort = sortSel.value || 'trend';
  if (daysSel) S.f.days = daysSel.value || '7';
  if (typeSel) S.f.type = typeSel.value || '';
  if (ratingSel) S.f.rating = ratingSel.value || '';
  S.f.genres = Array.from(activeGenres);
  syncDaysVisible();
  savePrefs();
}

function initTheme(){
  const saved = localStorage.getItem('wallhub-theme');
  applyTheme(saved === 'light' ? 'light' : 'dark');
}
function applyTheme(mode){
  const isLight = mode === 'light';
  document.body.classList.toggle('theme-light', isLight);
  const btn = document.getElementById('themeBtn');
  if(btn){
    btn.title = isLight ? t('themeToDark') : t('themeToLight');
    btn.setAttribute('aria-label', btn.title);
  }
  localStorage.setItem('wallhub-theme', isLight ? 'light' : 'dark');
  updateSettingsCheckmarks();
}
function toggleTheme(){
  applyTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
}
function openUsage(){ document.getElementById('usageOv').classList.add('open'); document.body.style.overflow='hidden'; }
function closeUsage(){ document.getElementById('usageOv').classList.remove('open'); document.body.style.overflow=''; }
function usageOvClick(e){ if(e.target===document.getElementById('usageOv')) closeUsage(); }

function openSettingsModal(){
  updateSettingsCheckmarks();
  loadServerRuntime();
  document.getElementById('settingsModalOv').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSettingsModal(){
  document.getElementById('settingsModalOv').classList.remove('open');
  document.body.style.overflow='';
}
function settingsModalOvClick(e){
  if(e.target===document.getElementById('settingsModalOv')) closeSettingsModal();
}
function updateSettingsCheckmarks(){
  // Update language checkmarks
  const langZhCheck = document.querySelector('#langZh .settings-option-check');
  const langEnCheck = document.querySelector('#langEn .settings-option-check');
  if(langZhCheck) langZhCheck.style.display = currentLang === 'zh' ? 'inline' : 'none';
  if(langEnCheck) langEnCheck.style.display = currentLang === 'en' ? 'inline' : 'none';

  // Load cache settings
  loadCacheSettings();
}

async function loadServerRuntime(){
  const section = document.getElementById('serverSettingsSection');
  if (!section) return;
  section.style.display = 'none';
  try {
    const res = await fetch('/api/server/runtime');
    if (!res.ok) return;
    const data = await res.json();
    section.style.display = data.canRestart ? '' : 'none';
  } catch(e) {
    section.style.display = 'none';
  }
}

// ─────────────────────────────────────────────────────────────────
//  API Settings Management Functions
// ─────────────────────────────────────────────────────────────────
async function loadCacheSettings(){
  try {
    const res = await fetch('/api/video/cache/settings');
    if(res.ok){
      const data = await res.json();
      const keyInput = document.getElementById('steamApiKeyInput');
      if(keyInput) keyInput.value = data.steamApiKey || '';
      steamApiEnabled = !!data.useSteamApi;
      updateSteamApiToggleUI();
    }
  } catch(e){
    console.warn('[Cache] Failed to load settings:', e);
  }
}

function updateSteamApiToggleUI(){
  const txt = document.getElementById('steamApiToggleText');
  const chk = document.getElementById('steamApiToggleCheck');
  if(txt) txt.textContent = steamApiEnabled ? t('steamApiEnabled') : t('steamApiDisabled');
  if(chk) chk.style.display = steamApiEnabled ? 'inline' : 'none';
}

function toggleSteamApi(){
  steamApiEnabled = !steamApiEnabled;
  updateSteamApiToggleUI();
}

async function saveCacheSettings(){
  const keyInput = document.getElementById('steamApiKeyInput');
  try {
    const res = await fetch('/api/video/cache/settings', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        steamApiKey: keyInput ? keyInput.value.trim() : '',
        useSteamApi: steamApiEnabled
      })
    });
    
    if(res.ok){
      toast(t('settingsSaved'), 'ok');
    } else {
      throw new Error(t('saveFailed'));
    }
  } catch(e){
    console.error('[Cache] Save failed:', e);
    toast(t('saveSettingsFailed'), 'warn');
  }
}

async function restartServer(){
  const btn = document.getElementById('restartServerBtn');
  const txt = document.getElementById('restartServerText');
  if(!confirm(currentLang === 'en' ? 'Restart the server now?' : '确定要重启服务端吗？')) return;
  const oldText = txt ? txt.textContent : '';
  try {
    if(btn) btn.disabled = true;
    if(txt) txt.textContent = currentLang === 'en' ? 'Restarting...' : '正在重启...';
    const res = await fetch('/api/server/restart', { method: 'POST' });
    const data = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(data.error || ('HTTP ' + res.status));
    toast(data.message || (currentLang === 'en' ? 'Server is restarting' : '服务端正在重启'), 'ok');
    setTimeout(() => { window.location.reload(); }, 3500);
  } catch(e) {
    if(btn) btn.disabled = false;
    if(txt) txt.textContent = oldText || (currentLang === 'en' ? 'Restart server' : '重启服务端');
    toast((currentLang === 'en' ? 'Restart failed: ' : '重启失败: ') + e.message, 'warn');
  }
}
function doSearch(){
  S.f.search = document.getElementById('searchInput').value.trim();
  S.page = 1; load();
}
function syncDaysVisible(){
  document.getElementById('daysGrp').style.display = S.f.sort==='trend' ? '' : 'none';
}

function restorePrefs(){
  let raw = null;
  try{
    raw = localStorage.getItem(PREFS_KEY);
  }catch{}
  if(!raw) return;
  try{
    const saved = JSON.parse(raw);
    if(saved && (saved.view === 'grid' || saved.view === 'list')) S.view = saved.view;
    if(saved && saved.f){
      const allowedSort = ['trend', 'mostrecent', 'mostvotes', 'totaluniquesubscribers'];
      const allowedDays = ['1','7','30','90','180','365','0'];
      const allowedType = ['', 'Scene', 'Video', 'Web', 'Application'];
      const allowedRating = ['', 'Everyone', 'Questionable', 'Mature'];

      if(allowedSort.includes(saved.f.sort)) S.f.sort = saved.f.sort;
      if(allowedDays.includes(String(saved.f.days))) S.f.days = String(saved.f.days);
      if(allowedType.includes(saved.f.type || '')) S.f.type = saved.f.type || '';
      if(allowedRating.includes(saved.f.rating || '')) S.f.rating = saved.f.rating || '';

      const savedGenres = Array.isArray(saved.f.genres) ? saved.f.genres : [];
      const validGenres = savedGenres.filter(g=>GENRES.some(x=>x.id===g));
      if(validGenres.length){
        activeGenres = new Set(validGenres);
      }
    }
  }catch{}
  S.f.genres = Array.from(activeGenres);
}
function applyStateToControls(){
  const sortSel = document.getElementById('sortSel');
  const daysSel = document.getElementById('daysSel');
  const typeSel = document.getElementById('typeSel');
  const ratingSel = document.getElementById('ratingSel');
  if(sortSel) sortSel.value = S.f.sort;
  if(daysSel) daysSel.value = S.f.days;
  if(typeSel) typeSel.value = S.f.type;
  if(ratingSel) ratingSel.value = S.f.rating;
  syncDaysVisible();
  setView(S.view);
}
function savePrefs(){
  const payload = {
    view: S.view,
    f: {
      sort: S.f.sort,
      days: S.f.days,
      type: S.f.type,
      rating: S.f.rating,
      genres: Array.from(activeGenres),
    },
  };
  try{
    localStorage.setItem(PREFS_KEY, JSON.stringify(payload));
  }catch{}
}

let activeGenres = new Set(GENRES.map(g=>g.id));

function renderGenreGrid(){
  document.getElementById('genreGrid').innerHTML = GENRES.map(g=>`
    <div class="gc ${activeGenres.has(g.id) ? 'sel2' : ''}"
         onclick="toggleGenre('${g.id}')">
      <div class="gc-chk"></div><span>${currentLang === 'en' ? g.id : g.n}</span>
    </div>`).join('');
  updateBadge();
}

function toggleGenre(id){
  if(activeGenres.has(id)) activeGenres.delete(id);
  else activeGenres.add(id);
  S.f.genres = Array.from(activeGenres);
  savePrefs();
  renderGenreGrid();
}

function updateBadge(){
  const cnt = activeGenres.size;
  const all = cnt === GENRES.length;
  document.getElementById('fbadge').textContent = all ? (currentLang === 'en' ? 'All' : '全') : String(cnt);
  document.getElementById('filterBtn').classList.toggle('active', !all);
  const btn = document.getElementById('genreToggleBtn');
  if (btn) btn.textContent = all ? t('clear') : t('selectAll');
}
function openSB(){ document.getElementById('sb').classList.add('open'); document.getElementById('sbOv').classList.add('open'); document.body.style.overflow='hidden'; }
function closeSB(){ document.getElementById('sb').classList.remove('open'); document.getElementById('sbOv').classList.remove('open'); document.body.style.overflow=''; }
function toggleGenresAll(){
  if (activeGenres.size === GENRES.length) activeGenres = new Set();
  else activeGenres = new Set(GENRES.map(g=>g.id));
  S.f.genres = Array.from(activeGenres);
  savePrefs();
  renderGenreGrid();
}
function applyFilters(){ closeSB(); S.page=1; savePrefs(); load(); }

function setView(v){
  S.view=v;
  document.getElementById('vgrid').classList.toggle('active',v==='grid');
  document.getElementById('vlist').classList.toggle('active',v==='list');
  savePrefs();
  renderItems(S.items);
}

function buildParams(){
  const f = S.f;
  const params = {
    appid: APPID,
    query_type: {trend:1, mostrecent:2, mostvotes:11, totaluniquesubscribers:16}[f.sort]||1,
    page: S.page,
    numperpage: PAGE_SIZE,
  };
  
  // 拦截搜索框中的 author: 语法，转为作者专属查询参数
  if(f.search) {
    if (f.search.trim().startsWith('author:')) {
      params.creator = f.search.trim().split('author:')[1].trim();
    } else {
      params.search_text = f.search;
    }
  }

  if(f.days && f.sort==='trend' && f.days!=='0') params.days = parseInt(f.days);

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

// 全局作者搜索跳转函数
function searchByCreator(creatorId) {
  if (!creatorId) return;
  closeModal(); // 关闭详情弹窗
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = 'author:' + creatorId;
  S.page = 1;
  S.f.search = 'author:' + creatorId;
  savePrefs();
  load(); // 触发搜索
}

async function load(){
  if(S.loading) return;
  syncFiltersFromControls();
  S.loading=true;
  showLoading();
  try {
    const res  = await fetch('/api/steam/query',{
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({params:buildParams()})
    });
    if(!res.ok){
      let serverMsg='';
      try{
        const j = await res.json();
        serverMsg = j && (j.error || j.message) ? String(j.error || j.message) : '';
      }catch{}
      throw new Error(serverMsg || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const resp = data.response||data;
    const list = resp.publishedfiledetails||[];

    if(!list.length){
      document.getElementById('resCnt').textContent=t('resultsZero');
      if(canShowProxyGuideByFilters()){
        showError(t('noListByNetwork'));
      }else{
        showEmpty(t('noMatched'));
      }
      document.getElementById('pgn').innerHTML='';
    } else {
      S.items      = list;
      S.totalItems = parseInt(resp.total) || list.length;
      S.totalPages = Math.min(999, Math.max(1, Math.ceil(S.totalItems / PAGE_SIZE)));
      const dispTotal = S.totalItems >= 50000 ? '50,000+' : S.totalItems.toLocaleString(currentLang === 'en' ? 'en-US' : 'zh-CN');
      document.getElementById('resCnt').textContent = t('resultsApprox', { total: dispTotal, pages: S.totalPages });
      renderItems(S.items);
      renderPagination();
    }
  } catch(err){
    console.error(err);
    showError(err.message);
  } finally { S.loading=false; }
}

function showLoading(){
  toggleDisclaimer(false);
  document.getElementById('wcon').innerHTML=`
    <div class="loading-state">
      <div class="spinner"></div>
      <span style="font-size:14px;color:var(--text3)">${t('loadingWorkshop')}</span>
      <span style="font-size:12px;color:var(--text3);margin-top:2px">${t('loadingWorkflow')}</span>
    </div>`;
  document.getElementById('pgn').innerHTML='';
}
function showEmpty(msg){
  toggleDisclaimer(false);
  document.getElementById('wcon').innerHTML=`
    <div class="empty-state"><div class="empty-icon">🖼️</div><div>${msg}</div></div>`;
}
function showError(msg){
  toggleDisclaimer(false);
  const content = `
      <div style="font-size:44px">⚠️</div>
      <div style="color:var(--danger);font-size:16px;font-weight:600">${t('loadFailed')}</div>
      <div style="font-size:13px;color:var(--text3);max-width:420px">${esc(msg)}</div>
      <button onclick="load()" style="background:var(--accent);border:none;border-radius:8px;color:#fff;padding:9px 22px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;margin-top:4px">🔄 ${t('retry')}</button>
      ${proxyTipHtml(msg)}
  `;
  document.getElementById('wcon').innerHTML=`
    <div class="empty-state" style="gap:14px">${content}</div>`;
  document.getElementById('resCnt').textContent=t('resFailed');
}
function canShowProxyGuideByFilters(){
  return !S.f.search && !S.f.type && !S.f.rating && (!S.f.genres || !S.f.genres.length || S.f.genres.length===GENRES.length);
}
function proxyTipHtml(msg){
  return `
    <div class="proxy-tip">
      <div class="proxy-title">${t('proxyTitle')}</div>
      <div class="proxy-desc">${t('proxyDesc')}</div>
      <div class="proxy-desc">${t('proxyRaw', { msg: esc(msg || t('loadFailed')) })}</div>
      <div class="proxy-actions">
        <button class="proxy-btn" onclick="load()">${t('proxyRetest')}</button>
        <button class="proxy-btn alt" onclick="copyProxyDomains()">${t('copyProxyDomains')}</button>
      </div>
    </div>`;
}
function copyProxyDomains(){
  const txt = PROXY_DOMAINS.join('\n');
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>toast(t('copiedProxyDomains'),'ok')).catch(()=>toast(t('copyFailed'),'warn'));
    return;
  }
  toast(t('noClipboard'),'warn');
}

function renderItems(items){
  if(!items||!items.length){ showEmpty(t('emptyData')); return; }
  toggleDisclaimer(true);
  const isL = S.view==='list';
  const con  = document.getElementById('wcon');
  con.innerHTML=`<div class="wgrid ${isL?'lv':''}">${items.map((it,i)=>cardHtml(it,isL,i)).join('')}</div>`;
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

const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Crect width='320' height='320' fill='%231c2030'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%235a6278' font-size='14'%3E🖼%3C/text%3E%3C/svg%3E`;

function cardHtml(item, isL, idx){
  const fid   = item.publishedfileid;
  const title = item.title || t('untitled');
  const thumb = item.preview_url || '';
  const type  = getType(item);
  const typeText = type === 'Video'
    ? t('typeVideo')
    : type === 'Web'
      ? t('typeWeb')
      : type === 'App'
        ? t('typeApp')
        : t('typeScene');
        
  // 提取收藏量和文件大小数据
  const subs  = fmtN(item.subscriptions||item.lifetime_subscriptions||0);
  const favs  = fmtN(item.favorited||item.lifetime_favorited||0);
  const size  = item.file_size ? fmtBytes(parseInt(item.file_size)) : t('unknown');
  const delay = Math.min(idx*25,400);

  return `
  <div class="card ${isL?'lv':''}" style="animation-delay:${delay}ms" onclick="openModal('${fid}')">
    <div class="card-thumb">
      <div class="skel"></div>
      <img data-src="${thumb||'PLACEHOLDER'}" data-id="${fid}" alt="${esc(title)}" loading="lazy">
      <span class="type-badge ${type.toLowerCase()}">${typeText}</span>
    </div>
    <div class="card-body">
      <div class="card-title" title="${esc(title)}">${esc(title)}</div>
      <div class="card-meta">
        <div class="card-metrics">
          <span class="cstat" title="${t('statSubs')}">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${subs}
          </span>
          <span class="cstat" title="${t('statFavs')}">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            ${favs}
          </span>
        </div>
        <span class="card-author" title="${t('statSize')}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <span class="card-author-name">${size}</span>
        </span>
      </div>
    </div>
    <div class="card-foot">
      <button class="sub-btn" id="sub-${fid}" data-fid="${fid}" data-title="${esc(title)}" onclick="event.preventDefault();event.stopPropagation();dlWall(this.dataset.fid,this.dataset.title);return false;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        ${t('subscribe')}
      </button>
    </div>
  </div>`;
}

function renderPagination(){
  const pg=document.getElementById('pgn'), cur=S.page, tot=S.totalPages;
  if(tot<=1){ pg.innerHTML=''; return; }
  let pages=[1];
  
  // 当前页前后各展示 2 页
  if(cur>4) pages.push('…');
  for(let i=Math.max(2,cur-2);i<=Math.min(tot-1,cur+2);i++) pages.push(i);
  if(cur<tot-3) pages.push('…');
  if(tot>1) pages.push(tot);
  
  pg.innerHTML=`
    <button class="pbtn" onclick="goPage(${cur-1})" ${cur===1?'disabled':''}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>${t('prevPage')}</button>
    ${pages.map(p=>p==='…'
      // 省略号点击跳转页码
      ?`<button class="pbtn" onclick="promptPageJump()" title="${t('jumpPageTitleAttr')}">…</button>`
      :`<button class="pbtn ${p===cur?'cur':''}" onclick="goPage(${p})">${p}</button>`
    ).join('')}
    <button class="pbtn" onclick="goPage(${cur+1})" ${cur===tot?'disabled':''}>${t('nextPage')}<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button>`;
}

function goPage(p){ if(p<1||p>S.totalPages||p===S.page) return; S.page=p; window.scrollTo({top:0,behavior:'smooth'}); load(); }

// 手动输入页码跳转功能
function promptPageJump(){
  const ov = document.getElementById('jumpModalOv');
  const input = document.getElementById('jumpPageInput');
  const hint = document.getElementById('jumpPageHint');
  const title = document.getElementById('jumpModalTitle');
  const cancelBtn = document.getElementById('jumpCancelBtn');
  const submitBtn = document.getElementById('jumpSubmitBtn');
  
  if(ov && input && hint){
    // 支持中英文切换显示
    title.textContent = currentLang === 'en' ? 'Jump to Page' : '跳转页码';
    cancelBtn.textContent = currentLang === 'en' ? 'Cancel' : '取消';
    submitBtn.textContent = currentLang === 'en' ? 'Go' : '跳转';
    hint.textContent = currentLang === 'en' ? `Enter page (1 - ${S.totalPages})` : `请输入页码 (1 - ${S.totalPages})`;
    
    input.max = S.totalPages;
    input.value = S.page;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // 延迟聚焦，防止弹窗动画打断输入
    setTimeout(() => { input.focus(); input.select(); }, 100);
    
    // 支持直接按回车键跳转
    input.onkeydown = (e) => {
      if (e.key === 'Enter') submitPageJump();
    };
  }
}

// 关闭弹窗
function closeJumpModal(){
  const ov = document.getElementById('jumpModalOv');
  if(ov) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// 提交跳转
function submitPageJump(){
  const input = document.getElementById('jumpPageInput');
  if(input){
    const p = parseInt(input.value.trim());
    if(!isNaN(p) && p >= 1 && p <= S.totalPages){
      closeJumpModal();
      goPage(p);
    } else {
      toast(currentLang === 'en' ? 'Invalid page number' : '无效的页码', 'warn');
    }
  }
}

function openModal(id){
  const item = S.items.find(w=>w.publishedfileid===id);
  if(!item) return;

  currentModalItem = { id, title: item.title };
  const isVideo = getType(item) === 'Video';

  const thumb = item.preview_url||'';
  document.getElementById('mTitle').textContent = item.title||t('untitled');
  const cid = item.creator || '';
  const authorHtml = cid 
    ? `<span style="cursor:pointer; color:var(--accent); text-decoration:underline;" onclick="searchByCreator('${cid}')" title="${t('searchAuthorTitle')}">${t('authorLoading')} 🔍</span>`
    : `<span>${t('authorLoading')}</span>`;
  document.getElementById('mSub').innerHTML = `<span>🆔 ${id}</span>${authorHtml}`;
  document.getElementById('mImg').src   = thumb||PLACEHOLDER;
  document.getElementById('mImg').style.display = '';
  document.getElementById('mDesc').textContent = item.short_description||t('loadingDesc');
  document.getElementById('mSteam').href = `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
  document.getElementById('mSubBtn').onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); clientDownloadWall(id, item.title); };

  const playBtn = document.getElementById('mPlayBtn');
  const watchLaterBtn = document.getElementById('mWatchLaterBtn');
  const bgDownloadBtn = document.getElementById('mBgDownloadBtn');
  if (playBtn && watchLaterBtn && bgDownloadBtn) {
    if (isVideo) {
      playBtn.style.display = '';
      watchLaterBtn.style.display = '';
      bgDownloadBtn.style.display = 'none';
      playBtn.onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); playVideoNow(id, item.title); };
      watchLaterBtn.onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); closeModal(); backgroundDownloadWall(id, item.title); };
    } else {
      playBtn.style.display = 'none';
      watchLaterBtn.style.display = 'none';
      bgDownloadBtn.style.display = '';
      bgDownloadBtn.onclick = (e)=>{ e.preventDefault(); e.stopPropagation(); closeModal(); backgroundDownloadWall(id, item.title); };
    }
  }

  renderStats({
    subs:  fmtN(item.subscriptions||item.lifetime_subscriptions||0),
    favs:  fmtN(item.favorited||item.lifetime_favorited||0),
    views: fmtN(item.views||0),
    size:  item.file_size ? fmtBytes(parseInt(item.file_size)) : t('loadingData'),
    upd:   item.time_updated ? fmtTime(item.time_updated) : t('loadingData'),
    id,
  });

  const tags=(item.tags||[]).map(t=>t.tag||t).filter(Boolean);
  document.getElementById('mTags').innerHTML = tags.map(t=>`<span class="tag-chip">${esc(t)}</span>`).join('');

  document.getElementById('mCmts').innerHTML=`<div class="cmt-spin"><div class="spinner-sm"></div>${t('loadingCmts')}</div>`;

  document.getElementById('mOv').classList.add('open');
  document.body.style.overflow='hidden';

  fetch(`/api/steam/details?id=${id}`)
    .then(r=>{ if(!r.ok) throw new Error(`${r.status}`); return r.json(); })
    .then(d=>{
      if(d.preview_url) document.getElementById('mImg').src=d.preview_url;
      document.getElementById('mDesc').textContent = d.description || item.short_description || (currentLang === 'en' ? 'No description available' : '暂无详细描述');
      if(d.author || item.author) {
        const finalCid = d.creator || item.creator || '';
        const finalAuthor = esc(d.author || item.author || t('unknown'));
        const aHtml = finalCid 
          ? `<span style="cursor:pointer; color:var(--accent); text-decoration:underline;" onclick="searchByCreator('${finalCid}')" title="${t('searchAuthorTitle')}">${currentLang === 'en' ? 'Author' : '作者'}: ${finalAuthor} 🔍</span>`
          : `<span>${currentLang === 'en' ? 'Author' : '作者'}: ${finalAuthor}</span>`;
        document.getElementById('mSub').innerHTML=`<span>🆔 ${id}</span>${aHtml}`;
      }
      if(d.tags && d.tags.length) document.getElementById('mTags').innerHTML=d.tags.map(t=>`<span class="tag-chip">${esc(t)}</span>`).join('');
      renderStats({
        subs:  d.subscriptions || fmtN(item.subscriptions||0),
        favs:  d.favorited     || fmtN(item.favorited||0),
        views: d.views         || fmtN(item.views||0),
        size:  (d.file_size && d.file_size !== t('unknown')) ? d.file_size : (item.file_size ? fmtBytes(parseInt(item.file_size)) : t('unknown')),
        upd:   (d.time_updated && d.time_updated !== t('unknown')) ? d.time_updated : (item.time_updated ? fmtTime(item.time_updated) : t('unknown')),
        id,
      });
      renderCmts(d.comments||[]);
    })
    .catch(err=>{
      console.warn('[Detail]',err.message);
      document.getElementById('mDesc').textContent = item.short_description || (currentLang === 'en' ? 'No description available' : '暂无详细描述');
      renderStats({
        subs:  fmtN(item.subscriptions||item.lifetime_subscriptions||0),
        favs:  fmtN(item.favorited||item.lifetime_favorited||0),
        views: fmtN(item.views||0),
        size:  item.file_size ? fmtBytes(parseInt(item.file_size)) : t('unknown'),
        upd:   item.time_updated ? fmtTime(item.time_updated) : t('unknown'),
        id,
      });
      renderCmts([]);
    });
}

function renderStats(d){
  document.getElementById('mStats').innerHTML=`
    <div class="msi"><div class="msi-ico">❤️</div><div class="msi-val">${d.subs}</div><div class="msi-lbl">${t('statSubs')}</div></div>
    <div class="msi"><div class="msi-ico">⭐</div><div class="msi-val">${d.favs}</div><div class="msi-lbl">${t('statFavs')}</div></div>
    <div class="msi"><div class="msi-ico">👁️</div><div class="msi-val">${d.views}</div><div class="msi-lbl">${t('statViews')}</div></div>
    <div class="msi"><div class="msi-ico">📦</div><div class="msi-val">${d.size}</div><div class="msi-lbl">${t('statSize')}</div></div>
    <div class="msi"><div class="msi-ico">🕒</div><div class="msi-val" style="font-size:11px">${d.upd}</div><div class="msi-lbl">${t('statUpdated')}</div></div>
    <div class="msi"><div class="msi-ico">🆔</div><div class="msi-val" style="font-size:10px;word-break:break-all">${d.id}</div><div class="msi-lbl">${t('statFileId')}</div></div>`;
}

function renderCmts(list){
  const el=document.getElementById('mCmts');
  if(!list.length){ el.innerHTML=`<div class="cmt-empty">${t('noComments')}</div>`; return; }
  el.innerHTML=list.map(c=>`
    <div class="cmt">
      <div class="cmt-head"><span class="cmt-author">${esc(c.author||t('steamUser'))}</span><span class="cmt-date">${esc(c.date||'')}</span></div>
      <div class="cmt-text">${esc(c.text||'')}</div>
    </div>`).join('');
}

function closeModal(){
  document.getElementById('mOv').classList.remove('open');
  document.body.style.overflow='';
}
function mOvClick(e){ if(e.target===document.getElementById('mOv')) closeModal(); }


let videoWaitTimer = null;

function closeVideoWaitModal(){
  const ov = document.getElementById('videoWaitOv');
  if (ov) ov.remove();
  if (videoWaitTimer) { clearInterval(videoWaitTimer); videoWaitTimer = null; }
  document.body.style.overflow='';
}

async function clientDownloadWall(fid, title){
  const url = `/api/download?id=${encodeURIComponent(fid)}&title=${encodeURIComponent(title||'')}`;
  toast(currentLang === 'en' ? 'Preparing client download...' : '正在准备客户端下载...', 'info');
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.error || `HTTP ${res.status}`);
    }
    const blob = await res.blob();
    const cd = res.headers.get('Content-Disposition') || '';
    const m = cd.match(/filename\*=UTF-8''([^;]+)|filename="?([^"]+)"?/i);
    const fileName = m ? decodeURIComponent(m[1] || m[2] || '') : `${safeDownloadName(title || `Wallpaper ${fid}`)}-${fid}.zip`;
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = fileName || `${fid}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 3000);
    return true;
  } catch (e) {
    toast((currentLang === 'en' ? 'Download failed: ' : '下载失败: ') + e.message, 'warn');
    return false;
  }
}

function safeDownloadName(name){
  return String(name || 'Wallpaper').replace(/[\\/:*?"<>|]+/g, '_').trim() || 'Wallpaper';
}

function backgroundDownloadWall(fid, title){
  fetch(`/api/download/background?id=${encodeURIComponent(fid)}&title=${encodeURIComponent(title||'')}`)
    .then(async r=>{
      const j = await r.json().catch(()=>({}));
      if(!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      toast(j.message || (currentLang === 'en' ? 'Added to background queue' : '已加入后台下载队列'), 'ok');
      fetchQueue();
    })
    .catch(e=>toast((currentLang === 'en' ? 'Background download failed: ' : '后台下载失败: ') + e.message, 'warn'));
}
function openVideoWaitModal(fid){
  closeVideoWaitModal();
  const ov = document.createElement('div');
  ov.id = 'videoWaitOv';
  ov.className = 'settings-modal-ov open';
  ov.innerHTML = '<div class="settings-modal" style="max-width:520px;"><div class="settings-modal-head"><div class="settings-modal-title">'+ esc(t('videoWaitingTitle')) +'</div><button class="xbtn" id="videoWaitCloseBtn">×</button></div><div class="settings-modal-body" style="padding:16px;"><div style="color:var(--text2);margin-bottom:12px;">'+ esc(t('videoWaitingDesc')) +'</div><div style="height:10px;border:1px solid var(--border);background:var(--bg3);border-radius:999px;overflow:hidden;"><div id="videoWaitBar" style="height:100%;width:0;background:linear-gradient(135deg,var(--accent),var(--accent2));transition:width .25s;"></div></div><div id="videoWaitText" style="margin-top:10px;color:var(--text2);font-size:13px;">0%</div><div id="videoWaitSpeed" style="margin-top:6px;color:var(--accent);font-size:13px;font-family:monospace;">↓ 0 B/s</div></div></div>';
  document.body.appendChild(ov);
  document.body.style.overflow='hidden';
  ov.addEventListener('click', (e)=>{ if(e.target===ov) closeVideoWaitModal(); });
  ov.querySelector('#videoWaitCloseBtn').addEventListener('click', closeVideoWaitModal);

  videoWaitTimer = setInterval(async ()=>{
    try {
      const r = await fetch('/api/queue');
      if(!r.ok) return;
      const data = await r.json();
      const list = data.tasks || [];
      const tsk = list.find(x => String(x.id) === String(fid));
      if (!tsk) return;
      const pct = Math.max(0, Math.min(100, Number(tsk.progress || 0)));
      const speed = Math.max(0, Number(tsk.speed || data.rxSpeed || 0));
      const bar = document.getElementById('videoWaitBar');
      const txt = document.getElementById('videoWaitText');
      const speedEl = document.getElementById('videoWaitSpeed');
      if (bar) bar.style.width = pct.toFixed(1) + '%';
      if (txt) txt.textContent = pct.toFixed(1) + '% · ' + (tsk.status || 'pending');
      if (speedEl) speedEl.textContent = '↓ ' + formatQueueSpeed(speed);
      if (tsk.status === 'completed') {
        closeVideoWaitModal();
        toast(t('videoOpening'), 'ok');
        openVideoPlayer('/api/video/stream?id=' + encodeURIComponent(fid));
      }
      if (tsk.status === 'error') {
        closeVideoWaitModal();
        toast(t('playFailed', { msg: tsk.errorMsg || 'task error' }), 'warn');
      }
    } catch(_) {}
  }, 1200);
}

async function playVideoNow(fid, title){
  try {
    const res = await fetch('/api/video/play?id=' + encodeURIComponent(fid) + '&title=' + encodeURIComponent(title||''));
    const j = await res.json().catch(()=>({}));
    if(!res.ok) throw new Error(j.error || ('HTTP ' + res.status));
    if(j.status === 'ready') {
      openVideoPlayer(j.streamUrl);
      return;
    }
    toast(t('videoQueuedTip'), 'info');
    openVideoWaitModal(fid);
  } catch(e) {
    toast(t('playFailed', { msg: e.message }), 'warn');
  }
}

function openVideoPlayer(src){
  let ov = document.getElementById('videoPlayOv');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'videoPlayOv';
    ov.className = 'settings-modal-ov open';
    ov.innerHTML = '<div class="settings-modal" style="max-width:980px;"><div class="settings-modal-head"><div class="settings-modal-title">'+esc(t('playVideo'))+'</div><button class="xbtn" id="videoCloseBtn">×</button></div><div class="settings-modal-body" style="padding:12px;"><video id="videoPlayerEl" controls autoplay style="width:100%;max-height:75vh;background:#000;border-radius:8px;"></video></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', (e)=>{ if(e.target===ov){ ov.remove(); document.body.style.overflow=''; } });
    ov.querySelector('#videoCloseBtn').addEventListener('click', ()=>{ ov.remove(); document.body.style.overflow=''; });
  } else {
    ov.classList.add('open');
  }
  const v = document.getElementById('videoPlayerEl');
  v.src = src;
  v.load();
  v.play().catch(()=>{});
  document.body.style.overflow='hidden';
}

function dlWall(fid, title){
  const btn=document.getElementById(`sub-${fid}`);
  if(btn){
    btn.classList.add('dling');
    btn.innerHTML=`<i>⏳</i> 准备下载`;
  }
  clientDownloadWall(fid, title)
    .then(ok=>{
      if (!ok) {
        if(btn){ btn.classList.remove('dling'); btn.innerHTML=`<i>⚠</i> 失败`; }
        return;
      }
      if(btn){
        btn.classList.remove('dling');
        btn.classList.add('done');
        btn.innerHTML=`<i>✓</i> 已推送`;
      }
    })
    .catch(e=>{
      toast(t('downloadFailed', { msg: e.message }), 'warn');
      if(btn){ btn.classList.remove('dling'); btn.innerHTML=`<i>⚠</i> 失败`; }
    });
}

function getType(item){
  const ts=(item.tags||[]).map(t=>(t.tag||t).toLowerCase());
  if(ts.includes('video'))       return 'Video';
  if(ts.includes('scene'))       return 'Scene';
  if(ts.includes('application')) return 'App';
  if(ts.includes('web'))         return 'Web';
  return 'Scene';
}
function toggleDisclaimer(visible){
  const el = document.querySelector('.site-disclaimer');
  if (!el) return;
  el.hidden = !visible;
}
function fmtN(n){ n=parseInt(n)||0; if(n>=1e6) return (n/1e6).toFixed(1)+'M'; if(n>=1e3) return (n/1e3).toFixed(1)+'K'; return n.toString(); }
function fmtBytes(b){ b=parseInt(b)||0; if(!b) return t('unknown'); if(b>=1073741824) return (b/1073741824).toFixed(1)+' GB'; if(b>=1048576) return (b/1048576).toFixed(1)+' MB'; if(b>=1024) return (b/1024).toFixed(1)+' KB'; return b+' B'; }
function fmtTime(ts){ ts=parseInt(ts); if(!ts) return t('unknown'); return new Date(ts*1000).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'zh-CN',{year:'numeric',month:'2-digit',day:'2-digit'}); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function toast(msg,type='info'){
  const wrap=document.getElementById('toasts');
  const el=document.createElement('div');
  el.className=`toast ${type}`;
  el.innerHTML=`<span class="ti">${type==='ok'?'✓':type==='warn'?'⚠':'↗'}</span>${msg}`;
  wrap.appendChild(el);
  setTimeout(()=>el.remove(),2700);
}

// ─────────────────────────────────────────────────────────────────
//  Steam Login Functions
// ─────────────────────────────────────────────────────────────────
let currentModalItem = null;

async function checkSteamLoginStatus(){
  try {
    const res = await fetch('/api/steam/status');
    if(!res.ok) return;
    const data = await res.json();
    updateLoginButton(data.loggedIn, data.username);
  } catch(e) {
    console.warn('[Steam Status]', e.message);
  }
}

function updateLoginButton(loggedIn, username){
  const btn = document.getElementById('settingsLoginBtn');
  const txt = document.getElementById('settingsLoginText');
  if(!btn || !txt) return;
  
  if(loggedIn){
    btn.classList.add('logged-in');
    txt.textContent = t('loggedInSteam', { name: username || t('steamUserFallback') });
    btn.onclick = showLogoutConfirm;
  } else {
    btn.classList.remove('logged-in');
    txt.textContent = t('loginSteam');
    btn.onclick = openLoginModal;
  }
}

function showLogoutConfirm(){
  if(confirm(t('logoutConfirm'))){
    logoutSteam();
  }
}

async function logoutSteam(){
  try {
    const res = await fetch('/api/steam/logout', { method: 'POST' });
    if(!res.ok) throw new Error(t('logoutFailed'));
    const data = await res.json();
    toast(data.message || t('logoutSuccess'), 'ok');
    updateLoginButton(false, null);
  } catch(e) {
    toast(t('logoutFailed') + ': ' + e.message, 'warn');
  }
}

function openLoginModal(){
  document.getElementById('loginModalOv').classList.add('open');
  document.body.style.overflow='hidden';
  document.getElementById('steamUsername').value = '';
  document.getElementById('steamPassword').value = '';
  document.getElementById('steamGuardCode').value = '';
  
  // 隐藏 Steam Guard 输入框
  const guardGroup = document.getElementById('steamGuardGroup');
  if(guardGroup) guardGroup.style.display = 'none';
  
  // 重置按钮文字
  const btn = document.getElementById('loginSubmitBtn');
  if(btn) btn.textContent = t('login');
  
  document.getElementById('steamUsername').focus();
}

function closeLoginModal(){
  document.getElementById('loginModalOv').classList.remove('open');
  document.body.style.overflow='';
}

function loginModalOvClick(e){
  if(e.target === document.getElementById('loginModalOv')) closeLoginModal();
}

async function submitSteamLogin(){
  const username = document.getElementById('steamUsername').value.trim();
  const password = document.getElementById('steamPassword').value.trim();
  const steamGuardCode = document.getElementById('steamGuardCode').value.trim();
  const guardGroup = document.getElementById('steamGuardGroup');
  const isRetry = guardGroup && guardGroup.style.display !== 'none';
  
  if(!username || !password){
    toast(t('loginRequired'), 'warn');
    return;
  }
  
  const btn = document.getElementById('loginSubmitBtn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = isRetry ? t('verifying') : t('loginChecking');
  
  try {
    const res = await fetch('/api/steam/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, steamGuardCode, isRetry })
    });
    
    const data = await res.json();
    
    if(res.status === 202 && data.needsSteamGuard){
      // 需要 Steam Guard 验证码
      toast(t('steamGuardRequired'), 'info');
      if(guardGroup) {
        guardGroup.style.display = '';
        document.getElementById('steamGuardCode').focus();
      }
      btn.disabled = false;
      btn.textContent = t('submitSteamGuard');
      return;
    }
    
    if(!res.ok){
      throw new Error(data.error || t('loginFailed'));
    }
    
    toast(data.message || t('loginSuccess'), 'ok');
    updateLoginButton(true, username);
    closeLoginModal();
  } catch(e) {
    console.error('[Login Error]', e);
    toast(e.message || t('loginFailedCheck'), 'warn');
  } finally {
    if(btn.textContent !== t('submitSteamGuard')) {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  }
}

// --- 下载队列前端逻辑 ---
document.addEventListener('DOMContentLoaded', () => {
  const queueBtn = document.getElementById('queueBtn');
  if (queueBtn) {
    queueBtn.addEventListener('click', () => {
      document.getElementById('queueModalOv').classList.add('open');
      fetchQueue();
    });
  }
  // 每 1.5 秒轮询一次后端队列状态
  setInterval(fetchQueue, 1500);
});

function formatBytesLocal(b) {
  b = parseInt(b) || 0;
  if (!b) return '0 B';
  if (b >= 1073741824) return (b / 1073741824).toFixed(1) + ' GB';
  if (b >= 1048576) return (b / 1048576).toFixed(1) + ' MB';
  if (b >= 1024) return (b / 1024).toFixed(1) + ' KB';
  return b + ' B';
}

function formatQueueSpeed(bps) {
  return formatBytesLocal(bps) + '/s';
}

function queueCardSelector(action, id) {
  const source = action === 'delete_cache' ? 'cache' : 'queue';
  const safeId = window.CSS && CSS.escape ? CSS.escape(String(id)) : String(id).replace(/["\\]/g, '\\$&');
  return `.q-item[data-source="${source}"][data-id="${safeId}"]`;
}

let lastQueueRenderKey = '';
let lastQueueItemKeys = new Set();

function getQueueItemKey(t) {
  const id = String(t.id || t.cacheKey || '');
  const source = t.source === 'cache' ? 'cache' : 'queue';
  return `${source}:${id}`;
}

function getQueueStructureKey(list) {
  return list.map(t => [
    getQueueItemKey(t),
    t.status || '',
    t.title || t.name || '',
    t.coverUrl || '',
    t.isVideo ? 'v' : '',
    t.canPlay ? 'p' : ''
  ].join('|')).join('||');
}

function renderQueueEmpty(container) {
  if (lastQueueRenderKey === 'empty' && container.querySelector('.queue-empty')) return;
  container.innerHTML = `<div class="queue-empty"><div class="queue-empty-icon">📦</div><div class="queue-empty-text">${t('queueEmpty')}</div></div>`;
  lastQueueRenderKey = 'empty';
  lastQueueItemKeys = new Set();
}

function updateQueueCardMetrics(list, data) {
  list.forEach(item => {
    const id = String(item.id || item.cacheKey || '');
    const key = getQueueItemKey(item);
    const safeKey = window.CSS && CSS.escape ? CSS.escape(key) : key.replace(/["\\]/g, '\\$&');
    const card = document.querySelector(`.q-item[data-qkey="${safeKey}"]`);
    if (!card) return;
    const prog = Math.max(0, Math.min(100, Number(item.progress || 0)));
    const total = Number(item.total || item.size || 0);
    const downloaded = Number(item.downloaded || (item.status === 'completed' ? total : 0));
    const sizeStr = total > 0 ? `${formatBytesLocal(downloaded)} / ${formatBytesLocal(total)}` : (downloaded > 0 ? formatBytesLocal(downloaded) : t('queueSizeUnknown'));
    const speedStr = item.status === 'downloading' ? ` · ${formatQueueSpeed(item.speed || data.rxSpeed || 0)}` : '';
    const statusMap = { pending:t('qPending'), downloading:t('qDownloading'), moving:t('qMoving'), paused:t('qPaused'), error:t('qError'), completed:t('qCompleted') };
    const sText = statusMap[item.status] || item.status || '';
    const bar = card.querySelector('.q-bar-fill');
    const sizeEl = card.querySelector('[data-qmetric="size"]');
    const pctEl = card.querySelector('[data-qmetric="progress"]');
    const statusEl = card.querySelector('.q-status');
    const errorEl = card.querySelector('.q-error');
    if (bar) bar.style.width = prog + '%';
    if (sizeEl) sizeEl.textContent = sizeStr + speedStr;
    if (pctEl) pctEl.textContent = prog.toFixed(1) + '%';
    if (statusEl) {
      statusEl.className = `q-status ${item.status || ''}`;
      statusEl.textContent = sText;
    }
    if (errorEl) errorEl.textContent = item.status === 'error' ? (item.errorMsg || '') : '';
    card.dataset.id = esc(id);
  });
}

function openQueueItemDetail(id) {
  const item = (S.items || []).find(w => String(w.publishedfileid) === String(id)) || null;
  if (item) {
    openModal(item.publishedfileid);
    return;
  }
  fetch(`/api/steam/details?id=${encodeURIComponent(id)}`)
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      if (!d) return;
      const fallback = {
        publishedfileid: String(id),
        title: d.title || d.name || String(id),
        preview_url: d.preview_url || '',
        short_description: d.description || '',
        creator: d.creator || '',
        tags: Array.isArray(d.tags) ? d.tags : [],
        file_size: d.file_size || 0,
        time_updated: d.time_updated || 0,
        subscriptions: d.subscriptions || 0,
        favorited: d.favorited || 0,
        views: d.views || 0
      };
      S.items = [fallback].concat(S.items || []);
      openModal(fallback.publishedfileid);
    })
    .catch(() => {});
}

function animateQueueCard(action, id) {
  const el = document.querySelector(queueCardSelector(action, id));
  if (!el) return Promise.resolve();
  const cls = (action === 'delete' || action === 'delete_cache') ? 'q-anim-delete' : '';
  if (!cls) return Promise.resolve();
  el.classList.remove('q-anim-delete');
  void el.offsetWidth;
  el.classList.add(cls);
  return new Promise(resolve => setTimeout(resolve, cls === 'q-anim-delete' ? 220 : 180));
}

function captureQueueItemRects() {
  const rects = new Map();
  document.querySelectorAll('#queueList .q-item[data-qkey]').forEach(el => {
    rects.set(el.dataset.qkey, el.getBoundingClientRect());
  });
  return rects;
}

function animateQueueReorderFrom(oldRects) {
  if (!oldRects || !oldRects.size) return;
  const moved = [];
  document.querySelectorAll('#queueList .q-item[data-qkey]').forEach(el => {
    const oldRect = oldRects.get(el.dataset.qkey);
    if (!oldRect) return;
    const newRect = el.getBoundingClientRect();
    const dx = oldRect.left - newRect.left;
    const dy = oldRect.top - newRect.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el.style.transition = 'none';
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    moved.push(el);
  });
  if (!moved.length) return;
  requestAnimationFrame(() => {
    moved.forEach(el => {
      el.style.transition = 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 220ms ease, box-shadow 220ms ease';
      el.style.transform = '';
      el.classList.add('q-anim-reorder');
    });
    setTimeout(() => {
      moved.forEach(el => {
        el.style.transition = '';
        el.classList.remove('q-anim-reorder');
      });
    }, 240);
  });
}

async function fetchQueue() {
  try {
    const res = await fetch('/api/queue');
    if (!res.ok) return;
    
    // 解析新的 JSON 结构
    const data = await res.json();
    const list = data.tasks || [];
    
    // 渲染铃铛右上角的数字
    const activeCount = list.filter(t => t.status === 'pending' || t.status === 'downloading' || t.status === 'moving').length;
    const badge = document.getElementById('queueBadge');
    if (badge) {
      if (activeCount > 0) { badge.style.display = 'block'; badge.textContent = activeCount; } 
      else { badge.style.display = 'none'; }
    }

    const queueModal = document.getElementById('queueModalOv');
    if (!queueModal || !queueModal.classList.contains('open')) return;

    const container = document.getElementById('queueList');
    if (!container) return;
    if (!list.length) {
      renderQueueEmpty(container);
      return;
    }

    const structureKey = getQueueStructureKey(list);
    if (structureKey === lastQueueRenderKey) {
      updateQueueCardMetrics(list, data);
      return;
    }
    const previousKeys = lastQueueItemKeys;
    const currentKeys = new Set(list.map(getQueueItemKey));
    lastQueueRenderKey = structureKey;
    lastQueueItemKeys = currentKeys;

// 渲染包含进度、大小、速度、播放/删除操作的统一队列列表
    container.innerHTML = list.map(item => {
      const id = String(item.id || item.cacheKey || '');
      const key = getQueueItemKey(item);
      const isNewItem = !previousKeys.has(key);
      const prog = Math.max(0, Math.min(100, Number(item.progress || 0)));
      const progStr = prog.toFixed(1) + '%';
      const statusMap = { pending:t('qPending'), downloading:t('qDownloading'), moving:t('qMoving'), paused:t('qPaused'), error:t('qError'), completed:t('qCompleted') };
      const sText = statusMap[item.status] || item.status;
      const isCache = item.source === 'cache';
      const title = item.title || item.name || id;
      const total = Number(item.total || item.size || 0);
      const downloaded = Number(item.downloaded || (item.status === 'completed' ? total : 0));
      const sizeStr = total > 0 ? `${formatBytesLocal(downloaded)} / ${formatBytesLocal(total)}` : (downloaded > 0 ? formatBytesLocal(downloaded) : t('queueSizeUnknown'));
      const speedStr = item.status === 'downloading' ? ` · ${formatQueueSpeed(item.speed || data.rxSpeed || 0)}` : '';
      const cover = item.coverUrl ? `<img class="queue-cover" src="${esc(item.coverUrl)}" alt="cover">` : `<div class="queue-cover queue-cover-placeholder">${t('queueNoCover')}</div>`;
      
      const playBtn = item.status === 'completed' && (item.isVideo || item.canPlay)
        ? `<button class="q-btn" onclick="event.stopPropagation(); ${isCache ? `playCachedItem('${esc(item.cacheKey || id)}','${esc(title)}')` : `playVideoNow(${Number(id)}, '${esc(title)}')`}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ${t('queuePlay')}
           </button>`
        : '';
        
      const downloadBtn = item.status === 'completed'
        ? `<button class="q-btn q-download" onclick="event.stopPropagation(); clientDownloadWall(${Number(id)}, '${esc(title)}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            ${t('queueDownload')}
           </button>`
        : '';
        
      const deleteAction = isCache ? 'delete_cache' : 'delete';
      const deleteArg = isCache ? `'${esc(item.cacheKey || id)}'` : Number(id);
      const priorityControl = !isCache && item.status !== 'completed'
        ? `<div class="q-priority-group" role="group" aria-label="${t('queuePriority')}">
             <button class="q-priority-half" onclick="event.stopPropagation(); qAction('up', ${Number(id)})" title="${t('queueMoveUp')}" aria-label="${t('queueMoveUp')}"><span class="q-priority-icon q-up" aria-hidden="true"></span></button>
             <button class="q-priority-half" onclick="event.stopPropagation(); qAction('down', ${Number(id)})" title="${t('queueMoveDown')}" aria-label="${t('queueMoveDown')}"><span class="q-priority-icon q-down" aria-hidden="true"></span></button>
           </div>`
        : '';
      
      return `
      <div class="q-item ${isNewItem ? 'q-anim-enter' : ''}" data-qkey="${esc(key)}" data-source="${isCache ? 'cache' : 'queue'}" data-id="${esc(isCache ? (item.cacheKey || id) : id)}" onclick="${isCache ? `openQueueItemDetail('${esc(item.cacheKey || id)}')` : `openQueueItemDetail('${esc(id)}')`}">
        <div class="q-head">
          <div class="queue-head">${cover}</div>
          <div class="q-content">
            <div class="q-topline">
              <div class="q-title-wrap ${item.status === 'error' ? 'has-error' : ''}">
                <span class="q-title" title="${esc(title)}">${esc(title)}</span>
                ${item.status === 'error' ? `<div class="q-error">${esc(item.errorMsg)}</div>` : ''}
              </div>
              <span class="q-status ${item.status}">${sText}</span>
            </div>
            <div class="q-bar-bg"><div class="q-bar-fill" style="width: ${prog}%"></div></div>
            <div class="q-info">
              <span data-qmetric="size">${sizeStr}${speedStr}</span>
              <span data-qmetric="progress">${progStr}</span>
            </div>
            <div class="q-actions">
              ${playBtn}
              ${downloadBtn}
              ${(!isCache && (item.status === 'downloading' || item.status === 'pending')) ? `<button class="q-btn" onclick="event.stopPropagation(); qAction('pause', ${Number(id)})"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>${t('queuePause')}</button>` : ''}
              ${(!isCache && (item.status === 'paused' || item.status === 'error')) ? `<button class="q-btn" onclick="event.stopPropagation(); qAction('resume', ${Number(id)})"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>${t('queueResume')}</button>` : ''}
              ${priorityControl}
              <button class="q-btn danger" onclick="event.stopPropagation(); qAction('${deleteAction}', ${deleteArg})">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                ${t('queueDelete')}
              </button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  } catch (e) {
    console.warn('Queue refresh failed:', e);
  }
}

async function qAction(action, id) {
  try {
    const reorderRects = (action === 'up' || action === 'down') ? captureQueueItemRects() : null;
    const shouldAnimateFirst = ['delete', 'delete_cache'].includes(action);
    if (shouldAnimateFirst) await animateQueueCard(action, id);
    const res = await fetch('/api/queue/action', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ action, id })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || ('HTTP ' + res.status));
    if (action === 'delete' || action === 'delete_cache') {
      toast(currentLang === 'en' ? 'Deleted' : '已删除', 'ok');
    }
    if (reorderRects) {
      lastQueueRenderKey = '';
      await fetchQueue();
      animateQueueReorderFrom(reorderRects);
    } else {
      fetchQueue(); // 操作后立刻刷新UI
    }
  } catch (e) {
    console.error('Queue action failed:', e);
    toast((currentLang === 'en' ? 'Action failed: ' : '操作失败: ') + e.message, 'warn');
  }
}

function playCachedItem(key, name) {
  openCachePlayer('/api/cache/video/stream?key=' + encodeURIComponent(key), name);
}

function openCachePlayer(src, title) {
  let ov = document.getElementById('queueVideoOv');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'queueVideoOv';
    ov.className = 'settings-modal-ov open';
    ov.innerHTML = '<div class="settings-modal" style="max-width:980px;"><div class="settings-modal-head"><div class="settings-modal-title">' + esc(title || (currentLang === 'en' ? 'Cached Video' : '缓存视频')) + '</div><button class="xbtn" id="queueVideoCloseBtn">×</button></div><div class="settings-modal-body" style="padding:12px;"><video id="queueVideoPlayerEl" controls autoplay style="width:100%;max-height:75vh;background:#000;border-radius:8px;"></video></div></div>';
    document.body.appendChild(ov);
    ov.addEventListener('click', (e) => { if (e.target === ov) { ov.remove(); document.body.style.overflow = ''; } });
    ov.querySelector('#queueVideoCloseBtn').addEventListener('click', () => { ov.remove(); document.body.style.overflow = ''; });
  }
  const v = document.getElementById('queueVideoPlayerEl');
  v.src = src;
  v.load();
  v.play().catch(() => {});
  document.body.style.overflow = 'hidden';
}






