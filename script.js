const BLOG_ENDPOINTS = {
  en: {
    blog: "https://blog.yexca.net/en/",
    feed: "https://blog.yexca.net/en/feed.xml",
  },
  "zh-CN": {
    blog: "https://blog.yexca.net/",
    feed: "https://blog.yexca.net/feed.xml",
  },
  "zh-TW": {
    blog: "https://blog.yexca.net/zh-tw/",
    feed: "https://blog.yexca.net/zh-tw/feed.xml",
  },
  ja: {
    blog: "https://blog.yexca.net/ja/",
    feed: "https://blog.yexca.net/ja/feed.xml",
  },
};
const GITHUB_REPOS = [
  "https://api.github.com/users/yexca/repos?sort=updated&per_page=6",
  "https://api.github.com/users/yexca-VRChat/repos?sort=updated&per_page=4",
];
const defaultDisplaySettings = {
  backgroundBlur: 0,
  tintStrength: 58,
  textColor: "#f4f7f5",
};

const translations = {
  en: {
    languageLabel: "Language",
    heroEyebrow: "personal space",
    heroTitle: "Hi, I'm yexca.",
    heroCopy:
      "I write code, organize knowledge, tinker with systems, and build little bridges between engineering and virtual worlds.",
    visitBlog: "Visit blog",
    github: "GitHub",
    nowEyebrow: "now",
    nowTitle: "Keeping things understandable.",
    nowCopy:
      "Learning computer vision, AI, lightweight deployment, and still tinkering with the blog as a living knowledge base.",
    writingEyebrow: "writing",
    rss: "RSS",
    writingTitle: "Latest notes",
    fallbackPostTitle: "Technical notes and life records",
    fallbackPostDate: "Blog",
    projectsEyebrow: "projects",
    allRepos: "All repos",
    projectsTitle: "Selected work",
    projectBlog: "Blog and publishing system",
    projectBlogMeta: "Hugo, multilingual writing, CI/CD",
    projectPixiv: "PixivDownloader-SQLite",
    projectPixivMeta: "Desktop utility, SQLite, media archiving",
    projectData: "Graduation design system",
    projectDataMeta: "Data element market, full-stack system practice",
    githubActivity: "Recent GitHub activity",
    settingsOpen: "Open display settings",
    settingsClose: "Close display settings",
    settingsTitle: "Display",
    settingsReset: "Reset",
    settingBgBlur: "Background blur",
    settingTint: "Tint strength",
    settingText: "Text color",
    vrEyebrow: "vrchat",
    vrTitle: "Virtual world notes",
    vrCopy:
      "Tutorials and experiments around VRChat, 3D models, Blender, Unity, and the patient work of making a world feel usable.",
    vrLink: "VRChat GitHub",
    interestsEyebrow: "interests",
    interestsTitle: "Things I keep returning to",
    interestBackend: "Backend architecture",
    interestDevops: "DevOps",
    interestLinux: "Linux",
    interestApps: "Cross-platform apps",
    interestWriting: "Writing",
    interestVR: "Virtual creation",
    linksEyebrow: "links",
    quote:
      "There is no such thing as no possible. It is just because of the lack of imagination.",
    updated: "Updated",
  },
  "zh-CN": {
    languageLabel: "语言",
    heroEyebrow: "个人空间",
    heroTitle: "你好，我是 yexca。",
    heroCopy:
      "写代码，整理知识，折腾系统，也在工程与虚拟世界之间搭一些小小的桥。",
    visitBlog: "访问博客",
    github: "GitHub",
    nowEyebrow: "现在",
    nowTitle: "把事情整理到可以理解。",
    nowCopy:
      "正在学习 CV、AI、轻量化部署，也继续折腾博客，让个人知识库保持生长。",
    writingEyebrow: "写作",
    rss: "RSS",
    writingTitle: "最新记录",
    fallbackPostTitle: "技术笔记与生活记录",
    fallbackPostDate: "博客",
    projectsEyebrow: "项目",
    allRepos: "全部仓库",
    projectsTitle: "一些作品",
    projectBlog: "博客与发布系统",
    projectBlogMeta: "Hugo、多语言写作、CI/CD",
    projectPixiv: "PixivDownloader-SQLite",
    projectPixivMeta: "桌面工具、SQLite、媒体归档",
    projectData: "毕业设计系统",
    projectDataMeta: "数据要素市场，全栈系统实践",
    githubActivity: "近期 GitHub 更新",
    settingsOpen: "打开显示设置",
    settingsClose: "关闭显示设置",
    settingsTitle: "显示",
    settingsReset: "重置",
    settingBgBlur: "背景模糊",
    settingTint: "暗色强度",
    settingText: "文字颜色",
    vrEyebrow: "VRChat",
    vrTitle: "虚拟世界相关",
    vrCopy:
      "关于 VRChat、3D 模型、Blender、Unity 的教程和实验，以及让虚拟空间变得可用的耐心工作。",
    vrLink: "VRChat GitHub",
    interestsEyebrow: "兴趣",
    interestsTitle: "总会回到的东西",
    interestBackend: "后端架构",
    interestDevops: "DevOps",
    interestLinux: "Linux",
    interestApps: "跨平台应用",
    interestWriting: "写作",
    interestVR: "虚拟创作",
    linksEyebrow: "链接",
    quote: "世上没有不可能，只是想象力不够。",
    updated: "更新于",
  },
  "zh-TW": {
    languageLabel: "語言",
    heroEyebrow: "個人空間",
    heroTitle: "你好，我是 yexca。",
    heroCopy:
      "寫程式，整理知識，折騰系統，也在工程與虛擬世界之間搭一些小小的橋。",
    visitBlog: "前往部落格",
    github: "GitHub",
    nowEyebrow: "現在",
    nowTitle: "把事情整理到可以理解。",
    nowCopy:
      "正在學習 CV、AI、輕量化部署，也繼續折騰部落格，讓個人知識庫保持生長。",
    writingEyebrow: "寫作",
    rss: "RSS",
    writingTitle: "最新記錄",
    fallbackPostTitle: "技術筆記與生活記錄",
    fallbackPostDate: "部落格",
    projectsEyebrow: "專案",
    allRepos: "全部倉庫",
    projectsTitle: "一些作品",
    projectBlog: "部落格與發布系統",
    projectBlogMeta: "Hugo、多語言寫作、CI/CD",
    projectPixiv: "PixivDownloader-SQLite",
    projectPixivMeta: "桌面工具、SQLite、媒體歸檔",
    projectData: "畢業設計系統",
    projectDataMeta: "數據要素市場，全端系統實踐",
    githubActivity: "近期 GitHub 更新",
    settingsOpen: "開啟顯示設定",
    settingsClose: "關閉顯示設定",
    settingsTitle: "顯示",
    settingsReset: "重設",
    settingBgBlur: "背景模糊",
    settingTint: "暗色強度",
    settingText: "文字顏色",
    vrEyebrow: "VRChat",
    vrTitle: "虛擬世界相關",
    vrCopy:
      "關於 VRChat、3D 模型、Blender、Unity 的教學和實驗，以及讓虛擬空間變得可用的耐心工作。",
    vrLink: "VRChat GitHub",
    interestsEyebrow: "興趣",
    interestsTitle: "總會回到的東西",
    interestBackend: "後端架構",
    interestDevops: "DevOps",
    interestLinux: "Linux",
    interestApps: "跨平台應用",
    interestWriting: "寫作",
    interestVR: "虛擬創作",
    linksEyebrow: "連結",
    quote: "世上沒有不可能，只是想像力不夠。",
    updated: "更新於",
  },
  ja: {
    languageLabel: "言語",
    heroEyebrow: "personal space",
    heroTitle: "こんにちは、yexcaです。",
    heroCopy:
      "コードを書き、知識を整理し、システムを触りながら、エンジニアリングと仮想世界の間に小さな橋を作っています。",
    visitBlog: "ブログへ",
    github: "GitHub",
    nowEyebrow: "now",
    nowTitle: "理解できる形に整える。",
    nowCopy:
      "CV、AI、軽量化デプロイを学びながら、個人の知識ベースとしてブログも引き続き整えています。",
    writingEyebrow: "writing",
    rss: "RSS",
    writingTitle: "最近の記事",
    fallbackPostTitle: "技術ノートと生活の記録",
    fallbackPostDate: "Blog",
    projectsEyebrow: "projects",
    allRepos: "すべてのリポジトリ",
    projectsTitle: "作品",
    projectBlog: "ブログと公開システム",
    projectBlogMeta: "Hugo、多言語記事、CI/CD",
    projectPixiv: "PixivDownloader-SQLite",
    projectPixivMeta: "デスクトップツール、SQLite、メディア整理",
    projectData: "卒業設計システム",
    projectDataMeta: "データ要素市場、フルスタック実践",
    githubActivity: "最近の GitHub 更新",
    settingsOpen: "表示設定を開く",
    settingsClose: "表示設定を閉じる",
    settingsTitle: "表示",
    settingsReset: "リセット",
    settingBgBlur: "背景ぼかし",
    settingTint: "暗さ",
    settingText: "文字色",
    vrEyebrow: "VRChat",
    vrTitle: "仮想世界のノート",
    vrCopy:
      "VRChat、3Dモデル、Blender、Unity に関するチュートリアルと実験、そして使いやすい仮想空間を作るための試行錯誤。",
    vrLink: "VRChat GitHub",
    interestsEyebrow: "interests",
    interestsTitle: "何度も戻ってくるもの",
    interestBackend: "バックエンド設計",
    interestDevops: "DevOps",
    interestLinux: "Linux",
    interestApps: "クロスプラットフォーム",
    interestWriting: "執筆",
    interestVR: "バーチャル制作",
    linksEyebrow: "links",
    quote: "不可能なんてない。足りないのは想像力だけ。",
    updated: "更新",
  },
};

const supportedLanguages = Object.keys(translations);
let currentLanguage = detectLanguage();
let cachedPosts = [];
let cachedRepos = [];
let loadedPostLanguage = "";

function detectLanguage() {
  const saved = localStorage.getItem("language");
  if (supportedLanguages.includes(saved)) return saved;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of browserLanguages) {
    if (!language) continue;
    const normalized = language.toLowerCase();
    if (normalized === "zh-cn" || normalized === "zh-hans") return "zh-CN";
    if (normalized === "zh-tw" || normalized === "zh-hant" || normalized === "zh-hk") return "zh-TW";
    if (normalized.startsWith("ja")) return "ja";
    if (normalized.startsWith("en")) return "en";
  }

  return "en";
}

function t(key) {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
}

function applyLanguage(language) {
  currentLanguage = supportedLanguages.includes(language) ? language : "en";
  localStorage.setItem("language", currentLanguage);
  document.documentElement.lang = currentLanguage.toLowerCase();
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t(node.dataset.i18n);
    if (node.matches("h1")) {
      node.innerHTML = value.replace(/(yexca(?:\s*です)?[.。]?)/, "<span>$1</span>");
      return;
    }
    node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  document.getElementById("languageSelect").value = currentLanguage;
  updateLocalizedLinks();
  renderCachedDynamicContent();
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function loadDisplaySettings() {
  try {
    return {
      ...defaultDisplaySettings,
      ...JSON.parse(localStorage.getItem("displaySettings")),
    };
  } catch {
    return { ...defaultDisplaySettings };
  }
}

function saveDisplaySettings(settings) {
  localStorage.setItem("displaySettings", JSON.stringify(settings));
}

function applyDisplaySettings(settings) {
  const [r, g, b] = hexToRgb(settings.textColor);
  const tint = Number(settings.tintStrength) / 100;
  const blur = Number(settings.backgroundBlur);

  document.documentElement.style.setProperty("--text", settings.textColor);
  document.documentElement.style.setProperty("--text-rgb", `${r}, ${g}, ${b}`);
  document.documentElement.style.setProperty("--background-blur", `${blur}px`);
  document.documentElement.style.setProperty("--background-scale", blur > 0 ? "1.025" : "1");
  document.documentElement.style.setProperty("--tint-alpha", tint.toFixed(2));
  document.documentElement.style.setProperty("--tint-mid-alpha", Math.max(tint - 0.24, 0.12).toFixed(2));
  document.documentElement.style.setProperty("--tint-end-alpha", Math.max(tint - 0.04, 0.16).toFixed(2));

  document.getElementById("backgroundBlur").value = settings.backgroundBlur;
  document.getElementById("tintStrength").value = settings.tintStrength;
  document.getElementById("textColor").value = settings.textColor;
}

function setupDisplaySettings() {
  const settingsButton = document.getElementById("settingsButton");
  const settingsPanel = document.getElementById("settingsPanel");
  const resetButton = document.getElementById("settingsReset");
  const controlIds = ["backgroundBlur", "tintStrength", "textColor"];
  let settings = loadDisplaySettings();

  applyDisplaySettings(settings);

  settingsButton.addEventListener("click", () => {
    const isOpening = settingsPanel.hidden;
    settingsPanel.hidden = !isOpening;
    settingsButton.setAttribute("aria-expanded", String(isOpening));
    settingsButton.dataset.i18nAria = isOpening ? "settingsClose" : "settingsOpen";
    settingsButton.setAttribute("aria-label", t(settingsButton.dataset.i18nAria));
  });

  controlIds.forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      settings = {
        backgroundBlur: Number(document.getElementById("backgroundBlur").value),
        tintStrength: Number(document.getElementById("tintStrength").value),
        textColor: document.getElementById("textColor").value,
      };
      applyDisplaySettings(settings);
      saveDisplaySettings(settings);
    });
  });

  resetButton.addEventListener("click", () => {
    settings = { ...defaultDisplaySettings };
    applyDisplaySettings(settings);
    saveDisplaySettings(settings);
  });

  document.addEventListener("click", (event) => {
    if (settingsPanel.hidden) return;
    if (settingsPanel.contains(event.target) || settingsButton.contains(event.target)) return;
    settingsPanel.hidden = true;
    settingsButton.setAttribute("aria-expanded", "false");
    settingsButton.dataset.i18nAria = "settingsOpen";
    settingsButton.setAttribute("aria-label", t("settingsOpen"));
  });
}

function currentBlogEndpoint() {
  return BLOG_ENDPOINTS[currentLanguage] ?? BLOG_ENDPOINTS.en;
}

function updateLocalizedLinks() {
  const endpoint = currentBlogEndpoint();
  document.querySelectorAll("[data-blog-link]").forEach((link) => {
    link.href = endpoint.blog;
  });
  document.querySelectorAll("[data-rss-link]").forEach((link) => {
    link.href = endpoint.feed;
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(currentLanguage, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

async function loadPosts() {
  const posts = document.getElementById("posts");
  try {
    const response = await fetch(currentBlogEndpoint().feed, { cache: "no-store" });
    if (!response.ok) throw new Error("Feed unavailable");
    const xml = new DOMParser().parseFromString(await response.text(), "text/xml");
    cachedPosts = [...xml.querySelectorAll("item")].slice(0, 3).map((item) => ({
      title: item.querySelector("title")?.textContent?.trim() || t("fallbackPostTitle"),
      href: item.querySelector("link")?.textContent?.trim() || "https://blog.yexca.net/",
      date: item.querySelector("pubDate")?.textContent || "",
    }));
    loadedPostLanguage = currentLanguage;
    renderPosts();
  } catch {
    posts.dataset.state = "fallback";
  }
}

async function loadRepos() {
  const repos = document.getElementById("repos");
  try {
    const responses = await Promise.all(
      GITHUB_REPOS.map((url) => fetch(url, { headers: { Accept: "application/vnd.github+json" } })),
    );
    const payloads = await Promise.all(responses.map((response) => response.json()));
    cachedRepos = payloads
      .flat()
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 3);

    renderRepos();
  } catch {
    repos.remove();
  }
}

function renderPosts() {
  const posts = document.getElementById("posts");
  if (!posts || !cachedPosts.length) return;

  posts.replaceChildren(
    ...cachedPosts.map((post) => {
      const link = document.createElement("a");
      const title = document.createElement("span");
      const time = document.createElement("time");

      link.className = "post-item";
      link.href = post.href;
      title.textContent = post.title;
      time.textContent = formatDate(post.date);

      link.append(title, time);
      return link;
    }),
  );
}

function renderRepos() {
  const repos = document.getElementById("repos");
  if (!repos || !cachedRepos.length) return;

  repos.replaceChildren(
    ...cachedRepos.map((repo) => {
      const link = document.createElement("a");
      const name = document.createElement("strong");
      const meta = document.createElement("span");

      link.className = "repo-pill";
      link.href = repo.html_url;
      name.textContent = repo.name;
      meta.textContent = `${t("updated")} ${formatDate(repo.updated_at)}`;

      link.append(name, meta);
      return link;
    }),
  );
}

function renderCachedDynamicContent() {
  renderPosts();
  renderRepos();
}

document.getElementById("languageSelect").addEventListener("change", (event) => {
  applyLanguage(event.target.value);
  if (loadedPostLanguage !== currentLanguage) {
    loadPosts();
  }
});

applyLanguage(currentLanguage);
setupDisplaySettings();
loadPosts();
loadRepos();

function updateTopbarGlass() {
  document.getElementById("topbar").classList.toggle("is-glass", window.scrollY > 28);
}

window.addEventListener("scroll", updateTopbarGlass, { passive: true });
updateTopbarGlass();
