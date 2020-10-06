// Import vue component
import component, { useSlmAdapter } from '@/slm-select.vue';

// install function executed by Vue.use()
const install = function installSlmSelect(Vue, { applicationServer, applicationCode, fallbackLocale, loadOnMount = true }) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('SlmSelect', component);
  console.log(applicationServer)
  useSlmAdapter(Vue, applicationServer, applicationCode, fallbackLocale, loadOnMount)
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

if ('false' === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
}

component.install = install;

export default component;