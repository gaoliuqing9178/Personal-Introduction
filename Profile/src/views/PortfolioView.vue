<script setup lang="ts">
import { computed, ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { projects } from '@/data/siteContent'

/* 作品列表支持按技术栈与年份双条件筛选。 */

const selectedTech = ref('全部')
const selectedYear = ref('全部')

const techOptions = computed(() => ['全部', ...new Set(projects.flatMap((project) => project.stack))])
const yearOptions = computed(() => ['全部', ...new Set(projects.map((project) => String(project.year)))])

/* 只显示同时满足当前筛选条件的项目。 */

const filteredProjects = computed(() =>
  projects.filter((project) => {
    const matchesTech = selectedTech.value === '全部' || project.stack.includes(selectedTech.value)
    const matchesYear = selectedYear.value === '全部' || String(project.year) === selectedYear.value

    return matchesTech && matchesYear
  }),
)
</script>

<template>
  <!-- 页头说明当前页定位与筛选结果数量。 -->
  <section class="page-intro page-section portfolio-hero">
    <div class="portfolio-hero__head">
      <SectionHeading
        eyebrow="Portfolio"
        title="项目页改成更像选集目录，而不是普通筛选面板"
        description="筛选能力保留，但放到侧边控制栏里，让主区域始终优先展示作品本身。"
      />
      <p class="portfolio-hero__count">Showing {{ filteredProjects.length }} project{{ filteredProjects.length === 1 ? '' : 's' }}</p>
    </div>
  </section>

  <!-- 左侧筛选，右侧项目列表。 -->
  <section class="page-section portfolio-layout">
    <aside class="portfolio-filters">
      <div class="portfolio-filters__group">
        <span class="portfolio-filters__label">By stack</span>
        <div class="portfolio-filters__chips">
          <button
            v-for="tech in techOptions"
            :key="tech"
            type="button"
            :class="['filter-chip', { 'filter-chip--active': selectedTech === tech }]"
            @click="selectedTech = tech"
          >
            {{ tech }}
          </button>
        </div>
      </div>

      <div class="portfolio-filters__group">
        <span class="portfolio-filters__label">By year</span>
        <div class="portfolio-filters__chips">
          <button
            v-for="year in yearOptions"
            :key="year"
            type="button"
            :class="['filter-chip', { 'filter-chip--active': selectedYear === year }]"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>
    </aside>

    <div class="portfolio-list">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<style scoped>
/* 作品页头部信息。 */
.portfolio-hero__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.portfolio-hero__count {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* 主体布局：侧边筛选 + 项目列表。 */
.portfolio-layout {
  display: grid;
  grid-template-columns: minmax(240px, 0.35fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: start;
}

.portfolio-filters {
  position: sticky;
  top: 7rem;
  display: grid;
  gap: 1.5rem;
  padding: 1.4rem;
  border: 1px solid rgba(255, 250, 243, 0.72);
  border-radius: 2rem;
  background: rgba(255, 250, 243, 0.66);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px);
}

.portfolio-filters__group {
  display: grid;
  gap: 0.8rem;
}

.portfolio-filters__label {
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.portfolio-filters__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.filter-chip {
  min-height: 40px;
  padding: 0.58rem 0.88rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.5);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.filter-chip--active {
  border-color: rgba(180, 91, 49, 0.4);
  color: var(--color-inverse);
  background: var(--color-accent);
}

.portfolio-list {
  display: grid;
}

/* 窄屏下将侧边筛选改为顶部块状布局。 */
@media (max-width: 980px) {
  .portfolio-hero__head,
  .portfolio-layout {
    grid-template-columns: 1fr;
    display: grid;
  }

  .portfolio-filters {
    position: static;
  }
}
</style>
