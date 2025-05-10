<template>
  <header class="custom-header flex-between">
    <nav class="custom-header__nav flex-row">
      <router-link v-for="item in navList" :key="item.name" :class="{ 'custom-header__link': true, active: currentPath == item.path }" :to="item.path">{{ item.name }}</router-link>
    </nav>
    <!-- <div class="custom-header__icons flex-row">
      <Icons icon="search" />
      <Icons icon="message" />
    </div> -->
  </header>
  <div class="custom-header__seat"></div>
</template>

<script lang="ts" setup>
  // import { Icon } from 'vant';
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const currentPath = computed(() => route.path);
  const $emit = defineEmits<{
    (e: 'changePath', path: string): void;
  }>();
  const navList = [
    { name: '发现', path: '/home' },
    { name: '游戏圈', path: '/game' },
  ];
  watch(currentPath, (path) => {
    $emit('changePath', path);
  });
  // ...
</script>

<style lang="scss" scoped>
  .custom-header {
    align-items: center;
    color: var(--text-primary-color);
    background-color: white;
    z-index: 9;
    position: fixed;
    top: 0;
    &__seat,
    & {
      height: 40px;
      width: 100%;
    }
    // box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
    &__link {
      padding: 0 15px;
      text-decoration: none;
      color: inherit;
      font-size: 1.2rem;
      font-size: 14px;
      position: relative;
      &.active {
        font-weight: bold;
        color: var(--color-primary);
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 15px;
          width: calc(100% - 30px);
          height: 8px;
          opacity: 0.5;
          border-radius: 4px;
          background-size: 100% 100%;
          background-image: linear-gradient(45deg, white, var(--van-primary-color));
        }
      }
    }
    &__icons {
      padding: 0 15px;
    }
  }
</style>
