<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import { aboutTimeline, profile, serviceHighlights, skillTags, socialLinks } from '@/data/siteContent'
</script>

<template>
  <div class="about-page">
    <!-- 头部模块：简介与直接联系方式并列展示。 -->
    <section class="page-intro page-section about-hero">
      <div class="about-hero__copy">
        <SectionHeading
          eyebrow="About"
          title="个人介绍、合作方式和联系入口都放在同一张清晰的版面里"
          description="这一页延续首页的 editorial 视觉，但语气更直接，适合在投递、接案或个人品牌官网场景里使用。"
        />
        <p class="about-hero__lead">{{ profile.intro }}</p>
      </div>

      <div class="about-contact">
        <p class="eyebrow">Direct Contact</p>
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        <a :href="profile.phoneHref">{{ profile.phone }}</a>
        <p>{{ profile.location }}</p>

        <div class="about-contact__socials">
          <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noreferrer">
            {{ link.label }}
          </a>
        </div>
      </div>
    </section>

    <!-- 内容模块：陈述、关注点、方法论与工具栈。 -->
    <section class="page-section about-layout">
      <article class="about-block about-block--statement">
        <p class="eyebrow">Profile</p>
        <h2>{{ profile.name }}</h2>
        <p>{{ profile.statement }}</p>
      </article>

      <article class="about-block">
        <p class="eyebrow">Focus</p>
        <ul class="about-list">
          <li v-for="item in serviceHighlights" :key="item">{{ item }}</li>
        </ul>
      </article>

      <article class="about-block about-block--timeline">
        <p class="eyebrow">Approach</p>
        <div class="about-timeline">
          <article v-for="item in aboutTimeline" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        </div>
      </article>

      <article class="about-block">
        <p class="eyebrow">Toolkit</p>
        <div class="about-tags">
          <span v-for="tag in skillTags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
/* 关于页整体布局。 */
.about-page {
  display: grid;
}

/* 头部区域采用双列排布。 */
.about-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.65fr);
  gap: 1.8rem;
  align-items: start;
}

.about-hero__copy {
  display: grid;
  gap: 1.2rem;
}

.about-hero__lead {
  max-width: 34rem;
  color: var(--color-text-muted);
}

.about-contact,
.about-block {
  display: grid;
  gap: 1rem;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid rgba(255, 250, 243, 0.72);
  border-radius: 2rem;
  background: rgba(255, 250, 243, 0.66);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px);
}

/* 联系方式标签与工具标签的胶囊风格。 */
.about-contact a,
.about-contact > p:not(.eyebrow) {
  color: var(--color-heading);
  font-size: 1.02rem;
}

.about-contact > p:not(.eyebrow):last-of-type {
  color: var(--color-text-muted);
}

.about-contact__socials,
.about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.about-contact__socials a,
.about-tags span {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.6rem 0.88rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.54);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.about-layout {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.2rem;
}

/* 内容卡片在桌面端使用不同宽度形成节奏变化。 */
.about-block {
  grid-column: span 5;
}

.about-block--statement,
.about-block--timeline {
  grid-column: span 7;
}

.about-block h2,
.about-block h3 {
  color: var(--color-heading);
  font-family: var(--font-display);
  line-height: 0.96;
}

.about-block h2 {
  font-size: clamp(2.8rem, 5vw, 4.6rem);
}

.about-block h3 {
  font-size: 2rem;
}

.about-block p:not(.eyebrow),
.about-list li,
.about-timeline p {
  color: var(--color-text-muted);
}

.about-list,
.about-timeline {
  display: grid;
  gap: 1rem;
}

.about-list {
  padding-left: 1.2rem;
}

.about-timeline article {
  display: grid;
  gap: 0.55rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

/* 窄屏下统一改为单列。 */
@media (max-width: 980px) {
  .about-hero {
    grid-template-columns: 1fr;
  }

  .about-block,
  .about-block--statement,
  .about-block--timeline {
    grid-column: span 12;
  }
}
</style>
