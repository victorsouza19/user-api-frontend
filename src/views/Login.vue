<template>
  <b-container class="form-page">
    <h2>Login</h2>
    
    <div v-if="error != undefined">
      <p class="errMsg">
        <b-icon  class="me-1" icon="exclamation-circle-fill"></b-icon>
        {{error}}
        </p>
    </div>

     <b-form-group
      label="E-mail"
      class="form-input">
      <b-form-input type="email" v-model="email" placeholder="johndoe@mail.com"></b-form-input>
    </b-form-group>

     <b-form-group
      label="Password"
      class="form-input">
      <b-form-input type="password" v-model="password" placeholder="******"></b-form-input>
    </b-form-group>

    <b-button variant="primary" class="w-100 mt-3" @click="login">Login</b-button>

    <div class="img">
      <img id="img-top" src="../assets/login.svg" alt="login-img">
    </div>
    

  </b-container>
</template>

<script>
  import axios from 'axios';

export default {
  data(){
    return{
      email: '',
      password: '',
      role: '',
      error: undefined
    }
  },
  methods: {
    login(){
      axios.post("http://localhost:8001/login", {
        email: this.email, 
        password: this.password
      }).then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        this.$router.push({name: 'Home'});

      }).catch(err =>{
        this.error = err.response.data.err;
        console.log(err.response);
      });
    }
  }
}
</script>

<style scoped>
  #img-top{
    max-height: 40%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;

    margin: 0 2rem 0.5rem 0;
  }

  .form-page h2{
    margin: 2rem auto;
    font-weight: 600;
  }

  .errMsg{
    background: #f91f43;
    border-radius: 1rem;
    padding: 0.5rem;
    font-weight: 600;
    color: white;
  }

  .form-input{
    text-align: left;
    margin: 1rem 0;
  }

  .form-option span{
    padding-left: 0.5rem;
  }

  .form-option + .form-option{
    margin-top: 0.3rem;
  }


</style>