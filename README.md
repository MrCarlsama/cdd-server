# cdd-server

声优图床服务

基于Nest.js构建的后端服务

数据库：Mysql

试运行网址：https://daredemodaisuki.cn

## Description

前端项目：https://github.com/MrCarlsama/cdd-admin

- [x] 基础声优图床展示
- [x] 声优信息平假名常用名对照表
- [x] 一键D爆图包（导出）
- [ ] 开放注册登录及个人中心
- [ ] 异步导出页面
- [x] 随机图片测试页
- [ ] 对照表API测试页

后端服务：https://github.com/MrCarlsama/cdd-server

- [x] 基础声优图床增删改查
- [x] 自动匹配图片所属标签
- [x] 一键D爆图包（导出）
- [ ] 异步导出功能
- [x] 一键随机图片API接口
- [ ] 对照表API接口
- [ ] 定时任务爬虫队列

数据爬虫：https://github.com/MrCarlsama/node-cdd-creeper

- [x] 基于微博个人主页爬虫
- [ ] 基于推特个人主页爬虫
- [ ] 基于Ins个人主页爬虫


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
