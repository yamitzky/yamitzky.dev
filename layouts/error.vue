<template>
  <div>
    <template v-if="error.statusCode === 404">
      <h1>Not found?</h1>
      <p>$ <a href="/">cd /</a></p>
    </template>
    <template v-else>
      <h1>{{ error.message }}</h1>
    </template>
  </div>
</template>
<script>
export default {
  props: ['error'],
  head () {
    return {
      title: this.error.message
    }
  }
}
</script>
