# LENS / CODE

一個以 `Vue 3`、`TypeScript` 與 `Vite` 製作的個人作品集與攝影展示網站，適合用來作為個人品牌官網、求職作品集、接案展示頁，或作為你自己的作品網站起始模板。

這個專案目前包含首頁、作品集頁、攝影頁與 About / Contact 頁，並採用資料驅動的內容結構，主要內容可集中在 [`src/data/siteContent.ts`](./src/data/siteContent.ts) 維護。

## 功能特色

- 多頁式作品網站結構，包含首頁、作品集、攝影作品與個人介紹頁
- 作品集頁支援依技術棧與年份篩選
- 攝影頁支援依分類篩選，並提供 Lightbox 放大瀏覽
- 響應式版面設計，適配桌面與手機尺寸
- 主要內容集中在單一資料檔，方便快速替換成自己的資料
- 使用 Vue Router 管理頁面切換，並同步更新瀏覽器標題

## 技術棧

- `Vue 3`
- `TypeScript`
- `Vite`
- `Vue Router`
- `Pinia`
- `vite-plugin-vue-devtools`

## 頁面說明

- `/`：首頁，展示品牌主視覺、精選專案、精選攝影作品與聯絡資訊
- `/portfolio`：作品集頁，顯示專案列表並提供篩選功能
- `/photography`：攝影作品頁，提供作品分類篩選與燈箱預覽
- `/about`：個人介紹與聯絡資訊頁

## 專案結構

```text
.
├─ public/
├─ src/
│  ├─ assets/
│  │  ├─ media/                # 圖片與視覺素材
│  │  ├─ base.css              # 全域設計變數與基礎樣式
│  │  └─ main.css              # 全域版型與通用元件樣式
│  ├─ components/              # 可重用元件
│  ├─ data/
│  │  └─ siteContent.ts        # 主要站點資料來源
│  ├─ router/
│  │  └─ index.ts              # 路由設定
│  ├─ views/                   # 各頁面 View
│  ├─ App.vue                  # 站點外殼
│  └─ main.ts                  # 應用入口
├─ index.html
├─ package.json
└─ README.md
```

## 開發環境需求

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

建置正式版：

```bash
npm run build
```

本機預覽正式版：

```bash
npm run preview
```

## 如何替換成自己的內容

### 1. 更新站點文字與資料

主要資料集中在 [`src/data/siteContent.ts`](./src/data/siteContent.ts)，你可以直接修改：

- `profile`：姓名、角色、簡介、聯絡方式
- `heroStats`：首頁數據
- `serviceHighlights`：服務項目或能力描述
- `projects`：作品集資料
- `photos`：攝影作品資料
- `socialLinks`：外部連結
- `aboutTimeline`：About 頁的敘事內容

### 2. 替換圖片素材

將你的圖片放進 [`src/assets/media`](./src/assets/media)，再到 [`src/data/siteContent.ts`](./src/data/siteContent.ts) 中匯入並綁定到對應欄位。

例如：

```ts
import myPhoto from "@/assets/media/my-photo.jpg";

export const photos = [
  {
    id: "my-photo",
    title: "My Photo",
    category: "風光",
    location: "Taipei",
    year: 2026,
    description: "作品描述",
    image: myPhoto,
    imageAlt: "My Photo",
    ratio: "landscape",
    featured: true,
  },
];
```

### 3. 調整頁面內容與版型

- [`src/views`](./src/views)：修改各頁內容結構
- [`src/components`](./src/components)：調整共用元件
- [`src/assets/base.css`](./src/assets/base.css)：修改色彩、字體、陰影等設計變數
- [`src/assets/main.css`](./src/assets/main.css)：修改全域區塊、按鈕與通用樣式

## 部署

建置完成後會產生 `dist/` 目錄，可部署到：

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- 任何支援靜態網站託管的平台

基本流程：

```bash
npm run build
```

然後將 `dist/` 內的內容部署到你的託管平台即可。

## 發佈前建議檢查

- 把 [`src/data/siteContent.ts`](./src/data/siteContent.ts) 裡的示範連結改成你自己的 GitHub、社群與作品連結
- 檢查 `projects` 內的 `githubUrl`、`demoUrl` 是否仍為示例網址
- 檢查 `socialLinks` 是否仍使用 `your-name` 這類占位內容
- 替換 `public/favicon.ico`
- 補上你自己的專案授權檔案 `LICENSE`（如果你希望明確授權他人使用）

## 備註

目前這個專案保留了少量 Vue 初始化時的示例元件，例如 `HelloWorld.vue`、`TheWelcome.vue` 等；它們不是主要頁面流程的一部分，如有需要可以刪除。
