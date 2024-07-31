import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { registerLicense } from "@syncfusion/ej2-base";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(Toast, {
  timeout: 5000, //Persist toast message
  closeOnClick: true,
  position: POSITION.TOP_RIGHT,
});

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2U1hhQlJBfVddX2RWfFN0QXNcdVtyflFOcC0sT3RfQFljTnxbdkBmXH9ZeHNWRA==",
);
app.mount("#app");
