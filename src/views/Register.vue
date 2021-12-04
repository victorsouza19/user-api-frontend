<template>
  <b-container class="form-page">
    <h2>Register form</h2>
    
    <div v-if="error != undefined">
      <p class="errMsg">
        <b-icon  class="me-1" icon="exclamation-circle-fill"></b-icon>
        {{error}}
        </p>
    </div>

    <b-form-group
      label="Name"
      label-for="input-1" 
      class="form-input">
      <b-form-input v-model="name" placeholder="John Doe"></b-form-input>
    </b-form-group>

     <b-form-group
      label="E-mail *"
      class="form-input">
      <b-form-input type="email" v-model="email" placeholder="johndoe@mail.com"></b-form-input>
    </b-form-group>

     <b-form-group
      label="Password *"
      class="form-input">
      <b-form-input type="password" v-model="password" placeholder="******"></b-form-input>
    </b-form-group>

    <b-form-group label="Role" class="form-input" v-slot="{ rolevalue }">
      <b-form-radio value="1" v-model="selected" :aria-describedby="rolevalue" name="role" class="form-option"><span>Admin</span></b-form-radio>
      <b-form-radio value="0" v-model="selected" :aria-describedby="rolevalue" name="role"  class="form-option"><span>User</span></b-form-radio>
    </b-form-group>
    

    <b-button variant="primary" class="w-100 mt-3" @click="register">Register</b-button>

    <div class="img">
      <img id="img-top" src="../assets/register.svg" alt="friends">
    </div>
    

  </b-container>
</template>

<script>
  import axios from 'axios';

export default {

 data(){
   return{
     selected: '0',
     name: '',
     email: '',
     password: '',
     role: '',
     error: undefined
   }
 },
 methods: {
   register(){
     this.role = this.selected;

     axios.post('http://localhost:8001/users', {
        name: this.name, 
        email: this.email,
        password: this.password, 
        role: this.role
     }).then(res => {
       console.log(res);
       this.$router.push({name: 'Home'});

     }).catch(err => {
      let errmsg = err.response.data.err;
      this.error = errmsg;

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