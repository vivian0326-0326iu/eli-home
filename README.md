# eli 的小家 · 时光博物馆

温柔的 2D 虚拟小家，包含房间、换装、日记、时光博物馆和 JSON 备份。

## 当前版本 V0.8

- 首页与房间页面同步四种手动选择的氛围：晴日卧室、星灯夜晚、窗边工作角、雨声小屋。
- 房间加入光晕、星光、雨丝、场景介绍、缩略图和一键切换。夜晚和雨天是美术主题，并非真实天气。
- 两张原有房间插画已从 CSS 中抽出为独立 WebP 文件；清理旧版无用的图片代码，减轻加载体积。
- Q 版 eli 单独显示在角色区，房间主图不叠人物。
- **V0.7 插画替换**：使用用户认可的暖色动漫插画，6 张不同服装图片和 4 张表情图片，直接切换 `<img>`，不再把颜色叠在旧照片上。
- 房间背景保持原样，角色换成接近规划图画风的真实 WebP 插画。
- 服装和情绪都可在首页和衣柜切换，选择保存在本机。由于目前只有 10 张原图，大图展示最近操作的衣服或表情，小图展示另一项已选状态；还不是 24 张组合立绘。
- 三种房间氛围：白天、夜晚、工作角。
- 日记与博物馆：新增、编辑、删除、分类、搜索；记忆条目保留来源和日期。
- 数据仅保存在当前浏览器 localStorage；可导入、导出 JSON 备份。设置页面会展示本机日记、藏品和摄入记录数。
- 备份包含日记、藏品、房间、衣柜、心情、生活中心手动摄入和两个网站入口；**不会**自动读取或同步外部私人数据库。
- 桌面和手机布局，支持离线缓存，支持系统减少动态效果偏好。
- 拆分 HTML、CSS、JS，方便后续维护。无需后端，也不依赖外部 CDN。

## 隐私说明

**此仓库公开，但不会自动上传用户日记或记忆。** 只有网页代码、公共美术和两条非敏感项目示例。请不要提交个人日记、聊天记录、健康资料、密码、令牌或导出的 JSON 文件。

数据不会跨设备自动同步；清除浏览器网站数据可能丢失，建议定期下载备份。导出的 JSON 是明文。

## GitHub Pages 部署

仓库管理员打开 **Settings → Pages → Build and deployment → Deploy from a branch**，选择 **main**、**/(root)**，然后保存。

部署成功后网站地址通常是：
https://vivian0326-0326iu.github.io/eli-home/

**提交代码不代表 Pages 已开启或上线成功。** 请以 GitHub Pages 显示的部署状态和网站实际访问结果为准。

## 角色视觉与自动化检查

- [10 张真实插画预览](https://vivian0326-0326iu.github.io/eli-home/character-preview.html)
- GitHub Actions 的 `Character regression tests` 会验证 JS 语法、12 张 WebP 图片、四种房间主题及数据状态。
- `Mobile UI smoke test` 使用手机尺寸 Chromium 验证换装、情绪、房间切换、页面刷新后保存、手动摄入及 JSON 导出。
- `Character visual QA` 会生成 10 张插画的视觉拼图供开发检查。

## 生活网站入口

- 体重饮食：`https://script.google.com/macros/s/AKfycbyb_vAIWn4ipc2sWVKAfEgcI3e6_GnFK1PUo7nioUdSaV3SfTXIORGPuxv2BJvdTxF9/exec`
- 记账：`https://xiru-jizhang-workbench.tinychub18.chatgpt.site/`
- 目前是跳转入口；今日摄入仍为本机手动记录，**没有**自动读取私人健康数据库。

## 本地运行

`python3 -m http.server 8000`，浏览器访问 `http://localhost:8000`。

## 版本升级

本次继续沿用 `eli-home-mvp-v1` 和 `eli-home-life-v1` 本地存储键，避免清空旧版本保存的记录。新增房间主题不改变原有数据结构。更新前仍建议导出备份。

**数据边界：** 发布静态代码无法直接修改用户 iPhone 浏览器中的 localStorage，也无法直接读取私人 Google Apps Script / 记账网站里的最新数据。主页的今日摄入来自本机手动记录，未知时显示「未记录」，不会填 0 或套用历史值。
