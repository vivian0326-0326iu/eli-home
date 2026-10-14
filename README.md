# eli 的小家 · 时光博物馆

温柔的 2D 虚拟小家，包含房间、换装、日记、时光博物馆和 JSON 备份。

## 当前版本 V0.6

- 单一房间主图；Q 版 eli 单独显示在角色区。
- **V0.6 修复**：6 套真正不同领口与衣型的矢量服装 × 4 种面部表情（闭眼、弯眼、睁眼、打气笑容），共 24 种组合。旧版把颜色贴在照片上的半透明遮罩已不再使用。
- 原来的精细卧室插画保留在房间主图；互动角色使用可编辑的独立 2D Q 版矢量素材，画风与原画不同。
- 服装与情绪都可在首页和衣柜切换，选择保存在本机。
- 三种房间氛围：白天、夜晚、工作角。
- 日记与博物馆：新增、编辑、删除、分类、搜索；记忆条目保留来源和日期。
- 数据仅保存在当前浏览器 localStorage；可导入、导出 JSON 备份。
- 桌面和手机布局，支持离线缓存。
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

- [24 种角色组合预览](https://vivian0326-0326iu.github.io/eli-home/character-preview.html)
- GitHub Actions 的 `Character regression tests` 会验证 JS 语法、24 组合唯一性、SVG XML 合法性及事件挂接。
- `Character visual QA` 会生成视觉拼图供开发检查。

## 生活网站入口

- 体重饮食：`https://script.google.com/macros/s/AKfycbyb_vAIWn4ipc2sWVKAfEgcI3e6_GnFK1PUo7nioUdSaV3SfTXIORGPuxv2BJvdTxF9/exec`
- 记账：`https://xiru-jizhang-workbench.tinychub18.chatgpt.site/`
- 目前是跳转入口；今日摄入仍为本机手动记录，**没有**自动读取私人健康数据库。

## 本地运行

`python3 -m http.server 8000`，浏览器访问 `http://localhost:8000`。

## 版本升级

本次沿用原来的 `eli-home-mvp-v1` 本地存储键，避免清空用户在 V0.2 保存的内容。更新前仍建议导出备份。
