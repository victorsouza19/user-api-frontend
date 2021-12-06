<template>
  <div>
    <b-container>
      <h1>Users</h1>
      <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{ user.role | processRole }}</td>
            <td>
              <div>
                <router-link :to="{name: 'UserEdit', params: {id: user.id}}"><b-button variant="primary">Edit</b-button></router-link>
                <b-button @click="showModal(user.id)" class="ms-2" variant="outline-primary">Delete</b-button>
              </div>
            </td>
          </tr>
      </tbody>
      </table>
    </b-container>
    
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      users: [],
      deleteResult: '',
      req: {
      headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }
    }
  },
  created(){
    return this.getUsers();
  },
  filters: {
     processRole(value){
      if(value == 0){
        return 'user'
      }else if(value == 1){
        return 'admin'
      }
    } 
  },
  methods: {
    showModal(id) {
        this.deleteResult = ''
        this.$bvModal.msgBoxConfirm('Do you want to delete this user? This action cannot be reversed.', {
          title: 'Delete confirmation',
          size: 'md',
          buttonSize: 'md',
          okVariant: 'primary',
          cancelVariant: 'outline-primary',
          okTitle: 'Yes, delete!',
          cancelTitle: 'Cancel',
          footerClass: 'p-2',
          hideHeaderClose: true,
          centered: true
        })
          .then(value => {
            this.deleteResult = value

            if(this.deleteResult){
              return this.deleteUser(id);
            }else{
              return;
            }
          })
          .catch(err => {
            console.log(err);
          });
    },
    deleteUser(id){
      axios.delete(`http://localhost:8001/users/${id}`, this.req).then(res => {
        console.log(res.data.res);
        return this.getUsers();

      }).catch(err => {
        console.log(err.response.data.result.err);

      });
    },
    getUsers(){
      axios.get('http://localhost:8001/users', this.req).then(res => {
      this.users = res.data.users;

    }).catch(err => {
      console.log(err);

    });
    }
  }
}
</script>

<style scoped>
  h1{
    font-weight: 600;
    margin-bottom: 1.2rem;
  }
</style>