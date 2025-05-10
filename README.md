# Chagee-Mobile H5页面脚手架
   
   `Vue 3` + `TypeScript` + `Vite`
   
### 推荐工具
建议使用[VS code](https://code.visualstudio.com/)作为开发工具, 安装插件[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). 遵循项目配置的Eslint规则进行开发.
   
推荐使用`pnpm`安装依赖, [pnpm](https://pnpm.io/) 是一个快速、节省磁盘空间的`node_modules`依赖管理工具.

### 快速开始
项目配置`.env.development`
```sh
# 只在开发环境加载
VITE_USER_NODE_ENV = development
#应用名称
VITE_APP_NAME = "茶姬H5-Dome"
# 环境域名配置
VITE_PROXY_URL = https://testbw.bwcj.cn/
# 启动端口
VITE_PORT = 8000
```
本项目隐藏了很多配置文件, 如需修改可以使用终端或者在VScode中`command + p`, 然后输入`settings.json`关闭隐藏文件.

### 项目调试

在VScode中切换到左侧`run an Debug`图标, 先选择`Run Project`, 然后运行`Debug Edge`即可.

如需更改配置, `command + p`, 然后输入`launch.json`自行更改配置.
