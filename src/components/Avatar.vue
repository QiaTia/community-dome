<template>
  <view
    :style="{
      width: sizePx + 'vw',
      height: sizePx + 'vw',
      borderRadius,
      overflow: 'true',
      ...customStyle,
    }"
    :class="['avatar-wrap flex-algin', showImg || 'bg-color-primary']"
  >
    <img data-key="notExistSrc" v-if="showImg" mode="image" :src="avatarUrl!" />
    <text v-else :style="{ fontSize: `${sizePx / 2}vw` }" class="fs-34 color-white fw-600">{{ surname }}</text>
  </view>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/store';
  import { px2vw } from '@/utils/utils';
  import { computed, CSSProperties, PropType } from 'vue';
  const $prop = defineProps({
    name: String,
    avatar: String,
    size: {
      type: Number,
      default: 36,
    },
    borderRadius: {
      type: String,
      default: '50%',
    },
    customStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    /** 优先展示姓 */
    showName: Boolean,
    /** 其他人 -> 不取当前用户 */
    other: Boolean,
  });
  const defaultInfo = { real_name: '', avatar: '' };
  const User = useUserStore();
  const userInfo = computed<typeof defaultInfo>(() => ($prop.other ? defaultInfo : User.userInfo ?? defaultInfo)),
    surname = computed(() => ($prop.name || userInfo.value.real_name).trimStart?.()[0] || ($prop.name || userInfo.value.real_name)[0]),
    /** 传入姓名 -> 优先取传入 */
    avatarUrl = computed(() => ($prop.name ? $prop.avatar : userInfo.value.avatar)),
    showImg = computed(() => !($prop.showName && !$prop.avatar) && avatarUrl.value),
    sizePx = computed(() => px2vw($prop.size));
</script>
<style scoped lang="scss">
  .avatar-wrap {
    overflow: hidden;
    img {
      width: 100%;
    }
  }
</style>
