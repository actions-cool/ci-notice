# 😱 CI 通知 ( Translation help )

[简体中文](./README.md) | English

![](https://img.shields.io/github/actions/workflow/status/actions-cool/ci-notice/test.yml?style=flat-square)
[![](https://img.shields.io/badge/marketplace-ci-notice-blueviolet?style=flat-square)](https://github.com/marketplace/actions/ci-notice)
[![](https://img.shields.io/github/v/release/actions-cool/ci-notice?style=flat-square&color=orange)](https://github.com/actions-cool/ci-notice/releases)

## 🏞 预览

当前提供 2 种提醒方式。

- 钉钉群通知

- Issue

https://github.com/actions-cool/ci-notice/issues/3

## 🚀 如果使用？

> 你可以参照当前项目的例子来使用：https://github.com/actions-cool/ci-notice/blob/main/.github/workflows/ci-notice.yml
>
> 触发条件根据需要设置，不支持 `pull_request_target`

```yml
name: CI Notice

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@main

      - uses: actions-cool/ci-notice@v1
        with:
          ci: |
            npm install
            npm run build
          notice-types: 'dingding, issue'
          dingding-token: ${{ secrets.DINGDING_TOKEN }}
          issue-labels: 'x1, x2'
          issue-assignees: 'people1, people2'
```

### Inputs

| 名称 | 描述 | 必填 |
| -- | -- | -- |
| token | GitHub token。如果不传，即为默认 token。 | ✖ |
| ci | 需要执行的命令 | ✖ |
| notice-types | 通知类型，可单独，也可两者都通知。 | ✖ |
| dingding-token | 钉钉群机器人 Token。 | ✖ |
| notice-title | 通知标题，预览中为默认。 | ✖ |
| notice-body | 通知内容，预览中为默认。 | ✖ |
| issue-labels | 为新开的 Issue 增加标签。 | ✖ |
| issue-assignees | 为新开的 Issue 增加指定人。 | ✖ |

- `ci`：默认为 `install & build`
- `dingding-token`: 在仓库 secrets 中设置，若不会使用，可在 Issue 提问或加钉钉群提问。

### outputs

输出结果 `result`，根据结果可自定义操作。

## ⚡ 反馈

欢迎你来尝试使用，并提出意见，你可以通过以下方式：

- 通过 [Issue](https://github.com/actions-cool/ci-notice/issues) 报告 bug 或进行咨询
- 提交 [Pull Request](https://github.com/actions-cool/ci-notice/pulls) 改进 `ci-notice` 的代码

也欢迎加入 钉钉交流群

![](https://github.com/actions-cool/resources/blob/main/dingding.jpeg?raw=true)

## 更新日志

[CHANGELOG](./CHANGELOG.md)

## LICENSE

[MIT](./LICENSE)
