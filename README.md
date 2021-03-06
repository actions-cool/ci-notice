# ð± CI éç¥

ç®ä½ä¸­æ | [English](./README.en-US.md)

![](https://img.shields.io/github/workflow/status/actions-cool/ci-notice/CI?style=flat-square)
[![](https://img.shields.io/badge/marketplace-ci--notice-blueviolet?style=flat-square)](https://github.com/marketplace/actions/ci-notice)
[![](https://img.shields.io/github/v/release/actions-cool/ci-notice?style=flat-square&color=orange)](https://github.com/actions-cool/ci-notice/releases)

## ð é¢è§

å½åæä¾ 2 ç§æéæ¹å¼ã

- ééç¾¤éç¥

- Issue

https://github.com/actions-cool/ci-notice/issues/3

## ð å¦ä½ä½¿ç¨ï¼

> ä½ å¯ä»¥åç§å½åé¡¹ç®çä¾å­æ¥ä½¿ç¨ï¼https://github.com/actions-cool/ci-notice/blob/main/.github/workflows/ci-notice.yml
>
> è§¦åæ¡ä»¶æ ¹æ®éè¦è®¾ç½®ï¼ä¸æ¯æ `pull_request_target`

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

| åç§° | æè¿° | å¿å¡« |
| -- | -- | -- |
| token | GitHub tokenãå¦æä¸ä¼ ï¼å³ä¸ºé»è®¤ tokenã | â |
| ci | éè¦æ§è¡çå½ä»¤ | â |
| notice-types | éç¥ç±»åï¼å¯åç¬ï¼ä¹å¯ä¸¤èé½éç¥ã | â |
| dingding-token | ééç¾¤æºå¨äºº Tokenã | â |
| notice-title | éç¥æ é¢ï¼é¢è§ä¸­ä¸ºé»è®¤ã | â |
| notice-body | éç¥åå®¹ï¼é¢è§ä¸­ä¸ºé»è®¤ã | â |
| issue-labels | ä¸ºæ°å¼ç Issue å¢å æ ç­¾ã | â |
| issue-assignees | ä¸ºæ°å¼ç Issue å¢å æå®äººã | â |

- `ci`ï¼é»è®¤ä¸º `install & build`
- `dingding-token`: å¨ä»åº secrets ä¸­è®¾ç½®ï¼è¥ä¸ä¼ä½¿ç¨ï¼å¯å¨ Issue æé®æå ééç¾¤æé®ã

### outputs

è¾åºç»æ `result`ï¼`success` æè `failed`ï¼å¯èªå®ä¹ç»ææä½ã

## â¡ åé¦

æ¬¢è¿ä½ æ¥å°è¯ä½¿ç¨ï¼å¹¶æåºæè§ï¼ä½ å¯ä»¥éè¿ä»¥ä¸æ¹å¼ï¼

- éè¿ [Issue](https://github.com/actions-cool/ci-notice/issues) æ¥å bug æè¿è¡å¨è¯¢
- æäº¤ [Pull Request](https://github.com/actions-cool/ci-notice/pulls) æ¹è¿ `ci-notice` çä»£ç 

ä¹æ¬¢è¿å å¥ ééäº¤æµç¾¤

![](https://github.com/actions-cool/resources/blob/main/dingding.jpeg?raw=true)

## æ´æ°æ¥å¿

[CHANGELOG](./CHANGELOG.md)

## LICENSE

[MIT](./LICENSE)
