<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { profile, socialLinks } from '@/data/siteContent'

/* 页脚版权年份使用当前系统年份动态生成。 */

const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="site-shell">
    <!-- 背景光斑用于增强整站氛围。 -->
    <div class="site-shell__wash site-shell__wash--one"></div>
    <div class="site-shell__wash site-shell__wash--two"></div>

    <!-- 顶部导航承载品牌、主导航和联系入口。 -->
    <header class="site-header">
      <div class="site-header__inner">
        <RouterLink class="brand" to="/">
          <span class="brand__mark">LC</span>
          <span class="brand__text">
            <strong>{{ profile.brand }}</strong>
            <small>{{ profile.role }}</small>
          </span>
        </RouterLink>

        <nav class="site-nav" aria-label="Primary">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/portfolio">Portfolio</RouterLink>
          <RouterLink to="/photography">Photography</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>

        <a class="header-cta button button--primary" :href="`mailto:${profile.email}`">Start a Project</a>
      </div>
    </header>

    <!-- 主内容由当前路由页面渲染。 -->
    <main class="site-main">
      <RouterView />
    </main>

    <!-- 页脚统一展示个人信息和外部链接。 -->
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__lead">
          <p class="eyebrow">LENS / CODE</p>
          <h2>{{ profile.name }}</h2>
          <p>{{ profile.intro }}</p>
        </div>

        <div class="site-footer__meta">
          <div>
            <span>Base</span>
            <strong>{{ profile.location }}</strong>
          </div>
          <div>
            <span>Contact</span>
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          </div>
          <div>
            <span>Availability</span>
            <strong>{{ profile.availability }}</strong>
          </div>
        </div>

        <div class="site-footer__links">
          <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noreferrer">
            {{ link.label }}
          </a>
        </div>

        <p class="site-footer__copyright">© {{ currentYear }} {{ profile.brand }}. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 应用外壳与背景氛围。 */
.site-shell {
  position: relative;
  overflow: clip;
}

.site-shell__wash {
  position: fixed;
  z-index: -1;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.52;
  pointer-events: none;
}

.site-shell__wash--one {
  top: 5rem;
  right: -6rem;
  width: 24rem;
  height: 24rem;
  background: rgba(180, 91, 49, 0.26);
}

.site-shell__wash--two {
  bottom: 4rem;
  left: -8rem;
  width: 28rem;
  height: 28rem;
  background: rgba(255, 255, 255, 0.3);
}

/* 顶部导航区域。 */
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding: 1rem 0;
}

.site-header__inner,
.site-footer__inner {
  width: min(100% - 2rem, var(--content-max-width));
  margin: 0 auto;
}

.site-header__inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(255, 250, 243, 0.65);
  border-radius: 999px;
  background: rgba(255, 250, 243, 0.62);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow-soft);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  color: var(--color-heading);
}

.brand__mark {
  display: grid;
  place-items: center;
  width: 2.85rem;
  height: 2.85rem;
  border: 1px solid rgba(24, 17, 11, 0.12);
  border-radius: 50%;
  background: rgba(255, 250, 243, 0.8);
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1;
}

.brand__text {
  display: grid;
  gap: 0.08rem;
}

.brand__text strong {
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.brand__text small {
  color: var(--color-text-muted);
  font-size: 0.82rem;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.site-nav a {
  position: relative;
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.site-nav a::after {
  content: '';
  position: absolute;
  inset: auto 0.95rem 0.45rem;
  height: 1px;
  background: currentColor;
  opacity: 0;
  transform: scaleX(0.35);
  transform-origin: center;
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}

.site-nav a:hover,
.site-nav a.router-link-exact-active {
  color: var(--color-heading);
}

.site-nav a:hover::after,
.site-nav a.router-link-exact-active::after {
  opacity: 1;
  transform: scaleX(1);
}

.header-cta {
  white-space: nowrap;
}

/* 主内容与页脚布局。 */
.site-main {
  display: grid;
  gap: 1rem;
}

.site-footer {
  padding: 3rem 0 3.5rem;
}

.site-footer__inner {
  display: grid;
  gap: 1.8rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border: 1px solid rgba(255, 250, 243, 0.72);
  border-radius: 2.5rem;
  background: rgba(255, 250, 243, 0.68);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

.site-footer__lead {
  display: grid;
  gap: 0.8rem;
  max-width: 36rem;
}

.site-footer__lead h2 {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 0.92;
}

.site-footer__lead p:not(.eyebrow) {
  color: var(--color-text-muted);
}

.site-footer__meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.site-footer__meta div {
  display: grid;
  gap: 0.3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.site-footer__meta span {
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.site-footer__meta strong,
.site-footer__meta a {
  color: var(--color-heading);
  font-size: 1rem;
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.site-footer__links a {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 0.65rem 0.95rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.46);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__copyright {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

/* 中屏以下将头部与页脚改为更松散的纵向排列。 */
@media (max-width: 1080px) {
  .site-header__inner {
    grid-template-columns: 1fr;
    justify-items: start;
    border-radius: 2rem;
  }

  .site-nav {
    justify-content: flex-start;
  }

  .header-cta {
    width: 100%;
  }

  .site-footer__meta {
    grid-template-columns: 1fr;
  }
}

/* 手机尺寸下进一步收紧横向留白。 */
@media (max-width: 720px) {
  .site-header {
    padding-top: 0.75rem;
  }

  .site-header__inner,
  .site-footer__inner {
    width: min(100% - 1.25rem, var(--content-max-width));
  }

  .site-nav {
    gap: 0.25rem;
  }

  .site-nav a {
    padding-inline: 0.75rem;
  }

  .site-footer {
    padding-top: 2rem;
  }
}
</style>
