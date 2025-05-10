<template>
  <CustomHeader @changePath="onRefresh" />
  <div ref="waterfallContainerRef" class="waterfall-container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- <van-list v-model:loading="isLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ContentItem v-for="item in pageList" :key="item" :item="item" />
      </van-list> -->
      <waterfall-container :container-ref="waterfallContainerRef" ref="waterfallContainer" :request="fetchList" :request-size="12" :column="2" :gap="0">
        <template #item="{ item }">
          <!-- @vue-ignore -->
          <ContentItem :item="item" />
        </template>
      </waterfall-container>
      <!-- <v3-waterfall :heightHook="computedHeight" scrollBodySelector=".waterfall-container" :list="pageList" :colWidth="280" :virtual-time="400" :isMounted="isMounted" :isLoading="isLoading" :isOver="isFinished" class="waterfall" @scrollReachBottom="getNext">
        <template #default="{ item }">
          <ContentItem :item="item" />
        </template>
      </v3-waterfall> -->
    </van-pull-refresh>
  </div>
  <van-back-top bottom="10vh" />
  <!-- 底部导航栏 -->
  <CustomFooter />
</template>

<script setup lang="ts">
  import WaterfallContainer from './components/waterfall-container.vue';
  import CustomHeader from './components/custom-header.vue';
  import CustomFooter from './components/custom-footer.vue';
  import ContentItem from './components/content-item.vue';
  import { ref } from 'vue';
  import { computedHeight } from './components/tool';
  import { getFeedListData } from '@/servers/feed';

  function* getRandomS() {
    let i = 1;
    while (true) {
      yield i++ % 5;
    }
  }
  const randomSGenerator = getRandomS();
  const randomS = ref(randomSGenerator.next().value as number);
  const refreshing = ref(false);
  const waterfallContainer = ref<InstanceType<typeof WaterfallContainer> | null>(null);
  const waterfallContainerRef = ref<HTMLDivElement | null>(null);
  // const visibleItems = computed(() => pageList.value.slice(0, page.value * 10));

  async function fetchList(currentPage: number) {
    // 模拟API请求
    const { data } = await getFeedListData(currentPage, randomS.value);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // items.value.push(...generateMockData());
    const list = data.data.map((item) => {
      return {
        ...item,
        id: item.resId,
        width: 50,
        height: computedHeight(item),
      };
    });
    return { list, total: data.count };
  }

  async function onRefresh() {
    refreshing.value = true;
    randomS.value = randomSGenerator.next().value as number;
    // 模拟API请求
    // await new Promise((resolve) => setTimeout(resolve, 500));
    await waterfallContainer.value?.reset();
    refreshing.value = false;
  }
</script>
<style lang="scss" scoped>
  .waterfall-container {
    height: calc(100vh - 100px);
    overflow-y: auto;
  }
</style>
