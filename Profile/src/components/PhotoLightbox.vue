<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import type { PhotoItem } from '@/data/siteContent'

/* 灯箱接收当前作品，以及是否存在前后项的状态。 */

const props = defineProps<{
  photo: PhotoItem | null
  hasPrevious: boolean
  hasNext: boolean
}>()

/* 将关闭与翻页行为向父组件抛出。 */

const emit = defineEmits<{
  close: []
  previous: []
  next: []
}>()

/* 支持键盘快捷键关闭灯箱或切换图片。 */

const handleKeydown = (event: KeyboardEvent) => {
  if (!props.photo) {
    return
  }

  if (event.key === 'Escape') {
    emit('close')
  }

  if (event.key === 'ArrowLeft' && props.hasPrevious) {
    emit('previous')
  }

  if (event.key === 'ArrowRight' && props.hasNext) {
    emit('next')
  }
}

watch(
  () => props.photo,
  (photo) => {
    /* 灯箱打开时锁定页面滚动，关闭后恢复。 */

    document.body.style.overflow = photo ? 'hidden' : ''
  },
  { immediate: true },
)

onMounted(() => {
  /* 组件挂载后监听全局键盘事件。 */

  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  /* 组件卸载时清理页面状态与事件监听。 */

  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <transition name="lightbox">
      <!-- 点击遮罩关闭灯箱，点击面板内部不触发关闭。 -->
      <div v-if="photo" class="lightbox" @click="emit('close')">
        <div class="lightbox__backdrop"></div>

        <div class="lightbox__panel" @click.stop>
          <button class="lightbox__close" type="button" aria-label="Close lightbox" @click="emit('close')">
            Close
          </button>

          <button
            v-if="hasPrevious"
            class="lightbox__nav lightbox__nav--prev"
            type="button"
            aria-label="Previous photo"
            @click="emit('previous')"
          >
            Prev
          </button>

          <button
            v-if="hasNext"
            class="lightbox__nav lightbox__nav--next"
            type="button"
            aria-label="Next photo"
            @click="emit('next')"
          >
            Next
          </button>

          <div class="lightbox__image-wrap">
            <img :src="photo.image" :alt="photo.imageAlt" />
          </div>

          <div class="lightbox__caption">
            <div>
              <p class="lightbox__meta">{{ photo.category }} / {{ photo.location }} / {{ photo.year }}</p>
              <h3>{{ photo.title }}</h3>
            </div>
            <p>{{ photo.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* 灯箱显隐过渡。 */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* 灯箱基础布局与遮罩。 */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 1.25rem;
}

.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(20, 15, 10, 0.72);
  backdrop-filter: blur(18px);
}

.lightbox__panel {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
  width: min(100%, 1120px);
  max-height: calc(100vh - 2.5rem);
  padding: 1rem;
  border: 1px solid rgba(255, 250, 243, 0.44);
  border-radius: 2rem;
  background: rgba(255, 250, 243, 0.9);
  box-shadow: var(--shadow-deep);
  backdrop-filter: blur(22px);
}

/* 图片容器与说明区。 */
.lightbox__image-wrap {
  overflow: hidden;
  border-radius: 1.5rem;
  background: rgba(24, 17, 11, 0.08);
}

.lightbox__image-wrap img {
  display: block;
  width: 100%;
  max-height: calc(100vh - 16rem);
  object-fit: contain;
}

.lightbox__caption {
  display: grid;
  gap: 0.5rem;
  padding: 0 0.25rem 0.15rem;
}

.lightbox__meta {
  color: var(--color-accent);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lightbox__caption h3 {
  color: var(--color-heading);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 0.95;
}

.lightbox__caption p:last-child {
  color: var(--color-text-muted);
}

/* 关闭与翻页按钮。 */
.lightbox__close,
.lightbox__nav {
  position: absolute;
  z-index: 2;
  min-height: 42px;
  padding: 0.68rem 0.95rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-heading);
  background: rgba(255, 250, 243, 0.74);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.lightbox__close {
  top: 1.2rem;
  right: 1.2rem;
}

.lightbox__nav {
  top: 50%;
  transform: translateY(-50%);
}

.lightbox__nav--prev {
  left: 1.2rem;
}

.lightbox__nav--next {
  right: 1.2rem;
}

/* 小屏下把翻页按钮移到底部，避免遮挡图片。 */
@media (max-width: 900px) {
  .lightbox__panel {
    padding-top: 4.3rem;
  }

  .lightbox__nav {
    top: auto;
    bottom: 1rem;
    transform: none;
  }

  .lightbox__nav--prev {
    left: 1rem;
  }

  .lightbox__nav--next {
    right: 1rem;
  }
}
</style>
