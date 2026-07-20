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
- `teachers.html`
- `sources.html`
- `README.md`
- `PROJECT-BRIEF.md`
- `ACCEPTANCE-REPORT.md`
- `css/style.css`
- `js/main.js`
- `assets/icons/favicon.svg`
- `assets/vendor/lucide-subset.js`
- `assets/images/placeholders/*.svg`
- `assets/images/stock/*.jpg`
- `assets/images/stock/SOURCES.md`

## 不要上传

- `qa/`
- `archive/`
- `.playwright-cli/`
- `logs/`
- `scripts/`
- `server.err.log`
- `server.out.log`
- 任何本地测试截图或缓存文件
- `assets/images/stock/` 之外的临时下载图

## GitHub 仓库建议

- 推荐仓库名：`yangchun-school-info`
- 避免使用 `official`、`官网`、`官方报名` 等容易造成误解的名称

## GitHub Pages 设置

1. 新建 GitHub 仓库。
2. 上传本目录所有文件到仓库根目录。
3. 进入仓库 `Settings`。
4. 打开 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`，目录选择 `/root`。
7. 等待 GitHub 生成访问链接。

## 上线后检查

- 首页能打开
- 导航能跳转到 7 个内页
- `css/style.css` 正常加载，页面不是纯文字
- 示意图正常显示
- 手机端菜单能打开，点击导航后能自动收起
- 专业筛选能工作
- 演示表单提交只弹出提示，不提交真实信息
- 师资团队页不展示未经授权的教师个人信息
- 首页和页脚都有“学生个人学习项目，非学校官方网站”声明
