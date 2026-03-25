import projectAtlas from "@/assets/media/project-atlas.svg";
import projectDashboard from "@/assets/media/project-dashboard.svg";
import projectEditorial from "@/assets/media/project-editorial.svg";
import projectMotion from "@/assets/media/project-motion.svg";
import shuangliu from "@/assets/media/Shunangliu.jpg";
import shuangliu3 from "@/assets/media/Shunangliu-3.jpg";
import shuangliu4 from "@/assets/media/Shunangliu-4.jpg";
import tianfu from "@/assets/media/cd.jpg";
import xinglong from "@/assets/media/cd-5.jpg";

/* 项目卡片的数据结构，供作品集页与首页精选区复用。 */

export type ProjectItem = {
  id: string;
  title: string;
  year: number;
  summary: string;
  stack: string[];
  image: string;
  imageAlt: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  role: string;
};

/* 摄影作品当前支持的分类，用于筛选器和展示标签。 */

export type PhotoCategory = "风光" | "街拍";

/* 摄影作品的数据结构，供首页、摄影页和灯箱组件共享。 */

export type PhotoItem = {
  id: string;
  title: string;
  category: PhotoCategory;
  location: string;
  year: number;
  description: string;
  image: string;
  imageAlt: string;
  ratio: "portrait" | "landscape";
  featured: boolean;
};

/* 站点主身份信息，会被页头、页脚和关于页等区域复用。 */

export const profile = {
  brand: "LENS / CODE",
  name: "Gao Liuqing",
  initials: "G L",
  role: "前端开发者 / 摄影创作者",
  location: "Shanghai / Remote",
  email: "lx8nb12act@163.com",
  phone: "+86 12222222222",
  phoneHref: "tel:+8612222222222",
  intro:
    "我专注于打造兼具性能、可维护性与视觉叙事的前端体验，也持续用摄影记录城市、人物与自然之间的光线关系。",
  statement:
    "这个站点基于 Vue 3 搭建，适合作为个人品牌官网、求职作品集或接案展示页。你后续只需要替换数据文件里的项目内容、摄影作品和联系方式即可。",
  availability: "当前可承接品牌官网、交互型内容页与个人作品集项目",
};

/* 首页首屏的数字指标。 */

export const heroStats = [
  { label: "前端项目", value: "08+" },
  { label: "摄影专题", value: "08+" },
  { label: "协作方式", value: "Remote" },
];

/* 技能标签用于首页和关于页展示。 */

export const skillTags = [
  "Vue 3",
  "TypeScript",
  "Vite",
  "Vue Router",
  "Pinia",
  "Component Design",
  "Responsive UI",
  "Performance Tuning",
  "Interaction Design",
  "Photography Direction",
];

/* 服务方向说明，用于首页和关于页的能力介绍。 */

export const serviceHighlights = [
  "品牌展示型官网设计与开发",
  "内容驱动型前端页面搭建",
  "作品集网站与个人品牌包装",
  "摄影项目选片、排版与视觉整理",
];

/* 项目案例数据源。 */

export const projects: ProjectItem[] = [
  {
    id: "aurora-commerce",
    title: "Aurora Commerce",
    year: 2026,
    summary:
      "面向生活方式品牌的电商展示站，重点优化首屏视觉、商品筛选交互与移动端转化路径。",
    stack: ["Vue 3", "TypeScript", "Pinia", "GSAP"],
    image: projectAtlas,
    imageAlt: "Aurora Commerce 项目预览图",
    githubUrl: "https://github.com/your-name/aurora-commerce",
    demoUrl: "https://example.com/aurora-commerce",
    featured: true,
    role: "UI 架构 / 前端开发",
  },
  {
    id: "editorial-studio",
    title: "Editorial Studio",
    year: 2025,
    summary:
      "为创意工作室打造的内容编辑与发布平台，突出视觉层次、模块化排版和团队协作效率。",
    stack: ["Vue 3", "TypeScript", "Vue Router", "Headless CMS"],
    image: projectEditorial,
    imageAlt: "Editorial Studio 项目预览图",
    githubUrl: "https://github.com/your-name/editorial-studio",
    demoUrl: "https://example.com/editorial-studio",
    featured: true,
    role: "前端负责人 / 设计系统落地",
  },
  {
    id: "atlas-dashboard",
    title: "Atlas Dashboard",
    year: 2025,
    summary:
      "用于内容运营和增长分析的后台系统，包含数据看板、实时指标与多维筛选工作流。",
    stack: ["Vue 3", "TypeScript", "ECharts", "Pinia"],
    image: projectDashboard,
    imageAlt: "Atlas Dashboard 项目预览图",
    githubUrl: "https://github.com/your-name/atlas-dashboard",
    demoUrl: "https://example.com/atlas-dashboard",
    featured: true,
    role: "数据可视化 / 后台体验设计",
  },
  {
    id: "motion-brand",
    title: "Motion Brand Site",
    year: 2024,
    summary:
      "强调视频叙事和滚动动效的品牌官网，围绕品牌故事构建沉浸式浏览体验。",
    stack: ["Vue 3", "TypeScript", "Lenis", "Motion Design"],
    image: projectMotion,
    imageAlt: "Motion Brand Site 项目预览图",
    githubUrl: "https://github.com/your-name/motion-brand-site",
    demoUrl: "https://example.com/motion-brand-site",
    featured: false,
    role: "交互动效 / 页面性能优化",
  },
];

/* 摄影作品数据源，控制首页精选图和摄影页列表。 */

export const photos: PhotoItem[] = [
  {
    id: "ridge-line",
    title: "Ridge Line",
    category: "风光",
    location: "Yunnan",
    year: 2025,
    description: "利用冷暖反差和山脊线条塑造画面纵深，适合大尺寸展示。",
    image: shuangliu,
    imageAlt: "风光摄影作品 Ridge Line",
    ratio: "landscape",
    featured: true,
  },
  {
    id: "midnight-crossing",
    title: "Sunset Crossing",
    category: "街拍",
    location: "Tianfu Park",
    year: 2025,
    description: "晴天下的天府公園",
    image: tianfu,
    imageAlt: "街拍摄影作品 Midnight Crossing",
    ratio: "portrait",
    featured: true,
  },
  {
    id: "silent-horizon",
    title: "Silent Horizon",
    category: "风光",
    location: "SHUANGLIU",
    year: 2024,
    description: "在低照度环境中保留地形起伏和天空层次，营造静谧感。",
    image: shuangliu4,
    imageAlt: "风光摄影作品 Silent Horizon",
    ratio: "landscape",
    featured: true,
  },
  {
    id: "coastline-study",
    title: "Coastline Study",
    category: "风光",
    location: "SHUANGLIU",
    year: 2024,
    description: "通过海岸曲线与颜色块面形成极简画面，适用于系列排版。",
    image: shuangliu3,
    imageAlt: "风光摄影作品 Coastline Study",
    ratio: "portrait",
    featured: false,
  },
  {
    id: "city-reflection",
    title: "City Reflection",
    category: "街拍",
    location: "Xinglong lake",
    year: 2025,
    description: "城市倒影，展现现代都市的繁华与宁静。",
    image: xinglong,
    imageAlt: "街拍摄影作品 City Reflection",
    ratio: "landscape",
    featured: true,
  },
];

/* 社交与外部链接集合。 */

export const socialLinks = [
  { label: "GitHub", url: "https://github.com/your-name" },
  { label: "Behance", url: "https://www.behance.net/your-name" },
  { label: "Instagram", url: "https://www.instagram.com/your-name" },
  { label: "Email", url: `mailto:${profile.email}` },
];

/* 关于页时间线式叙事内容。 */

export const aboutTimeline = [
  {
    title: "设计与开发并行",
    description:
      "擅长在视觉概念、信息结构和组件工程之间建立稳定连接，让页面既好看也能长期维护。",
  },
  {
    title: "以内容叙事驱动界面",
    description:
      "无论是品牌官网还是作品集，我都会优先处理节奏、留白、图文关系和滚动体验。",
  },
  {
    title: "摄影反哺前端表达",
    description:
      "摄影训练帮助我更敏感地处理光线、色彩和构图，这也直接影响到页面视觉的层次与氛围。",
  },
];
