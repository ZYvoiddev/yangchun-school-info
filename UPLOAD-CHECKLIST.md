# GitHub Pages 上传清单

## 发布目录

请上传 `dist-github-pages/` 目录内的文件，而不是整个工作目录。

## 必须上传

- `index.html`
- `about.html`
- `majors.html`
- `campus.html`
- `admission.html`
- `contact.html`
- `sources.html`
- `README.md`
- `css/style.css`
- `js/main.js`
- `assets/icons/favicon.svg`
- `assets/images/placeholders/*.svg`

## 不要上传

- `.playwright-cli/`
- `logs/`
- `scripts/`
- 任何本地测试截图或缓存文件

## GitHub 仓库建议

- 推荐仓库名：`yangchun-school-info`
- 避免使用：`official`、`官网`、`官方报名` 等容易造成误解的名称。

## GitHub Pages 设置

1. 新建 GitHub 仓库。
2. 上传本目录所有文件到仓库根目录。
3. 进入仓库 `Settings`。
4. 打开 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/root`。
7. 等待 GitHub 生成访问链接。

## 上线后检查

- 首页能打开。
- 导航能跳转 6 个页面。
- `css/style.css` 正常加载，页面不是纯文字。
- 示意图正常显示。
- 手机端菜单能打开。
- 专业筛选能工作。
- 演示表单提交只弹出提示，不提交真实信息。
- 页首和页脚都有“学生个人项目，非学校官方网站”声明。
