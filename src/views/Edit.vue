<template>
  <b-container class="form-page">
    <h2>Edit User</h2>
    
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

    <b-form-group label="Role" class="form-input" v-slot="{ rolevalue }">
      <b-form-radio value="1" v-model="selected" :aria-describedby="rolevalue" name="role" class="form-option"><span>Admin</span></b-form-radio>
      <b-form-radio value="0" v-model="selected" :aria-describedby="rolevalue" name="role"  class="form-option"><span>User</span></b-form-radio>
    </b-form-group>
    

    <b-button variant="primary" class="w-100 mt-3" @click="update">Edit</b-button>

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
    selected: '',
    name: '',
    email: '',
    role: '',
    id: -1,
    error: undefined,
    req: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }
   }
 },
 methods: {
   update(){
     this.role = this.selected;

     axios.put(`http://localhost:8001/users/${this.id}`, {
        name: this.name, 
        email: this.email,
        role: this.role
     }, this.req).then(res => {
       console.log(res);
       this.$router.push({name: 'Users'});

     }).catch(err => {
       console.log(err.response);
      let errmsg = err.response.data.err;
      this.error = errmsg;

     });
   }
 },
 created(){
   axios.get(`http://localhost:8001/users/${this.$route.params.id}`, this.req).then(res => {
     this.name = res.data.user.name;
     this.email = res.data.user.email;
     this.selected = res.data.user.role;
     this.role = res.data.user.role;
     this.id = res.data.user.id;

   }).catch(err => {
     console.log(err.response.data);
     this.$router.push({name: 'Users'});
   })
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