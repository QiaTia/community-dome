<template>
  <div class="list-white flex-column">
    <img src="@/assets/images/list-white.png" class="list-white-img" alt="list-white" />
    <p class="list-white-text">{{ text }}</p>
  </div>
</template>
<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      default: '暂无数据！',
    },
  });
</script>

<style lang="scss" scoped></style>
