<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Register">Register</router-link>
    </div>
    <div class="text-top">
      <h3>Welcome to User-API front-end!</h3>
      <p>If you liked it, don't forget to give a star in the Github repository!</p>
      <a class="btn btn-primary" href="https://github.com/victorsouza19/user-api" target="_blank">API repository</a>
      <a class="btn btn-outline-primary" href="https://github.com/victorsouza19/user-api-frontend" target="_blank">Front-end repository</a>
    </div>
    
    <img src="../assets/welcome.svg" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

img{
  margin-top: 10%;
  max-width: 60%;
}

p{
  font-weight: 600;
}

.text-top a + a{
  margin-left: 1rem;
}
  
#nav {
  padding: 1rem;
  margin-bottom: 10%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active,
p{
  color: #007bff;
}
</style>