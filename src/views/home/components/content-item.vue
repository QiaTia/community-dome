<template>
  <article class="content-item">
    <div class="content-item__cover" @click="onCover">
      <template v-if="blockType == 'video'">
        <img data-key="cover" :src="coverInfo.video.cover" alt="videoContent" />
        <img class="content-item__cover_player" src="https://website-static-ali-01.233leyuan.com/v_11f1b05a-2f3b-4b12-b6f6-a0ca831786f4_1746695949720/play.Z89YX7O0.png" alt="player" />
      </template>
      <img v-else-if="blockType == 'img'" :src="coverInfo.img.url" alt="imgContent" />
      <img v-else :src="''" alt="Content" />
    </div>
    <h3 class="content-item__title">{{ item.title }}</h3>
    <span class="content-item__desc">{{ item.gameCircleName }}</span>
    <div class="flex-between content-item__footer">
      <div class="flex-algin">
        <Avatar :size="17" :name="item.uname" :avatar="item.uportrait" />
        <span class="uname">{{ item.uname }}</span>
      </div>
      <button class="el-btn btn-text" @click.stop="like">
        <Icons icon="liked" />
        <span class="like-count">{{ item.likeCount }}</span>
      </button>
      <!-- <button @click.stop="comment">💬 {{ item.commentCount }}</button> -->
    </div>
  </article>
  <van-overlay :teleport="$el" :z-index="100" :show="showVideo" @click="closeOver">
    <div v-if="blockType == 'video'" class="content-item__video-wrapper flex-algin">
      <video autoplay :muted="isMobile" ref="videoRef" class="block" controls :src="coverInfo.video.url" @click.stop></video>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
  import Avatar from '@/components/Avatar.vue';
  import Icons from './icons.vue';
  import { computed, ref } from 'vue';
import { Toast } from '@/utils/utils';
  const props = defineProps<{
    item: API.feed.ContentItem;
  }>();
  const showVideo = ref(false);
  const videoRef = ref<HTMLVideoElement | null>(null);
  const coverInfo = computed(() => (JSON.parse(props.item.content) as any[]).find((item) => ['img', 'video'].includes(item.blockType)));
  const $el = document.body;

  const isMobile = computed(() => {
    const userAgent = navigator.userAgent;
    return /Android|iPhone|iPad|iPod/i.test(userAgent);
  });

  const blockType = computed(() => coverInfo.value.blockType);

  function toggleVideo(isPlay = false) {
    const video = videoRef.value;
    if (video) {
      isPlay ? video.play() : video.pause();
    }
  }

  function like() {
    // 更新点赞逻辑
  }
  // 封面点击事件
  function onCover() {
    // 打开评论弹窗
    if (blockType.value == 'video') {
      showVideo.value = true;
      toggleVideo(true);
      if (isMobile.value) {
        Toast('移动设备已禁音播放，如需声音请手动开启！');
      }
    }
  }
  // 关闭弹窗
  function closeOver() {
    showVideo.value = false;
    toggleVideo();
  }
</script>
<style scoped lang="scss">
  .content-item {
    width: 50vw;
    box-sizing: border-box;
    // height: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    font-size: 12px;
    cursor: pointer;
    &__cover {
      width: 100%;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
      &_player {
        position: absolute;
        right: 8px;
        top: 8px;
        width: 16px !important;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        // text-shadow: rgba(0, 0, 0, 0.5);
      }
      img {
        width: 100%;
      }
    }
    &__video-wrapper {
      height: 100%;
      width: 100%;
      video {
        max-width: 94%;
        max-height: 70%;
      }
    }
    &__title {
      font-size: 14px;
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical; /* 内容垂直排列 */
      -webkit-line-clamp: 2; /* 限制显示行数 */
      overflow: hidden; /* 超出内容隐藏 */
      text-overflow: ellipsis; /* 添加省略号 */
    }
    &__desc {
      color: #999;
    }
    &__footer {
      &:deep(.custom-icon) {
        font-size: 15px;
      }
      span {
        margin-left: 4px;
      }
      .uname {
        overflow: hidden;
        max-width: 24vw;
        display: inline-block;
        white-space: nowrap;
      }
    }
  }
</style>
