<script setup lang="ts">
import type { ProjectItem } from '@/data/siteContent'

/* 项目卡片只负责渲染单个项目数据。 */

defineProps<{
  project: ProjectItem
}>()
</script>

<template>
  <!-- 左图右文的项目展示卡片。 -->
  <article class="project-card">
    <div class="project-card__media">
      <img :src="project.image" :alt="project.imageAlt" loading="lazy" />
    </div>

    <div class="project-card__body">
      <p class="project-card__meta">{{ project.year }} / {{ project.role }}</p>
      <h3>{{ project.title }}</h3>
      <p class="project-card__summary">{{ project.summary }}</p>

      <ul class="project-card__stack">
        <li v-for="item in project.stack" :key="item">{{ item }}</li>
      </ul>

      <div class="project-card__actions">
        <a :href="project.githubUrl" target="_blank" rel="noreferrer">Source</a>
        <a :href="project.demoUrl" target="_blank" rel="noreferrer">Live Preview</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* 项目卡片基础布局。 */
.project-card {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
  gap: 1.6rem;
  padding: 1rem 0 1.8rem;
  border-bottom: 1px solid var(--color-border);
}

.project-card__media {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  border-radius: 2rem;
  background: rgba(255, 250, 243, 0.72);
  box-shadow: var(--shadow-soft);
}

.project-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}

.project-card:hover .project-card__media img {
  transform: scale(1.03);
  filter: saturate(1.04);
}

/* 右侧文本信息与操作区。 */
.project-card__body {
  display: grid;
  align-content: start;
  gap: 1rem;
}

.project-card__meta {
  color: var(--color-accent);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.project-card h3 {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 0.96;
}

.project-card__summary {
  color: var(--color-text-muted);
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding: 0;
  list-style: none;
}

.project-card__stack li {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.5);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.project-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 0.4rem;
}

.project-card__actions a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.72rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.56);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* 小屏下改为上下结构。 */
@media (max-width: 900px) {
  .project-card {
    grid-template-columns: 1fr;
  }

  .project-card__media {
    min-height: 260px;
  }
}
</style>
