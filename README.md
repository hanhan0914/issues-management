## 專案說明
串接 github API 管理被assign的task(也就是github上的issues視為task)
，列出所有assign到的task資訊，可進一步點進內頁瀏覽詳細資料；另有搜尋欄位快速查找task，也可以新建一個task（預設assign給自己）。
希望這個專案能夠方便大家查詢在github上被分派到要處理的所有issues!
---

#### 1.主頁點選 login now 
<img width="1392" alt="image" src="https://github.com/hanhan0914/issues-management/assets/91658568/5ac077d6-e9ce-4bab-beb2-97d846cb412b">

#### 2.進入登入 github 取得權限頁面 > loading畫面
<img width="494" alt="image" src="https://github.com/hanhan0914/issues-management/assets/91658568/5ca029d4-72f2-4e3f-8194-326fd62791f9">

#### 3.主列表頁
##### 紅線框：搜尋欄位 及 task list
##### 藍線框：依task標籤篩選filter、依時間排序鍵、新增issues按鈕
<img width="1351" alt="image" src="https://github.com/hanhan0914/issues-management/assets/91658568/4772b663-f795-42bd-af1c-243237ee10ea">

#### 4.詳細資訊頁面
##### 可瀏覽task資訊、修改內容、刪除task
##### 另有連結鍵可直接連結到該 github repo 頁面查看更完整資訊。
![image](https://github.com/hanhan0914/issues-management/assets/91658568/7ef41741-c7c5-4c0d-87d6-2b16f4f38261)
---

#### 使用 api:
(1) GET https://github.com/login/oauth/authorize
(2) POST https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token
(3) GET https://api.github.com/issues
(4) issues 相關 api：
https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28
(5)圖片引用出處：
https://www.freepik.com/free-vector/creative-elements-storyboard-concept_10359594.htm#query=painted%20task&position=16&from_view=search&track=ais

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
