declare namespace API {
  type RequestResult<T, R = {}> = {
    data: T;
    code?: number;
    msg?: string | null;
  } & R;
  type PageResult<T = unknown> = {
    /** 分页数据 */
    data: T[];
    /** 所有条目 */
    count: number;
  };
  type PageRequest = {
    current?: number;
    size?: number;
  };
  /** 登录接口返回的用户信息 */
  type CurrentUser = {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    tenant_id: string;
    user_name: string;
    real_name: string;
    avatar: string;
    client_id: string;
    role_name: string;
    office_id: string;
    license: string;
    post_id: string;
    user_id: string;
    role_id: string;
    group_id: string;
    phone: string;
    nick_name: string;
    oauth_id: string;
    detail: { type: string };
    dept_id: string;
    account: string;
    jti: string;
  };
  namespace feed {
    interface UserInfo {
      nickname: string;
      portrait: string;
      portraitZoom: string;
      origin: string;
    }
    interface ContentItem {
      resId: string;
      uid: string;
      uname: string;
      uportrait: string;
      likeCount: number;
      clickCount: number;
      commentCount: number;
      createTime: number;
      lastDiscussionTime: number;
      title: string;
      content: string;
      gameCircleId: string;
      gameCircleName: string;
      essence: boolean;
      userInfo: UserInfo;
      topCommentList: any;
      pack: string;
      opinion: number;
      visible: string;
    }
  }
}
