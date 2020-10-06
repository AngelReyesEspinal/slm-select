<script>
import Vue from 'vue';
import SlmSelect from '@/slm-select.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SlmSelect
  }
});
</script>

<template>
  <div id="app">
    <slm-select/>
  </div>
</template>
