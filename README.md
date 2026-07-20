# 阳春高新职校信息展示页

这是一个学生个人学习项目，用于练习中职学校信息展示网站的 HTML、CSS 和 JavaScript 实现。项目内容基于公开资料与用户提供的招生简章截图整理，不代表学校官方发布。

## 项目定位

- 非学校官方网站
- 未获得学校官方授权
- 不提供真实报名功能
- 不收集学生或家长的真实个人信息
- 招生政策、收费标准、报名方式等以学校官方发布为准

## 页面结构

- `index.html`：首页
- `about.html`：学校概况
- `majors.html`：专业介绍
- `campus.html`：校园环境
- `admission.html`：招生就业
- `contact.html`：联系我们
- `teachers.html`：师资团队
- `sources.html`：资料来源与免责声明

## 当前口径

- 学校名称：阳江市阳春高新职业技术学校
- 招生电话：0662-7763333
- 咨询时间：周一至周日 8:00-22:00
- 校园规模：招生简章口径为 105 亩，建筑面积约 7 万平方米
- 专业数量：招生简章提到 16 个热门专业；当前网站已核对录入 15 个专业名称，缺失项待复核
- 校园生活：宿舍、食堂、社团、实习基地等信息按公开资料和招生简章摘要展示

## 技术栈

- HTML
- CSS
- JavaScript
- GitHub Pages 静态部署

## 本地预览

可直接用浏览器打开 `index.html`。如果需要模拟线上路径，建议在项目根目录启动静态服务：

```powershell
python -m http.server 8000
```

然后访问：

```text
http://127.0.0.1:8000/
```

## 目录说明

- `*.html`：网站页面源码，保留在根目录，方便本地编辑和预览
- `css/`：当前站点样式，只保留正在使用的 `style.css`
- `js/`：当前站点交互脚本，只保留正在使用的 `main.js`
- `assets/`：站点图标、本地占位图和少量前端依赖
- `assets/vendor/lucide-subset.js`：专业页实际使用的 Lucide 图标子集
- `ACCEPTANCE-REPORT.md`：项目验收报告，记录已完成页面、验证结果和待补资料
- `dist-github-pages/`：GitHub Pages 上传版本，只放上线需要的文件

## 维护说明

- 根目录是当前编辑版本
- `dist-github-pages/` 是 GitHub Pages 部署版本
- 修改页面后需要同步到 `dist-github-pages/`
- 上线前需要检查导航、专业筛选、演示表单、移动端菜单和非官方声明
- 不要把未授权教师信息、学生个人信息、内部文件截图或未核实就业率写入页面

## 部署地址

- GitHub 仓库：https://github.com/ZYvoiddev/yangchun-school-info
- GitHub Pages：https://zyvoiddev.github.io/yangchun-school-info/
