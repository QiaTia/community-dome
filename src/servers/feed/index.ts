import Request from '../request/';

const http = new Request(`/`);

/** 数据获取接口
 * @param page 页码
 * @param s 排序方式 0 - 4
 */
export const getFeedListData = (page: number, s: number) =>
  http.get<API.PageResult<API.feed.ContentItem>>('feed', {
    params: {
      page,
      s,
    },
  });
