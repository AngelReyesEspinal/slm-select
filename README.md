# 📖 Implementation

Copy the following code in the entry point of your application for example: **main.ts** or **main.js**.

```sh
import 'slm-select/dist/slm-select.min.css'
import SlmSelect from 'slm-select'

Vue.use(SlmSelect, {
  applicationServer: 'the server of the SLM API from where your are trying to get the translations',
  applicationCode: 'your application code',
  fallbackLocale: 'your default locale',
  loadOnMount: 'by default is true'
})
```

Your entry point should look like this:

```sh
import Vue from 'vue'
import App from './App.vue'
import 'slm-select/dist/slm-select.min.css'
import SlmSelect from 'slm-select'

Vue.config.productionTip = false

Vue.use(SlmSelect, {
  applicationServer: 'the server of the SLM API from where your are trying to get the translations',
  applicationCode: 'your application code',
  fallbackLocale: 'your default locale'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
```

# 🔥 Usage

In your vue template you need to put your key and label as you specified in **SLM** and the filter sx-translate

```sh
<template>
  <div>
    <p>{{ "placeholder.value" | sx-translate }}</p>
  </div>
</template>
```

To change the language globally, just add the slm-select component where you want

```sh
<template>
  <div>
    <slm-select/>
  </div>
</template>
```
