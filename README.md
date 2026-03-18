# AirLocker 产品介绍站

类似 [Dropbox 官网](https://www.dropbox.com/) 风格的单页产品介绍站，独立于主应用，便于单独部署或对外展示。

## 结构

```
landing/
├── index.html      # 主页面
├── contact.html    # 联系销售页（表单）
├── css/
│   └── style.css  # 样式
├── js/
│   └── main.js    # 语言切换、下载链接
└── README.md
```

## 本地预览

在项目根目录用任意静态服务器打开，例如：

```bash
# Python 3
python3 -m http.server 8080
# 访问 http://localhost:8080
```

或用 VS Code / Cursor 的 “Open with Live Server” 打开 `index.html`。

## 部署说明

- 将本仓库部署到任意静态托管（如 GitHub Pages、Netlify、Vercel 等）即可。
- **下载链接**：`index.html`/`contact.html` 的下载按钮已固定指向 `download.html`（不依赖 JS 替换）。
- **联系销售表单**：`contact.html` 中表单当前 `action="#"`，提交仅为前端占位（显示「已提交」）。若要真实收集线索，可将 `form action` 改为后端接口或第三方表单服务，或在页面底部脚本中改为 AJAX 提交。

## 内容与风格

支持中英文切换，无需后端，纯静态 HTML/CSS/JS。

