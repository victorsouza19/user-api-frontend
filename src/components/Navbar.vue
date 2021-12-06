<template>
   <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/admin/users">Admin</router-link> |
        <router-link to="/Register">Register</router-link> |
        <router-link v-if="isLogged" to="/logout">Logout</router-link>
        <router-link v-else to="/login">Login</router-link>  
    </div>
</template>

<script>
export default {
  data(){
    return{
      isLogged: false
    }  
  },
  created(){
    let token = localStorage.getItem('token');

    if(token != undefined){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
  }
}
</script>

<style scoped>
#nav {
  padding: 1rem;
  margin-bottom: 5%;
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