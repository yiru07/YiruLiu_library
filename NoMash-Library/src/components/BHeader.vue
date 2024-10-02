<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about" class="nav-link" active-class="active">About</router-link>
    </li>
    <!-- <li class="nav-item" v-if="showLoginLink">
      <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
    </li> -->
    <!-- <li class="nav-item" v-else-if="isAuthenticated && route.path !== '/login'">
      <a @click="logout" class="nav-link" href="#">Logout</a>
    </li> -->
    <li class="nav-item" v-if="!isLoggedIn">
      <router-link to="/Firelogin" class="nav-link" active-class="active">Firebase Login</router-link>
    </li>
    <li class="nav-item" v-if="!isLoggedIn">
      <router-link to="/FireSignup" class="nav-link" active-class="active">Firebase Signup</router-link>
    </li>
    <li class="nav-item" v-if="isLoggedIn">
      <router-link to="/login" class="nav-link" active-class="active" @click="logout">Logout</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/addbook" class="nav-link" active-class="active" >Add Book</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/GetBookCount" class="nav-link" active-class="active" >Get Book Count</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/WeatherCheck" class="nav-link" active-class="active" >Get Weather</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/CountBookAPI" class="nav-link" active-class="active" >Count Book API</router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";  
import router from "@/router";

const auth = getAuth();
const isLoggedIn = ref(false);  

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;  
    } else {
      isLoggedIn.value = false; 
    }
  });
});


const logout = () => {
  signOut(auth).then(() => {
    console.log("Log out.");
    isLoggedIn.value = false;  
    router.push('/')
  }).catch((error) => {
    console.error("Error during sign out:", error);
  });
};
</script>
