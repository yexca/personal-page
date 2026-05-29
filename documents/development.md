# Development Documentation

## Overview

This project is a pure static personal homepage. It is designed to be fast, easy to deploy, and easy to edit without a framework or build pipeline.

The page is composed of:

- `index.html` for semantic page structure
- `style.css` for visual design and responsive layout
- `script.js` for language switching, external content loading, and display settings
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

Translations live in the `translations` object in `script.js`.

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

When adding text to `index.html`, use `data-i18n="key"` and add the same key to every language block in `script.js`.

For accessible labels, use `data-i18n-aria="key"`.

## Blog RSS

Blog endpoints are language-specific and stored in `BLOG_ENDPOINTS` in `script.js`.

Current mapping:

- Simplified Chinese: `https://blog.yexca.net/feed.xml`
- Traditional Chinese: `https://blog.yexca.net/zh-tw/feed.xml`
- English: `https://blog.yexca.net/en/feed.xml`
- Japanese: `https://blog.yexca.net/ja/feed.xml`

The page loads the latest three entries for the current language. When the language changes, the RSS feed is reloaded if needed.

## GitHub Activity

Recent GitHub repositories are loaded from the public GitHub API:

- `yexca`
- `yexca-VRChat`

The repositories are merged, forked repositories are ignored, and the most recently updated three are shown.

If GitHub loading fails, the static selected project cards still remain visible.

## Display Settings

The settings panel controls:

- Background blur
- Tint strength
- Text color

Settings are saved to `localStorage.displaySettings`.

CSS custom properties controlled by JavaScript:

- `--text`
- `--text-rgb`
- `--background-blur`
- `--background-scale`
- `--tint-alpha`
- `--tint-mid-alpha`
- `--tint-end-alpha`

The reset button restores the defaults defined in `defaultDisplaySettings`.

## Deployment

This site can be deployed as static files.

Upload these files and folders to a static host:

- `index.html`
- `style.css`
- `script.js`
- `img/`

The `documents/` folder is for repository documentation and does not need to be deployed.

## Local Checks

Recommended manual checks before publishing:

- Open `http://localhost:4173/`.
- Switch all four languages.
- Open the display settings panel and test all controls.
- Confirm RSS posts load for each language.
- Confirm GitHub activity appears.
- Check desktop and mobile widths.
- Confirm the footer credit is visible but unobtrusive.
