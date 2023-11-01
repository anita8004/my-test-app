import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/style/main.scss";
import App from "./App.vue";
import useVant from "@/plugins/vant";
import router from "@/router";
import GAuth2 from "@/plugins/gapi";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
useVant(app);
const google_client_id =
  "952327172004-nlgseih6hkf8sm96ju4njh2j22ibuj5f.apps.googleusercontent.com";
app.use(GAuth2, {
  clientId: google_client_id,
});
app.mount("#app");
