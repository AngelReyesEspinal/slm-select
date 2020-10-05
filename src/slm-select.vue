<script>
import Vue from 'vue';
import FlagIcon from 'vue-flag-icon';
Vue.use(FlagIcon);

export default Vue.extend({
  name: 'SlmSelect',
  props: ['applicationServer', 
  'applicationCode', 
  'width', 
  'height', 
  'background', 
  'color', 
  'border', 
  'bold', 
  'fontSize', 
  'flagSize', 
  'flagMR', 
  'flagML', 
  'fromSpain'],
  data() {
    return {
      langs: ['Cargando...'],
      currentLang: ''
    };
  },
  mounted() {
    fetch(`${this.applicationServer}/api/Applications/GetLanguagesKeyByApplicationCode/${this.applicationCode}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.langs = data;
        this.currentLang = this.langs[0].key;
      });
  },
  computed: {
    flagStyle() {
      const width = this.flagSize ? `width: ${this.flagSize}px;` : 'width: 20px;';
      const marginRight = this.flagMR ? `margin-right: ${this.flagMR}px;` : 'margin-right: 5px;';
      const marginLeft = this.flagML ? `margin-left: ${this.flagML}px;` : 'margin-left: 5px;';
      const style = width + " " + marginRight + " " + marginLeft; 
      return style
    },
    parentStyle() {
      const background = this.background ? `background: ${this.background};` : 'background: white;';
      const width = this.width ? `width: ${this.width}em;` : 'width: 10em;';
      const height = this.height ? `height: ${this.height}em; line-height: ${this.height};` : 'height: 2em; line-height: 2;';
      const border = this.border ? `border: ${this.border}px solid black;` : 'border:0!important;';
      const style = width + " " + height + " " + border + " " + background; 
      return style
    },
    selectStyle() {
      const background = this.background ? `background: ${this.background};` : 'background: white;';
      const color = this.color ? `color: ${this.color};` : 'color: black;';
      const bold = this.bold ? `font-weight: bold;` : '';
      const fontSize = this.fontSize ? `font-size: ${this.fontSize}px;` : 'font-size: 1.1em;';
      const style = color + " " + background  + " " + bold + " " + fontSize; 
      return style
    }
  },
  methods: {
    changeLocale(event) {
      const key = event.target.value;
      this.currentLang = key;
      this.$emit(key);
    }
  },
});
</script>

<template>
  <div class="select" :style="this.parentStyle">
    <flag :style="flagStyle" :iso="currentLang === 'es' && !fromSpain ? 'do' : currentLang" /> 
    <select :style="this.selectStyle" name="format" id="format" @change="changeLocale($event)">
      <option v-for="lang in langs" :key="`Lang${lang.id}`" :value="lang.key"> <div> <flag iso="do" /> </div>  {{ lang.name }} </option>
    </select>
  </div>
</template>

<style scoped>
select {
  -webkit-appearance:none;
  -moz-appearance:none;
  -ms-appearance:none;
  appearance:none;
  outline:0;
  box-shadow:none;
  background-image: none;
  flex: 1;
  padding: 0 .5em;
  cursor:pointer;
  font-family: 'Open Sans', sans-serif;
  border-radius: 10px;
  border:0!important;
}
select::-ms-expand {
  display: none;
}
.select {
  position: relative;
  display: flex;
  overflow: hidden;
  border-radius: .25em;
}
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.5em;
  cursor:pointer;
  pointer-events:none;
  transition:.25s all ease;
}
.select:hover::after {
  color: #636e72;
}
</style>
