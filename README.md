## 專案說明

1.解決 cors 問題：首先到 https://cors-anywhere.herokuapp.com/corsdemo 點選 request temporary access button。 2.主頁點選 login now 後登入 github 取得權限，進入 issues management 主列表頁。 3.主列表頁搜尋/篩選/排序/新增 issues(task)
4.task 詳細頁面可修改 task 內容/刪除 task/close 視同刪除 task，另有連結鍵可直接連結到該 github repo 頁面查看更完整資訊。

使用 api:
(1) GET https://github.com/login/oauth/authorize
(2) POST https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token
(3) GET https://api.github.com/issues
(4) issues 相關 api：
https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28
(5)cat 圖片引用出處：https://zh.pngtree.com/

## 如何啟動專案

新增一個 .env file，內容可參考 .env.example，詳細 secret 再麻煩聯絡作者拿取

```
REACT_APP_GITHUB_CLIENT_ID=
REACT_APP_GITHUB_CLIENT_SECRET=
```

安裝依賴

```
$ npm install // 使用 node 14 版本
```

啟動 react

```
$ npm run start
```
