# Development Documentation

## Overview

This project is a pure static personal homepage. It is designed to be fast, easy to deploy, and easy to edit without a framework or build pipeline.

The page is composed of:

- `index.html` for semantic page structure
- `style.css` for visual design and responsive layout
- `script.js` for config loading, language switching, external content loading, and display settings
- `site.config.json` for editable site content and external links
- `img/` for local image assets

## Design Direction

The visual style is a light glass-card interface over a visible background image.

Key ideas:

- The background image remains readable and is not blurred by default.
- Cards use semi-transparent surfaces with a small amount of blur.
- The top navigation gains a glass backing only after the page scrolls.
- The layout uses asymmetric card sizes while still following a stable grid.
- Mobile layout becomes a single-column card flow.

## Assets

Required assets:

- `img/background.jpg`: background image
- `img/profile.png`: avatar, brand image, and favicon

The background source is credited in the footer:

https://www.pixiv.net/artworks/76371065

## Internationalization

Translations live in the `translations` object in `site.config.json`.

Supported language keys:

- `en`
- `zh-CN`
- `zh-TW`
- `ja`

Language selection flow:

1. Use the saved `localStorage.language` value if present.
2. Detect `navigator.languages`.
3. Match Simplified Chinese, Traditional Chinese, Japanese, or English.
4. Fall back to English.

When adding text to `index.html`, use `data-i18n="key"` and add the same key to every language block in `site.config.json`.

For accessible labels, use `data-i18n-aria="key"`.

## Blog RSS

Blog endpoints are language-specific and stored in `blogEndpoints` in `site.config.json`.

Current mapping:

- Simplified Chinese: `https://blog.yexca.net/feed.xml`
- Traditional Chinese: `https://blog.yexca.net/zh-tw/feed.xml`
- English: `https://blog.yexca.net/en/feed.xml`
- Japanese: `https://blog.yexca.net/ja/feed.xml`

The page loads the latest three entries for the current language. When the language changes, the RSS feed is reloaded if needed.

## GitHub Activity

Recent GitHub repositories, commits, and pull requests are loaded from the public GitHub API:

- `yexca`
- `yexca-VRChat`

The page loads recently updated repositories from `githubRepos`. Forked repositories are ignored, and each candidate repository is checked by its latest commit. If that commit looks bot-generated or matches a generated deployment prefix, the repository is skipped and the next most recently updated repository is checked. Pull request activity is loaded from `githubPullRequests`. Repository and pull request activity is merged by update time, and the page shows the first three items.

If GitHub loading fails, the static selected project cards still remain visible.

## Editable Content

Most page content is configured in `site.config.json`.

Common edits:

- Update selected project cards in `projects`.
- Update VRChat buttons in `vrLinks`. A button can use a single `href` or language-specific `hrefs`.
- Update interest chips in `interests`.
- Update footer credit in `footerCredit`.
- Update external links in `links`.
- Update translations in `translations`.
- Update RSS endpoints in `blogEndpoints`.
- Update GitHub repository activity sources in `githubRepos`.
- Update GitHub pull request activity sources in `githubPullRequests`.
- Update ignored commit authors in `githubIgnoredCommitAuthors`.
- Update ignored generated commit message prefixes in `githubIgnoredCommitMessagePrefixes`.
- Update NOW categories in `nowItems`.
- Update the NOW card timestamp with the `nowUpdated` translation key in every language block.
- Update default visual presets in `defaultDisplaySettings`.

The NOW card uses a lightweight animated status dot and ends with a localized "Last updated" line. Keep this timestamp short so it stays unobtrusive at the bottom of the card.

The graduation design project currently points to:

`https://github.com/yexca/data-element-docker`

Project cards can be marked as disabled with `"disabled": true`; this is used for the current Coming soon card.

## Display Settings

The settings panel controls preset display choices:

- Background style: soft, heavy blur, frosted, MDUI
- Text color: white, pink, black

Settings are saved to `localStorage.displaySettings`.

The active presets are applied as attributes on the root element:

- `data-bg-preset`
- `data-text-preset`

CSS custom properties are then resolved from those preset attributes. The reset button restores the defaults defined in `defaultDisplaySettings`.

The presets intentionally replace free-form sliders to avoid unreadable visual combinations. When adding a new visual theme, prefer adding a new `data-bg-preset` or `data-text-preset` branch in CSS instead of exposing more raw controls.

## Deployment

This site can be deployed as static files.

Upload these files and folders to a static host:

- `index.html`
- `style.css`
- `script.js`
- `site.config.json`
- `img/`

The `documents/` folder is for repository documentation and does not need to be deployed.

## Local Checks

Recommended manual checks before publishing:

- Open `http://localhost:4173/`.
- Switch all four languages.
- Open the display settings panel and test all preset choices.
- Confirm RSS posts load for each language.
- Confirm GitHub activity appears.
- Check desktop and mobile widths.
- Confirm the footer credit is visible but unobtrusive.
