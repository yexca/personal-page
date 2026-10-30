# yexca's personal page

A lightweight static personal homepage for yexca.

The page uses plain HTML, CSS, and JavaScript. It has no build step and can be hosted by any static file server.

## Features

- Glass-style bento card layout over a background image
- In-page section navigation, toolbox (uses) card, and GitHub activity timeline
- Multilingual UI: English, 简体中文, 正體中文, 日本語
- Browser language detection with English fallback
- Manual language switcher
- Blog RSS loading per language
- Recent GitHub activity cards with non-bot commit messages and pull requests
- Preset display settings for background style and text color
- Static assets only

## Local Preview

```sh
python -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

The page loads `site.config.json`, so previewing through a local static server is recommended.

## Files

- `index.html`: page structure
- `style.css`: layout, glass effects, responsive design
- `script.js`: config loading, RSS loading, GitHub activity, display settings
- `site.config.json`: editable site content, links, translations, RSS endpoints, project cards, and defaults
- `img/background.jpg`: page background
- `img/profile.png`: avatar and favicon
- `documents/development.md`: development notes

## Credits

Background image source: https://www.pixiv.net/artworks/76371065
