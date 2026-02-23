import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import api from "./api";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Validate existing token on app startup so production doesn't treat stale tokens as authenticated
const authStore = useAuthStore(pinia);

if (authStore.token) {
  api.get("/jobs").catch(() => {
    authStore.clearToken();
  });
}

app.mount("#app");
