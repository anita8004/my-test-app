# my-test-app
測試第三方登入及其他新技術的專案

## env
node 18.18.0

## skill
- vue 3.3.4
- vant 4.7.1
- pinia 2.1.6
- typescript v5
- sass
- vue3-google-login 2.0.24

## document

google第三方登入實作(https://hackmd.io/@anita-paradise/r1O0zyAfT)
facebook第三方登入實作(https://hackmd.io/@anita-paradise/r1BFVAg7a)

## 在codeSandBox使用
！！因為codeSandBox的網址每次開啟不一定會一樣，如果網址變更會導致第三方登入功能沒有作用！！
1. 可以將main.js中的google_client_id以及plugins/fbapi/index中的appId替換成自己的憑證
2. 然後將codeSandBox右邊範例的網址添加到google和facebook的設定中

google: “已授權的 JavaScript 來源”及“已授權的重新導向 URI”
facebook: 應用程式設定>基本資料&使用案例>自訂>設定