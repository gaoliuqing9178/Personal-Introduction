<script setup lang="ts">
/* 通用区块标题组件，统一小标题、主标题和描述的排版。 */

defineProps<{
  eyebrow: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="section-heading">
    <p class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-heading__title">{{ title }}</h2>
    <p class="section-heading__description">{{ description }}</p>
  </div>
</template>

<style scoped>
/* 通用区块标题样式。 */
.section-heading {
  display: grid;
  gap: 0.9rem;
  max-width: 44rem;
}

.section-heading__eyebrow {
  color: var(--color-accent);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.section-heading__title {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 4.4rem);
  line-height: 0.95;
}

.section-heading__description {
  max-width: 36rem;
  color: var(--color-text-muted);
  font-size: 1rem;
}

/* 小屏下压缩主标题字号。 */
@media (max-width: 720px) {
  .section-heading__title {
    font-size: clamp(2rem, 10vw, 3rem);
  }
}
</style>
