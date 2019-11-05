import Vue from "vue";
import AppComponent from "./App/App.vue";

Vue.component("app-component", AppComponent);

import {
  Card,
  Button,
  Table,
  TableColumn,
  Form,
  FormItem,
  Input
} from 'element-ui';

Vue.use(Card);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);

new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});