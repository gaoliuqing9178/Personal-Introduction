<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHeading from '@/components/SectionHeading.vue'
import { heroStats, photos, profile, projects, serviceHighlights, skillTags, socialLinks } from '@/data/siteContent'

/* 首页只取精选项目与精选摄影，避免首屏信息过载。 */

const featuredProjects = computed(() => projects.filter((project) => project.featured).slice(0, 3))
const featuredPhotos = computed(() => photos.filter((photo) => photo.featured).slice(0, 4))

/* 首屏主图优先选择横图，兜底再回退到第一张精选图或第一张摄影作品。 */

const heroPhoto = computed(
  () => featuredPhotos.value.find((photo) => photo.ratio === 'landscape') ?? featuredPhotos.value[0] ?? photos[0]!,
)

/* 侧边胶片条只展示除主图之外的补充作品。 */

const heroStripPhotos = computed(() => featuredPhotos.value.filter((photo) => photo.id !== heroPhoto.value?.id).slice(0, 3))

/* 首页作品区采用一主两辅的结构。 */

const leadProject = computed(() => featuredProjects.value[0] ?? projects[0] ?? null)
const supportingProjects = computed(() => featuredProjects.value.slice(1))
</script>

<template>
  <div class="home-page">
    <!-- 首屏模块：品牌、身份信息与精选摄影主视觉。 -->
    <section class="hero">
      <div class="hero__media">
        <img :src="heroPhoto.image" :alt="heroPhoto.imageAlt" />
      </div>
      <div class="hero__scrim"></div>

      <div class="hero__inner">
        <div class="hero__copy">
          <p class="hero__brand load-rise">{{ profile.brand }}</p>
          <h1 class="load-rise load-rise--delay-1">{{ profile.name }}</h1>
          <p class="hero__role load-rise load-rise--delay-2">{{ profile.role }}</p>
          <p class="hero__intro load-rise load-rise--delay-3">{{ profile.intro }}</p>

          <div class="hero__actions load-rise load-rise--delay-4">
            <RouterLink class="button button--primary" to="/portfolio">View Portfolio</RouterLink>
            <a class="button button--secondary" href="#contact">Contact</a>
          </div>

          <dl class="hero__facts load-rise load-rise--delay-4">
            <div v-for="item in heroStats" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>

        <div v-if="heroStripPhotos.length" class="hero__rail load-rise load-rise--delay-4">
          <p>Selected Frames</p>

          <div class="hero__strip">
            <article v-for="photo in heroStripPhotos" :key="photo.id">
              <img :src="photo.image" :alt="photo.imageAlt" loading="lazy" />
              <span>{{ photo.title }}</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 能力介绍模块：概括服务方向与技能标签。 -->
    <section class="page-section practice">
      <div class="practice__intro">
        <SectionHeading
          eyebrow="Practice"
          title="把前端工程、内容节奏和摄影视角压进同一块画布"
          description="我更偏好让页面先有氛围、主次和叙事，再落回组件、性能与交互细节。这样作品集看起来会更像一个完整品牌，而不是一组孤立页面。"
        />
      </div>

      <div class="practice__content">
        <article v-for="(item, index) in serviceHighlights" :key="item">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ item }}</p>
        </article>

        <div class="practice__tags">
          <span v-for="tag in skillTags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </section>

    <!-- 精选项目模块：强调代表性案例与辅助案例。 -->
    <section v-if="leadProject" class="page-section work-poster">
      <div class="work-poster__header">
        <SectionHeading
          eyebrow="Featured Work"
          title="不是把项目排成网格，而是先给最有代表性的作品留出舞台"
          description="首页只推一组主项目与少量补充案例，强调完成度、角色定位和技术判断，避免第一屏就变成普通作品卡片墙。"
        />
        <RouterLink class="text-link" to="/portfolio">See all projects</RouterLink>
      </div>

      <article class="work-poster__feature">
        <div class="work-poster__media">
          <img :src="leadProject.image" :alt="leadProject.imageAlt" loading="lazy" />
        </div>

        <div class="work-poster__body">
          <p class="work-poster__meta">{{ leadProject.year }} / {{ leadProject.role }}</p>
          <h3>{{ leadProject.title }}</h3>
          <p>{{ leadProject.summary }}</p>

          <ul class="work-poster__stack">
            <li v-for="item in leadProject.stack" :key="item">{{ item }}</li>
          </ul>

          <div class="work-poster__actions">
            <a class="button button--primary" :href="leadProject.demoUrl" target="_blank" rel="noreferrer">
              Live Preview
            </a>
            <a class="button button--secondary" :href="leadProject.githubUrl" target="_blank" rel="noreferrer">
              Source
            </a>
          </div>
        </div>
      </article>

      <div v-if="supportingProjects.length" class="work-poster__rail">
        <article v-for="project in supportingProjects" :key="project.id">
          <p>{{ project.year }} / {{ project.role }}</p>
          <h4>{{ project.title }}</h4>
          <span>{{ project.summary }}</span>
        </article>
      </div>
    </section>

    <!-- 摄影故事模块：在首页预览部分摄影内容。 -->
    <section class="page-section photo-story">
      <div class="photo-story__header">
        <SectionHeading
          eyebrow="Photography"
          title="让摄影不是附属栏目，而是整站视觉节奏的一部分"
          description="这一段用 sticky 文案和更开放的图像排布，把摄影内容作为叙事材料嵌回首页。"
        />
        <RouterLink class="text-link" to="/photography">Open gallery</RouterLink>
      </div>

      <div class="photo-story__body">
        <div class="photo-story__sticky">
          <p>{{ profile.statement }}</p>

          <div class="photo-story__socials">
            <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noreferrer">
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="photo-story__grid">
          <article
            v-for="photo in featuredPhotos"
            :key="photo.id"
            :class="['photo-story__item', `photo-story__item--${photo.ratio}`]"
          >
            <img :src="photo.image" :alt="photo.imageAlt" loading="lazy" />
            <div class="photo-story__caption">
              <span>{{ photo.category }} / {{ photo.location }}</span>
              <strong>{{ photo.title }}</strong>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 联系模块：集中提供邮件、电话与社交入口。 -->
    <section id="contact" class="page-section contact-banner">
      <p class="eyebrow">Contact</p>
      <h2>{{ profile.availability }}</h2>
      <p class="contact-banner__text">{{ profile.statement }}</p>

      <div class="contact-banner__actions">
        <a class="button button--primary" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a class="button button--secondary" :href="profile.phoneHref">{{ profile.phone }}</a>
      </div>

      <div class="contact-banner__socials">
        <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noreferrer">
          {{ link.label }}
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 首页整体分区节奏。 */
.home-page {
  display: grid;
  gap: 0.5rem;
}

/* 首屏视觉与文案布局。 */
.hero {
  position: relative;
  display: grid;
  min-height: calc(100svh - 7rem);
  overflow: hidden;
}

.hero__media,
.hero__scrim {
  position: absolute;
  inset: 0;
}

.hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__scrim {
  background:
    linear-gradient(90deg, rgba(15, 10, 7, 0.84) 0%, rgba(15, 10, 7, 0.58) 34%, rgba(15, 10, 7, 0.16) 100%),
    linear-gradient(180deg, rgba(15, 10, 7, 0.18) 0%, rgba(15, 10, 7, 0.4) 100%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.75fr);
  gap: 2rem;
  align-items: end;
  width: min(100% - 2rem, var(--content-max-width));
  padding: 7rem 0 2.5rem;
  margin: 0 auto;
  color: var(--color-inverse);
}

.hero__copy {
  display: grid;
  gap: 1rem;
  align-self: center;
  max-width: 38rem;
}

.hero__brand {
  font-size: 0.86rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 8rem);
  line-height: 0.88;
}

.hero__role {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero__intro {
  max-width: 34rem;
  color: rgba(255, 248, 239, 0.82);
  font-size: 1.04rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  padding-top: 0.4rem;
}

.hero__facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  padding-top: 1.2rem;
}

.hero__facts div {
  display: grid;
  gap: 0.2rem;
  padding-top: 0.9rem;
  border-top: 1px solid rgba(255, 248, 239, 0.24);
}

.hero__facts dt {
  color: rgba(255, 248, 239, 0.66);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__facts dd {
  font-size: 1.65rem;
  font-weight: 600;
}

.hero__rail {
  display: grid;
  gap: 1rem;
  justify-self: end;
  width: min(100%, 19rem);
}

.hero__rail > p {
  color: rgba(255, 248, 239, 0.72);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__strip {
  display: grid;
  gap: 0.8rem;
}

.hero__strip article {
  display: grid;
  gap: 0.55rem;
}

.hero__strip img {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 1.5rem;
  object-fit: cover;
  border: 1px solid rgba(255, 248, 239, 0.22);
}

.hero__strip span {
  color: rgba(255, 248, 239, 0.9);
  font-size: 0.92rem;
}

/* 首页正文三大内容分区的共用栅格节奏。 */
.practice,
.work-poster,
.photo-story {
  display: grid;
  gap: 1.8rem;
}

.practice {
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  align-items: start;
}

.practice__content {
  display: grid;
  gap: 1rem;
}

.practice__content article {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.practice__content span {
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.practice__content p {
  color: var(--color-heading);
  font-size: 1.02rem;
}

.practice__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding-top: 1rem;
}

.practice__tags span,
.photo-story__socials a,
.contact-banner__socials a {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.6rem 0.88rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(255, 250, 243, 0.52);
  color: var(--color-heading);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.work-poster__header,
.photo-story__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.work-poster__feature {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 1.6rem;
  align-items: center;
}

.work-poster__media {
  overflow: hidden;
  min-height: 420px;
  border-radius: 2.2rem;
  box-shadow: var(--shadow-deep);
}

.work-poster__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.work-poster__feature:hover .work-poster__media img {
  transform: scale(1.03);
}

.work-poster__body {
  display: grid;
  gap: 1rem;
  padding: 1.2rem 0;
}

.work-poster__meta {
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.work-poster__body h3 {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  line-height: 0.94;
}

.work-poster__body p:not(.work-poster__meta) {
  color: var(--color-text-muted);
}

.work-poster__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding: 0;
  list-style: none;
}

.work-poster__stack li {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0.52rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.48);
  font-size: 0.78rem;
  font-weight: 600;
}

.work-poster__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  padding-top: 0.5rem;
}

.work-poster__rail {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.work-poster__rail article {
  display: grid;
  gap: 0.6rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.work-poster__rail p {
  color: var(--color-accent);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.work-poster__rail h4 {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 0.98;
}

.work-poster__rail span,
.photo-story__sticky p,
.contact-banner__text {
  color: var(--color-text-muted);
}

.photo-story__body {
  display: grid;
  grid-template-columns: minmax(260px, 0.72fr) minmax(0, 1.28fr);
  gap: 1.5rem;
}

.photo-story__sticky {
  position: sticky;
  top: 7rem;
  display: grid;
  gap: 1.25rem;
  align-content: start;
}

.photo-story__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.photo-story__grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.photo-story__item {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  box-shadow: var(--shadow-soft);
}

.photo-story__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}

.photo-story__item:hover img {
  transform: scale(1.04);
  filter: saturate(1.06);
}

.photo-story__item--portrait {
  grid-column: span 4;
  aspect-ratio: 3 / 4;
}

.photo-story__item--landscape {
  grid-column: span 8;
  aspect-ratio: 16 / 11;
}

.photo-story__caption {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  gap: 0.3rem;
  padding: 1.1rem;
  color: var(--color-inverse);
  background: linear-gradient(180deg, transparent, rgba(15, 10, 7, 0.72));
}

.photo-story__caption span {
  color: rgba(255, 248, 239, 0.74);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.photo-story__caption strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 0.96;
}

.contact-banner {
  display: grid;
  gap: 1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid rgba(255, 250, 243, 0.72);
  border-radius: 2.5rem;
  background:
    radial-gradient(circle at top right, rgba(180, 91, 49, 0.08), transparent 24%),
    rgba(255, 250, 243, 0.66);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

.contact-banner h2 {
  max-width: 18ch;
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5vw, 4.6rem);
  line-height: 0.92;
}

.contact-banner__actions,
.contact-banner__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

/* 平板及以下统一切换成单列布局。 */
@media (max-width: 1080px) {
  .hero__inner,
  .practice,
  .work-poster__feature,
  .photo-story__body {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .hero__inner {
    align-items: start;
    padding-top: 6rem;
  }

  .hero__rail {
    justify-self: start;
    width: min(100%, 32rem);
  }

  .hero__strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .photo-story__sticky {
    position: static;
  }
}

/* 手机尺寸下进一步压缩网格并把图片列表改为单列。 */
@media (max-width: 720px) {
  .hero__inner {
    width: min(100% - 1.25rem, var(--content-max-width));
    padding-bottom: 1.5rem;
  }

  .hero__facts,
  .work-poster__rail,
  .hero__strip,
  .photo-story__grid {
    grid-template-columns: 1fr;
  }

  .work-poster__header,
  .photo-story__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .photo-story__item--portrait,
  .photo-story__item--landscape {
    grid-column: span 1;
  }

  .photo-story__item--landscape {
    aspect-ratio: 4 / 3;
  }
}
</style>
