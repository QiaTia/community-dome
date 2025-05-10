import { Loading } from '@/utils/utils';
import type { ToastWrapperInstance } from 'vant/lib/toast/types';

class LoadStatus {
  list: string[] = [];
  load?: ToastWrapperInstance;
  push(url: string, showMask: boolean) {
    if (this.list.length == 0) this.open(showMask);
    this.list.push(url);
  }
  delete() {
    setTimeout(() => {
      this.list.shift();
      if (this.list.length == 0) this.close();
    }, 100);
  }
  private open(showMask = false) {
    this.load = Loading(void 0, showMask);
  }
  private close() {
    this.load?.close();
  }
}
export default new LoadStatus();
