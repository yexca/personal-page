const fallbackConfig = {
  site: { title: "yexca" },
  assets: { background: "img/background.jpg", profile: "img/profile.png" },
  defaultDisplaySettings: { backgroundPreset: "soft", textPreset: "white" },
  languages: ["en"],
  blogEndpoints: { en: { blog: "https://blog.yexca.net/en/", feed: "https://blog.yexca.net/en/feed.xml" } },
  githubRepos: [],
  githubPullRequests: [],
  githubIgnoredCommitAuthors: ["github-actions[bot]", "github-actions"],
  githubIgnoredCommitMessagePrefixes: ["deploy:"],
  links: [],
  nowItems: [],
  projects: [],
  interests: [],
  translations: {
    en: {
      languageLabel: "Language",
      settingsOpen: "Open display settings",
      settingsClose: "Close display settings",
      updated: "Updated",
      commit: "Commit",
      pullRequest: "PR",
    },
  },
};

let config = fallbackConfig;
let currentLanguage = "en";
let cachedPosts = [];
let cachedRepos = [];
let loadedPostLanguage = "";

async function loadConfig() {
  try {
    const response = await fetch("site.config.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Config unavailable");
    config = await response.json();
  } catch {
    config = fallbackConfig;
  }
}

function supportedLanguages() {
  return config.languages ?? Object.keys(config.translations);
}

function detectLanguage() {
  const supported = supportedLanguages();
  const saved = localStorage.getItem("language");
  if (supported.includes(saved)) return saved;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of browserLanguages) {
    if (!language) continue;
    const normalized = language.toLowerCase();
    if ((normalized === "zh-cn" || normalized === "zh-hans") && supported.includes("zh-CN")) return "zh-CN";
    if ((normalized === "zh-tw" || normalized === "zh-hant" || normalized === "zh-hk") && supported.includes("zh-TW")) return "zh-TW";
    if (normalized.startsWith("ja") && supported.includes("ja")) return "ja";
    if (normalized.startsWith("en") && supported.includes("en")) return "en";
  }

  return supported.includes("en") ? "en" : supported[0];
}

function t(key) {
  return config.translations?.[currentLanguage]?.[key] ?? config.translations?.en?.[key] ?? key;
}

function localizeTitle(value) {
  return value.replace(/(yexca(?:\s*です)?[.。]?)/, "<span>$1</span>");
}

function applyStaticConfig() {
  document.title = config.site?.title ?? "yexca";
  const description = document.querySelector('meta[name="description"]');
  if (description && config.site?.description) description.content = config.site.description;

  document.querySelectorAll("[data-profile-src]").forEach((node) => {
    node.src = config.assets?.profile ?? "img/profile.png";
  });
  document.querySelectorAll("[data-profile-href]").forEach((node) => {
    node.href = config.assets?.profile ?? "img/profile.png";
  });
  document.querySelectorAll("[data-background-href]").forEach((node) => {
    node.href = config.assets?.background ?? "img/background.jpg";
  });
  document.documentElement.style.setProperty("--background-image", `url("${config.assets?.background ?? "img/background.jpg"}")`);

  renderProjects();
  renderLinks();
  renderVrLinks();
  renderNowItems();
  renderInterests();
  renderFooterCredit();
}

function renderProjects() {
  const list = document.getElementById("projectList");
  if (!list) return;

  list.replaceChildren(
    ...(config.projects ?? []).map((project) => {
      const link = document.createElement("a");
      const content = document.createElement("span");
      const head = document.createElement("span");
      const title = document.createElement("span");
      const meta = document.createElement("small");
      const status = document.createElement("span");

      link.className = "project-item";
      content.className = "project-content";
      head.className = "project-title-row";
      if (project.disabled) {
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.tabIndex = -1;
      } else {
        link.href = project.href;
      }
      title.dataset.i18n = project.titleKey;
      meta.dataset.i18n = project.metaKey;
      status.className = "project-status";
      status.dataset.i18n = project.statusKey ?? "projectStatusRecent";

      head.append(title, status);
      content.append(head, meta);
      link.append(content);
      return link;
    }),
  );
}

function localizedHref(item) {
  if (!item.hrefs) return item.href;
  return item.hrefs[currentLanguage] ?? item.hrefs.en ?? Object.values(item.hrefs)[0];
}

function renderVrLinks() {
  const wrapper = document.getElementById("vrLinks");
  if (!wrapper) return;

  wrapper.replaceChildren(
    ...(config.vrLinks ?? []).map((item, index) => {
      const link = document.createElement("a");
      link.className = "button compact";
      link.href = localizedHref(item);
      link.dataset.i18n = item.labelKey;
      if (item.hrefs) link.dataset.vrLinkIndex = String(index);
      return link;
    }),
  );
}

function renderInterests() {
  renderCategoryList("interestList", config.interests ?? []);
}

function renderNowItems() {
  renderCategoryList("nowList", config.nowItems ?? []);
}

function renderCategoryList(id, groups) {
  const list = document.getElementById(id);
  if (!list) return;

  list.replaceChildren(
    ...groups.map((group) => {
      const section = document.createElement("div");
      const label = document.createElement("span");
      const tags = document.createElement("ul");

      section.className = "category-group";
      label.className = "category-label";
      label.dataset.i18n = group.labelKey;
      tags.className = "tag-list";

      tags.replaceChildren(
        ...(group.items ?? []).map((key) => {
          const item = document.createElement("li");
          item.dataset.i18n = key;
          return item;
        }),
      );

      section.append(label, tags);
      return section;
    }),
  );
}

function renderLinks() {
  const nav = document.getElementById("linkGrid");
  if (!nav) return;

  nav.replaceChildren(
    ...(config.links ?? []).map((item) => {
      const link = document.createElement("a");
      const icon = document.createElement("span");
      const label = document.createElement("span");

      icon.className = "link-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.innerHTML = linkIconSvg(item.icon ?? item.label);
      label.textContent = item.label;
      if (item.hrefKey === "blog") {
        link.dataset.blogLink = "";
        link.href = currentBlogEndpoint().blog;
      } else {
        link.href = item.href;
      }
      link.append(icon, label);
      return link;
    }),
  );
}

function linkIconSvg(name) {
  const key = name.toLowerCase();
  const icons = {
    email: '<svg viewBox="0 0 24 24" focusable="false"><path d="M4.5 6.5h15v11h-15z"/><path d="m5 7 7 6 7-6"/></svg>',
    bilibili: '<svg viewBox="0 0 24 24" focusable="false"><path d="M7 5 4.5 2.5"/><path d="M17 5l2.5-2.5"/><rect x="4" y="6" width="16" height="13" rx="3"/><path d="M9 11v3"/><path d="M15 11v3"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" focusable="false"><path d="M21 12s0-4-1-5c-.7-.7-1.5-.8-2.5-.9C16 6 12 6 12 6s-4 0-5.5.1C5.5 6.2 4.7 6.3 4 7c-1 1-1 5-1 5s0 4 1 5c.7.7 1.5.8 2.5.9C8 18 12 18 12 18s4 0 5.5-.1c1-.1 1.8-.2 2.5-.9 1-1 1-5 1-5Z"/><path d="m10 9 5 3-5 3Z"/></svg>',
    link: '<svg viewBox="0 0 24 24" focusable="false"><path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7l-1.3 1.3"/><path d="M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 0 0 5.7 5.7l1.3-1.3"/></svg>',
  };

  if (key.includes("mail")) return icons.email;
  if (key.includes("bilibili")) return icons.bilibili;
  if (key.includes("youtube")) return icons.youtube;
  return icons.link;
}

function renderFooterCredit() {
  const credit = document.getElementById("footerCredit");
  if (!credit || !config.footerCredit) return;
  const link = document.createElement("a");
  link.href = config.footerCredit.href;
  link.textContent = config.footerCredit.label;

  credit.replaceChildren(`${config.footerCredit.prefix} `, link, config.footerCredit.suffix ?? "");
}

function applyLanguage(language) {
  const supported = supportedLanguages();
  currentLanguage = supported.includes(language) ? language : (supported.includes("en") ? "en" : supported[0]);
  localStorage.setItem("language", currentLanguage);
  document.documentElement.lang = currentLanguage.toLowerCase();

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t(node.dataset.i18n);
    if (node.matches("h1")) {
      node.innerHTML = localizeTitle(value);
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

function loadDisplaySettings() {
  try {
    return {
      ...config.defaultDisplaySettings,
      ...JSON.parse(localStorage.getItem("displaySettings")),
    };
  } catch {
    return { ...config.defaultDisplaySettings };
  }
}

function saveDisplaySettings(settings) {
  localStorage.setItem("displaySettings", JSON.stringify(settings));
}

function applyDisplaySettings(settings) {
  const backgroundPreset = ["soft", "heavy", "frosted", "mdui"].includes(settings.backgroundPreset)
    ? settings.backgroundPreset
    : config.defaultDisplaySettings.backgroundPreset;
  const textPreset = ["white", "pink", "black"].includes(settings.textPreset)
    ? settings.textPreset
    : config.defaultDisplaySettings.textPreset;

  document.documentElement.dataset.bgPreset = backgroundPreset;
  document.documentElement.dataset.textPreset = textPreset;

  document.querySelectorAll("[data-background-preset]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.backgroundPreset === backgroundPreset));
  });
  document.querySelectorAll("[data-text-preset]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.textPreset === textPreset));
  });
}

function setupDisplaySettings() {
  const settingsButton = document.getElementById("settingsButton");
  const settingsPanel = document.getElementById("settingsPanel");
  const resetButton = document.getElementById("settingsReset");
  let settings = loadDisplaySettings();

  applyDisplaySettings(settings);

  settingsButton.addEventListener("click", () => {
    const isOpening = settingsPanel.hidden;
    settingsPanel.hidden = !isOpening;
    settingsButton.setAttribute("aria-expanded", String(isOpening));
    settingsButton.dataset.i18nAria = isOpening ? "settingsClose" : "settingsOpen";
    settingsButton.setAttribute("aria-label", t(settingsButton.dataset.i18nAria));
  });

  document.querySelectorAll("[data-background-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      settings = { ...settings, backgroundPreset: button.dataset.backgroundPreset };
      applyDisplaySettings(settings);
      saveDisplaySettings(settings);
    });
  });

  document.querySelectorAll("[data-text-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      settings = { ...settings, textPreset: button.dataset.textPreset };
      applyDisplaySettings(settings);
      saveDisplaySettings(settings);
    });
  });

  resetButton.addEventListener("click", () => {
    settings = { ...config.defaultDisplaySettings };
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
  return config.blogEndpoints?.[currentLanguage] ?? config.blogEndpoints?.en;
}

function updateLocalizedLinks() {
  const endpoint = currentBlogEndpoint();
  document.querySelectorAll("[data-blog-link]").forEach((link) => {
    link.href = endpoint.blog;
  });
  document.querySelectorAll("[data-rss-link]").forEach((link) => {
    link.href = endpoint.feed;
  });
  document.querySelectorAll("[data-vr-link-index]").forEach((link) => {
    const item = config.vrLinks?.[Number(link.dataset.vrLinkIndex)];
    if (item) link.href = localizedHref(item);
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
      href: item.querySelector("link")?.textContent?.trim() || currentBlogEndpoint().blog,
      date: item.querySelector("pubDate")?.textContent || "",
    }));
    loadedPostLanguage = currentLanguage;
    renderPosts();
  } catch {
    posts.dataset.state = "fallback";
  }
}

async function fetchGithubJson(url) {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new Error("GitHub unavailable");
  return response.json();
}

function shortCommitMessage(message) {
  return message?.split("\n")[0]?.trim() || t("commit");
}

function ignoredCommitAuthors() {
  return new Set(
    (config.githubIgnoredCommitAuthors ?? [])
      .map((author) => author.toLowerCase())
      .concat(["bot", "github-actions[bot]", "github-actions"]),
  );
}

function isBotCommit(commit) {
  const ignored = ignoredCommitAuthors();
  const ignoredPrefixes = config.githubIgnoredCommitMessagePrefixes ?? [];
  const message = commit.commit?.message?.trim().toLowerCase() ?? "";
  const values = [
    commit.author?.login,
    commit.author?.type,
    commit.committer?.login,
    commit.committer?.type,
    commit.commit?.author?.name,
    commit.commit?.author?.email,
    commit.commit?.committer?.name,
    commit.commit?.committer?.email,
  ]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  return (
    values.some((value) => value.includes("[bot]") || ignored.has(value) || value.includes("github-actions")) ||
    ignoredPrefixes.some((prefix) => message.startsWith(prefix.toLowerCase()))
  );
}

async function loadDisplayCommit(repo) {
  try {
    const commits = await fetchGithubJson(`https://api.github.com/repos/${repo.full_name}/commits?per_page=20`);
    const commit = commits[0];
    if (!commit || isBotCommit(commit)) return null;
    return {
      message: shortCommitMessage(commit.commit?.message),
      href: commit.html_url,
    };
  } catch {
    return null;
  }
}

function githubRepoNameFromApiUrl(url) {
  return url?.replace("https://api.github.com/repos/", "").split("/").slice(-1)[0] ?? "";
}

async function loadRepositoryActivities() {
  const repoResults = await Promise.allSettled((config.githubRepos ?? []).map(fetchGithubJson));
  const candidateRepos = repoResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .flat()
    .filter((repo) => !repo.fork)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const activities = [];
  for (const repo of candidateRepos) {
    const commit = await loadDisplayCommit(repo);
    if (!commit) continue;
    activities.push({
      name: repo.name,
      href: repo.html_url,
      date: repo.updated_at,
      detail: {
        labelKey: "commit",
        message: commit.message,
      },
    });
  }

  return activities;
}

async function loadPullRequestActivities() {
  const pullRequestResults = await Promise.allSettled((config.githubPullRequests ?? []).map(fetchGithubJson));
  return pullRequestResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.items ?? result.value)
    .flat()
    .filter((item) => item.pull_request)
    .map((item) => ({
      name: githubRepoNameFromApiUrl(item.repository_url) || t("pullRequest"),
      href: item.html_url,
      date: item.updated_at,
      detail: {
        labelKey: "pullRequest",
        message: item.title,
      },
    }));
}

async function loadRepos() {
  const repos = document.getElementById("repos");
  try {
    const [repoActivities, pullRequestActivities] = await Promise.all([
      loadRepositoryActivities(),
      loadPullRequestActivities(),
    ]);

    cachedRepos = [...repoActivities, ...pullRequestActivities]
      .filter((activity) => activity.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (!cachedRepos.length) throw new Error("No GitHub activity");

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
      const commit = document.createElement("small");

      link.className = "repo-pill";
      link.href = repo.href;
      name.textContent = repo.name;
      meta.textContent = `${t("updated")} ${formatDate(repo.date)}`;
      commit.textContent = repo.detail ? `${t(repo.detail.labelKey)}: ${repo.detail.message}` : "";

      link.append(name, meta);
      if (commit.textContent) link.append(commit);
      return link;
    }),
  );
}

function renderCachedDynamicContent() {
  renderPosts();
  renderRepos();
}

function setupLanguageSelect() {
  const select = document.getElementById("languageSelect");
  select.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
    if (loadedPostLanguage !== currentLanguage) {
      loadPosts();
    }
  });
}

function updateTopbarGlass() {
  document.getElementById("topbar").classList.toggle("is-glass", window.scrollY > 28);
}

async function init() {
  await loadConfig();
  applyStaticConfig();
  currentLanguage = detectLanguage();
  applyLanguage(currentLanguage);
  setupLanguageSelect();
  setupDisplaySettings();
  loadPosts();
  loadRepos();
  window.addEventListener("scroll", updateTopbarGlass, { passive: true });
  updateTopbarGlass();
}

init();
