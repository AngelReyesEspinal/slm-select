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
    <slm-select 
      border="1"
      applicationServer="https://localhost:44301" 
      applicationCode="20e0bee7-954a-46f9-b113-19f48c943f16"
    />
  </div>
</template>
