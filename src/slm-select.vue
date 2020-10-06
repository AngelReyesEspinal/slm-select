<script>
let i18n = null;
const fetchLanguage = (languageCode) => {
  const applicationCode = localStorage.getItem('sx-application-code');
  const applicationServer = localStorage.getItem('sx-application-server');
  return fetch(`${applicationServer}/api/Applications/GetLanguageByApplicationCodeAndLanguageKey/${applicationCode}/${languageCode}`);
}
const setLanguage = (languageCode) => {
  if (localStorage.getItem(`locale-${languageCode}`)) {
    const locales = JSON.parse(localStorage.getItem(`locale-${languageCode}`));
    setLocaleMessage(languageCode, locales);
  } else {
    fetchLanguage(languageCode)
      .then(response => response.json())
      .then(data => {
        setLocaleMessage(languageCode, data);
        localStorage.setItem(`locale-${languageCode}`, JSON.stringify(data));
      });
  }
}
const setLocaleMessage = (languageCode, locales) => {
  const messages = {
    [languageCode]: locales
  };
  i18n.locale = languageCode;
  i18n.setLocaleMessage(languageCode, messages[languageCode]);
}
const useSlmAdapter = (Vue, applicationServer, applicationCode, fallbackLocale, loadOnMount = true) => {
  console.log(applicationServer)
  Vue.use(VueI18n);
  localStorage.setItem('sx-application-code', applicationCode);
  localStorage.setItem('sx-application-server', applicationServer);
  i18n = new VueI18n({
    locale: fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: {},
  });
  if (loadOnMount) {
    setLanguage(fallbackLocale);
  }
  Vue.filter("sx-translate", (value) => !value ? '' : i18n.t(value));
}

import Vue from 'vue';
import VueI18n from "vue-i18n"
import FlagIcon from 'vue-flag-icon';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Multiselect from 'vue-multiselect';

Vue.use(FlagIcon);
Vue.component('multiselect', Multiselect);

export default Vue.extend({
  components: { Multiselect },
  name: 'slm-select',
  props: [
  // Select properties
  'selectLabel',
  'deselectLabel',
  'selectedLabel',
  'showLabels',
  'openDirection',
  'noOptions',
  'noResult',
  'placeholder',
  
  'width', 
  'height', 
  'color', 
  'bold', 
  'fontSize', 
  
  // Flag properties
  'flagSize', 
  'flagMR', 
  'flagML', 
  'fromSpain'
  ],
  data() {
    return {
      value: null,
      langs: [],
      loading: false
    };
  },
  mounted() {
    this.loading = true;
    const applicationCode = localStorage.getItem('sx-application-code');
    const applicationServer = localStorage.getItem('sx-application-server');
    if (applicationCode && applicationServer) {
      fetch(`${applicationServer}/api/Applications/GetLanguagesKeyByApplicationCode/${applicationCode}`)
        .then(response => response.json())
        .then(data => {
          this.langs = data;
          this.value = this.langs[0];
          this.loading = false;
        });
    } else {
      this.loading = false;
      console.log('Asegurese de haber suministrado el applicationServer y el applicationCode');
    }
  },
  computed: {
    hasSelectedSlot () {
      return !!this.$slots['selectedSlot']
    },
    hasOptionSlot () {
      return !!this.$slots['optionSlot']
    },
    _selectLabel() {
      return this.selectLabel ? this.selectLabel : 'Seleccionar';
    },
    _deselectLabel() {
      return this.deselectLabel ? this.deselectLabel : 'Remover';
    },
    _selectedLabel() {
      return this.selectedLabel ? this.selectedLabel : 'Seleccionado';
    },
    _showLabels() {
      return this.showLabels !== undefined ? this.showLabels : true;
    },
    _openDirection() {
      return this.openDirection ? this.openDirection : '';
    },
    _noOptions() {
      return this.noOptions ? this.noOptions : 'No hay datos';
    },
    _noResult() {
      return this.noResult ? this.noResult : 'No hay resultados';
    },
    _placeholder() {
      return this.placeholder ? this.placeholder : 'Seleccione'
    },
    flagStyle() {
      const size = this.flagSize ? `width: ${this.flagSize}px; height: ${this.flagSize}px;` : 'width:  20px; height:  20px;';
      const marginRight = this.flagMR ? `margin-right: ${this.flagMR}px;` : 'margin-right: 10px;';
      const marginLeft = this.flagML ? `margin-left: ${this.flagML}px;` : 'margin-left: 5px;';
      const style = size + " " + marginRight + " " + marginLeft; 
      return style;
    },
    textStyle() {
      const width = this.width ? `width: ${this.width}em;` : '';
      const height = this.height ? `height: ${this.height}em; line-height: ${this.height};` : '';
      const color = this.color ? `color: ${this.color};` : 'color: black;';
      const bold = this.bold ? `font-weight: bold;` : '';
      const fontSize = this.fontSize ? `font-size: ${this.fontSize}px;` : 'font-size: 1.1em;';
      const style = width + " " + height  + " " + bold + " " + fontSize + " " + color;
      return style;
    }
  },
  methods: {
    onSelect(language) {
      console.log(setLanguage)
      setLanguage(language.key)
      //this.$emit('languageKey', language.key)
    }
  },
});

export { useSlmAdapter }
</script>

<template>
  <multiselect 
    :selectLabel="_selectLabel"
    :deselectLabel="_deselectLabel"
    :selectedLabel="_selectedLabel"
    :showLabels="_showLabels"
    :openDirection="_openDirection"
    :placeholder="_placeholder"
    v-model="value" 
    :options="langs"
    :loading="loading"
    @select="onSelect">

    <template slot="singleLabel" slot-scope="props">
      <slot v-if="hasSelectedSlot" name="selectedSlot"></slot>
      <div v-else class="align-vertical-center">
        <flag :style="flagStyle" :iso="props.option.key === 'es' && !fromSpain ? 'do' : props.option.key" />
        <span :style="textStyle"> {{ props.option.name }} </span>
      </div>
    </template>
    
    <template slot="option" slot-scope="props">
      <slot v-if="hasOptionSlot" name="optionSlot"></slot>
      <div v-else class="align-vertical-center">
        <flag :style="flagStyle" :iso="props.option.key === 'es' && !fromSpain ? 'do' : props.option.key" />
        <span :style="textStyle"> {{ props.option.name }} </span>
      </div>
    </template>
    
    <span slot="noOptions">{{ _noOptions }}</span>
    <span slot="noResult">{{ _noResult }}</span>
  </multiselect>
</template>

<style scoped>
.align-vertical-center {
  display: flex; 
  align-items:center;
}
</style>
