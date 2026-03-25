<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PhotoLightbox from "@/components/PhotoLightbox.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import { photos } from "@/data/siteContent";

/* 摄影页支持按作品分类筛选。 */

const allCategoryLabel = "全部";

const selectedCategory = ref(allCategoryLabel);
const activePhotoId = ref<string | null>(null);

/* 根据作品数据动态生成分类选项。 */

const categoryOptions = computed(() => [
  allCategoryLabel,
  ...new Set(photos.map((photo) => photo.category)),
]);

/* 按当前分类过滤可见作品。 */

const visiblePhotos = computed(() =>
  photos.filter(
    (photo) =>
      selectedCategory.value === allCategoryLabel ||
      photo.category === selectedCategory.value,
  ),
);

/* 灯箱依赖当前可见列表中的索引做上一张/下一张切换。 */

const activePhotoIndex = computed(() =>
  visiblePhotos.value.findIndex((photo) => photo.id === activePhotoId.value),
);

const activePhoto = computed(() =>
  activePhotoIndex.value >= 0
    ? (visiblePhotos.value[activePhotoIndex.value] ?? null)
    : null,
);

/* 当筛选条件变化导致当前作品不再可见时，自动关闭灯箱。 */

watch(visiblePhotos, (currentPhotos) => {
  if (
    activePhotoId.value &&
    !currentPhotos.some((photo) => photo.id === activePhotoId.value)
  ) {
    activePhotoId.value = null;
  }
});

/* 打开灯箱并记录当前作品 id。 */

const openLightbox = (photoId: string) => {
  activePhotoId.value = photoId;
};

/* 关闭灯箱。 */

const closeLightbox = () => {
  activePhotoId.value = null;
};

/* 切换到当前可见列表中的上一张作品。 */

const showPrevious = () => {
  if (activePhotoIndex.value > 0) {
    const previousPhoto = visiblePhotos.value[activePhotoIndex.value - 1];

    if (previousPhoto) {
      activePhotoId.value = previousPhoto.id;
    }
  }
};

/* 切换到当前可见列表中的下一张作品。 */

const showNext = () => {
  if (
    activePhotoIndex.value >= 0 &&
    activePhotoIndex.value < visiblePhotos.value.length - 1
  ) {
    const nextPhoto = visiblePhotos.value[activePhotoIndex.value + 1];

    if (nextPhoto) {
      activePhotoId.value = nextPhoto.id;
    }
  }
};
</script>

<template>
  <!-- 摄影页标题与当前可见作品数量。 -->
  <section class="page-intro page-section photography-hero">
    <div class="photography-hero__head">
      <SectionHeading
        eyebrow="Photography"
        title="让图像先把气氛定下来，再让浏览行为自然跟上"
        description="摄影页保留筛选与放大查看，但布局改得更像展陈墙，减少工具面板的存在感。"
      />
      <p class="photography-hero__count">
        {{ visiblePhotos.length }} frames visible
      </p>
    </div>
  </section>

  <!-- 侧边分类筛选与瀑布式作品网格。 -->
  <section class="page-section photography-layout">
    <aside class="photography-filters">
      <span class="photography-filters__label">Browse by type</span>
      <div class="photography-filters__chips">
        <button
          v-for="category in categoryOptions"
          :key="category"
          type="button"
          :class="[
            'filter-chip',
            { 'filter-chip--active': selectedCategory === category },
          ]"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </aside>

    <div class="photo-grid">
      <button
        v-for="photo in visiblePhotos"
        :key="photo.id"
        type="button"
        :class="['photo-tile', `photo-tile--${photo.ratio}`]"
        @click="openLightbox(photo.id)"
      >
        <img :src="photo.image" :alt="photo.imageAlt" loading="lazy" />
        <span class="photo-tile__overlay">
          <span class="photo-tile__meta"
            >{{ photo.category }} / {{ photo.location }} /
            {{ photo.year }}</span
          >
          <strong>{{ photo.title }}</strong>
        </span>
      </button>
    </div>
  </section>

  <PhotoLightbox
    :photo="activePhoto"
    :has-previous="activePhotoIndex > 0"
    :has-next="
      activePhotoIndex >= 0 && activePhotoIndex < visiblePhotos.length - 1
    "
    @close="closeLightbox"
    @previous="showPrevious"
    @next="showNext"
  />
</template>

<style scoped>
/* 摄影页头部与筛选布局。 */
.photography-hero__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.photography-hero__count {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
}

.photography-layout {
  display: grid;
  grid-template-columns: minmax(220px, 0.32fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.photography-filters {
  position: sticky;
  top: 7rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.photography-filters__label {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.photography-filters__chips {
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

/* 作品网格与卡片交互效果。 */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.photo-tile {
  display: block;
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 2rem;
  box-shadow: var(--shadow-soft);
  text-align: left;
}

.photo-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.45s ease,
    filter 0.45s ease;
}

.photo-tile:hover img {
  transform: scale(1.04);
  filter: saturate(1.07);
}

.photo-tile__overlay {
  position: absolute;
  inset: auto 0 0;
  display: grid;
  gap: 0.32rem;
  padding: 1.1rem;
  color: var(--color-inverse);
  background: linear-gradient(180deg, transparent, rgba(15, 10, 7, 0.78));
}

.photo-tile__meta {
  color: rgba(255, 248, 239, 0.72);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.photo-tile strong {
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 0.96;
}

.photo-tile--portrait {
  grid-column: span 4;
  aspect-ratio: 3 / 4;
}

.photo-tile--landscape {
  grid-column: span 8;
  aspect-ratio: 16 / 11;
}

/* 平板尺寸下让筛选区脱离吸附布局。 */
@media (max-width: 980px) {
  .photography-hero__head,
  .photography-layout {
    grid-template-columns: 1fr;
    display: grid;
  }

  .photography-filters {
    position: static;
  }
}

/* 手机尺寸下作品卡片统一改为单列。 */
@media (max-width: 720px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }

  .photo-tile--portrait,
  .photo-tile--landscape {
    grid-column: span 1;
  }

  .photo-tile--landscape {
    aspect-ratio: 4 / 3;
  }
}
</style>
