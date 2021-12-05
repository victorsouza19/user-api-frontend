<template>
  <div>
    <img src="../assets/403.jpg" alt="unauthorized-img">
    <div class="info">
      <h3>This page is only accessible to administrators!</h3>
      <router-link class="btn btn-primary" to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  img{
    max-width: 80vw;
  }

</style>