import Vue from "vue";

import { ValidationProvider, ValidationObserver } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

const requireComponent = require.context("src/core", true, /App[\w-]+\.vue$/);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  let componentName = fileName.replace(/^\.\//, "").replace(/\.\w+$/, "");
  componentName = componentName.match(/[^\/]+$/)[0];
  Vue.component(componentName, componentConfig.default || componentConfig);
});
