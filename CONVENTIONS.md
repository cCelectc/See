# Project Conventions

## Directory Structure

```
├-- .env.example           # 环境变量模板
├-- astro.config.mjs       # Astro 构建配置（站点 URL、插件、Markdown 处理器）
├-- biome.json             # Biome linter/formatter 配置
├-- content/               # 所有内容文件
|   ├-- posts/             # 博客文章（每篇一个子目录）
|   |   └-- <slug>/
|   |       └-- index.md   # 文章内容 + frontmatter
|   |       └-- image.png  # 文章配图（colocate，与文章放在一起）
|   └-- spec/              # 特殊页面（About、Friends 等）
|       └-- <slug>/
|           └-- index.md   # 页面内容 + frontmatter
├-- package.json           # 项目元信息和脚本
├-- public/                # 静态资源（直接复制到 dist/）
|   ├-- favicon/
|   └-- images/
├-- scripts/
|   ├-- new-post.js        # 创建新文章的 CLI
|   └-- new-page.js        # 创建新 spec 页面的 CLI
├-- src/                   # 源码
|   ├-- components/        # UI 组件（Astro + Svelte）
|   ├-- config.ts          # 站点配置（标题、主题、导航、字体、布局）
|   ├-- constants/         # 常量（默认布局值、图标预设）
|   ├-- content.config.ts  # Content Collections schema 和 loader 定义
|   ├-- i18n/              # 国际化（翻译文件）
|   ├-- layouts/           # 页面布局组件
|   ├-- pages/             # Astro 路由页面
|   ├-- plugins/           # Remark/Rehype 插件
|   ├-- styles/            # 样式表（CSS、Stylus、Tailwind）
|   ├-- types/             # TypeScript 类型定义
|   └-- utils/             # 工具函数
├-- tsconfig.json
└-- CONVENTIONS.md         # 本文件
```

## Writing a New Post

```bash
pnpm new-post my-article-title
```

This creates `content/posts/my-article-title/index.md` with the following frontmatter:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | (required) | 文章标题 |
| `published` | date | (required) | 发布日期 |
| `updated` | date | (optional) | 最后更新日期 |
| `description` | string | `""` | 文章摘要，用于 SEO 和列表展示 |
| `image` | string | `""` | 封面图路径（相对路径或 URL） |
| `tags` | string[] | `[]` | 标签列表 |
| `category` | string | `""` | 分类 |
| `draft` | boolean | `false` | 是否草稿（生产环境不渲染） |
| `lang` | string | `""` | 文章语言（覆盖站点默认语言） |
| `pinned` | boolean | `false` | 是否置顶 |

> **Note**: `prevTitle`/`prevSlug`/`nextTitle`/`nextSlug` 由系统自动生成，不需要手动设置。

### Adding Images

将图片文件放在文章目录下，然后在 Markdown 中通过相对路径引用：

```markdown
![alt text](./image.png)
```

封面图通过 frontmatter 的 `image` 字段指定（同样为相对路径或完整 URL）：

```yaml
image: ./cover.png
```

### Adding Assets (non-image files)

任何非文章的附属文件（.txt, .pdf, .zip 等）同样放在文章目录下，通过相对路径链接：

```markdown
[下载文件](./data.txt)
```

## Creating a Spec Page

```bash
pnpm new-page changelog
```

This creates `content/spec/changelog/index.md` with frontmatter:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | (name) | 页面标题 |
| `description` | string | `""` | 页面描述 |
| `image` | string | `""` | 封面图 |

## Configuration Quick Reference

| 想要修改 | 去哪改 |
|----------|--------|
| 站点标题 / 副标题 | `src/config.ts` -> `siteConfig.title` / `siteConfig.subtitle` |
| 站点语言 | `src/config.ts` -> `siteConfig.lang` |
| 主题色 | `src/config.ts` -> `siteConfig.themeColor.hue`（0-360） |
| Banner 图片 | `src/config.ts` -> `siteConfig.banner.src` |
| 导航栏链接 | `src/config.ts` -> `navBarConfig.links` |
| 头像 / 昵称 / 简介 | `src/config.ts` -> `profileConfig` |
| 版权协议 | `src/config.ts` -> `licenseConfig` |
| 代码高亮主题 | `src/config.ts` -> `expressiveCodeConfig.theme` |
| 友链 | `content/spec/friends/index.md` -> frontmatter `friends` 数组 |
| 关于页面内容 | `content/spec/about/index.md` |
| 站点 URL | `.env` 文件 -> `PUBLIC_SITE_URL` |
| 默认正文字体 | `src/config.ts` -> `siteConfig.fonts.body`（需手动 `pnpm add @fontsource/xxx`） |
| 默认代码字体 | `src/config.ts` -> `siteConfig.fonts.code`（需手动 `pnpm add @fontsource-variable/xxx`） |
| Banner 高度 | `src/config.ts` -> `siteConfig.layout.bannerHeight`（vh，默认 35） |
| 页面宽度 | `src/config.ts` -> `siteConfig.layout.pageWidth`（rem，默认 75） |
| 首页分页数 | `src/config.ts` -> `siteConfig.layout.pageSize`（默认 8） |

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|----------|-------------|---------|
| `PUBLIC_SITE_URL` | 站点完整 URL | `http://localhost:4321` |

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 + Pagefind 搜索索引 |
| `pnpm preview` | 预览构建结果 |
| `pnpm new-post <name>` | 创建新文章 |
| `pnpm new-page <name>` | 创建新 spec 页面 |
| `pnpm type-check` | TypeScript 类型检查 |
| `pnpm lint` | Biome lint + 自动修复 |
| `pnpm format` | Biome 格式化 |
