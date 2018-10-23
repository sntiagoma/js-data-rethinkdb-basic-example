<template>
  <p> {{hi}} world!</p>
</template>

<script lang="ts">
import Vue from 'vue'
export default {
  data(){
    return {
      hi: "Hello!"
    }
  }
}
</script>

<style lang="scss" scoped>
  p {
    color: red;
  }
</style>


