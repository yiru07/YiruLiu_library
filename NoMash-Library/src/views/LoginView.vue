<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1 class="text-center">Login</h1>
        <br>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" />
            <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
        <p v-if="isAuthenticated"></p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const isAuthenticated = ref(false);



const validUsername = 'user';
const validPassword = 'password';


const login = () => {
  if (username.value === validUsername && password.value === validPassword) {
    isAuthenticated.value = true;
    localStorage.setItem('isAuthenticated', true);
    router.push('/about');
    alert('Login successful!');
  } else {
    alert('Invalid username or password');
  }
};


</script>



<style scoped>
/*  */
</style>
