# LENS / CODE

一個以 `Vue 3`、`TypeScript` 與 `Vite` 打造的個人品牌 / 作品集網站模板，將前端專案展示與攝影內容放在同一套敘事視覺中。這個專案適合用來做個人官網、求職作品集、接案展示頁，或作為你自己的作品站起始模板。

專案目前採用內容驅動的方式組織，大部分文案、專案資料、攝影作品與聯絡資訊都集中在 [`src/data/siteContent.ts`](./src/data/siteContent.ts)，方便快速替換成自己的內容。

## 功能特色

- 四頁式網站結構：`Home`、`Portfolio`、`Photography`、`About`
- 首頁以大幅 Hero、精選專案、攝影段落與聯絡區塊建立完整敘事節奏
- 作品集頁支援依技術棧與年份篩選
- 攝影頁支援分類篩選、Lightbox 預覽、鍵盤左右切換與 `Esc` 關閉
- About 頁整合個人介紹、服務方向、方法論、技能標籤與直接聯絡方式
- 響應式版面，支援桌面、平板與手機瀏覽
- 內建輕量動效，並尊重 `prefers-reduced-motion`
- 已接入 `Vue Router` 與 `Pinia`，方便後續擴充頁面與狀態管理

## 技術棧

- `Vue 3`
- `TypeScript`
- `Vite`
- `Vue Router`
- `Pinia`
- `vite-plugin-vue-devtools`

## 頁面結構

- `/`：首頁，展示品牌主視覺、精選專案、攝影內容與聯絡入口
- `/portfolio`：作品集頁，提供專案列表與篩選功能
- `/photography`：攝影頁，提供分類篩選與燈箱預覽
- `/about`：關於頁，整合自我介紹、方法論、技能與聯絡方式

## 專案結構

```text
.
├─ public/
├─ src/
│  ├─ assets/
│  │  ├─ media/                # 攝影作品與專案示意圖
│  │  ├─ base.css              # 全域設計變數與基礎樣式
│  │  └─ main.css              # 通用版面、元件與動效
│  ├─ components/
│  │  ├─ PhotoLightbox.vue     # 攝影燈箱
│  │  ├─ ProjectCard.vue       # 專案卡片
│  │  └─ SectionHeading.vue    # 區塊標題
│  ├─ data/
│  │  └─ siteContent.ts        # 站點主要內容來源
│  ├─ router/
│  │  └─ index.ts              # 路由與頁面標題設定
│  ├─ stores/
│  │  └─ counter.ts            # Pinia 預設示例 store
│  ├─ views/
│  │  ├─ HomeView.vue
│  │  ├─ PortfolioView.vue
│  │  ├─ PhotographyView.vue
│  │  └─ AboutView.vue
│  ├─ App.vue                  # 站點外層框架
│  └─ main.ts                  # 應用入口
├─ index.html
├─ package.json
└─ README.md
```

## 環境需求

- `Node.js`：`^20.19.0 || >=22.12.0`
- `npm`

## 本機開發

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run dev
```

執行型別檢查：

```bash
npm run type-check
```

建置正式版本：

```bash
npm run build
```

本機預覽正式版：

```bash
npm run preview
```

## 如何客製化

### 1. 更新站點內容

主要資料集中在 [`src/data/siteContent.ts`](./src/data/siteContent.ts)，可優先修改以下欄位：

- `profile`：姓名、品牌名、角色、聯絡方式、所在地與個人簡介
- `heroStats`：首頁首屏統計資訊
- `skillTags`：技能標籤
- `serviceHighlights`：服務方向或能力描述
- `projects`：作品集專案資料
- `photos`：攝影作品資料
- `socialLinks`：社群與外部連結
- `aboutTimeline`：About 頁的方法論或經歷敘事

### 2. 替換圖片素材

將你的圖片放到 [`src/assets/media`](./src/assets/media) 後，再到 [`src/data/siteContent.ts`](./src/data/siteContent.ts) 中更新對應的 `import` 與資料欄位即可。

範例：

```ts
import myPhoto from '@/assets/media/my-photo.jpg'

export const photos = [
  {
    id: 'my-photo',
    title: 'My Photo',
    category: '風光',
    location: 'Taipei',
    year: 2026,
    description: '作品描述',
    image: myPhoto,
    imageAlt: 'My Photo',
    ratio: 'landscape',
    featured: true,
  },
]
```

### 3. 調整頁面與樣式

- [`src/views`](./src/views)：修改各頁面的結構與內容編排
- [`src/components`](./src/components)：調整共用元件
- [`src/App.vue`](./src/App.vue)：修改全站 Header / Footer 與外層框架
- [`src/router/index.ts`](./src/router/index.ts)：新增或調整路由
- [`src/assets/base.css`](./src/assets/base.css)：修改配色、字體、陰影與設計變數
- [`src/assets/main.css`](./src/assets/main.css)：修改通用元件樣式與基礎版面節奏

## 部署

建置完成後會產生 `dist/` 目錄，可部署到任何支援靜態網站託管的平台，例如：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- 其他靜態站點託管服務

基本流程：

```bash
npm run build
```

接著將 `dist/` 內容部署到你的平台即可。

## 使用前建議檢查

- 將 [`src/data/siteContent.ts`](./src/data/siteContent.ts) 中的示例聯絡方式改成自己的資訊
- 將 `projects` 內的 `githubUrl`、`demoUrl` 換成真實連結
- 將 `socialLinks` 內的 `your-name` 佔位內容全部替換
- 將 [`src/assets/media`](./src/assets/media) 中的示例圖片替換成自己的作品
- 視需求決定是否保留 Vue 初始化遺留的示例檔案，例如 `HelloWorld.vue`、`TheWelcome.vue`、`WelcomeItem.vue` 與 `src/stores/counter.ts`

## 備註

目前專案已完成主要站點結構與內容驅動資料流，但仍保留少量 Vue / Pinia 初始化示例檔案。這些檔案不影響網站運作，如不需要可自行清理。
