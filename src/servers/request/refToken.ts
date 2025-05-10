import { getToken, setRefToken, setToken } from '@/config/env';
import { useUserStore } from '@/store/';

export default class tokenMange {
  private queueList: ((token: string) => void)[] = [];
  private rejectList: (() => void)[] = [];
  private isLock = false;
  public async getToken(): Promise<string> {
    console.log();
    const { token, exp } = getToken();
    if (Date.now() > exp) return await this.queueMange();
    else return token!;
  }
  private queueMange(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.queueList.push(resolve);
      this.rejectList.push(reject);
      if (this.isLock) return;
      this.isLock = true;
      this.refToken()
        .then((token) => {
          this.clearQueue(token);
        })
        .catch(() => this.clearFail())
        .finally(() => (this.isLock = false));
    });
  }
  private async clearQueue(token: string) {
    let cb: ((token: string) => void) | undefined;
    while ((cb = this.queueList.shift())) {
      cb(token);
    }
  }
  private clearFail() {
    let cb: (() => void) | undefined;
    while ((cb = this.rejectList.shift())) {
      cb();
    }
  }
  private async refToken(): Promise<string> {
    const data = await useUserStore().refreshToken();
    setToken(data.access_token);
    setRefToken(data.refresh_token);
    return data.access_token;
  }
}
