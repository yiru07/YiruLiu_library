<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 5)</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about" class="nav-link" active-class="active">About</router-link>
    </li>
    <li class="nav-item" v-if="showLoginLink">
      <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
    </li>
    <li class="nav-item" v-else-if="isAuthenticated && route.path !== '/login'">
      <a @click="logout" class="nav-link" href="#">Logout</a>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const useAuth = () => {
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

  const updateAuthStatus = () => {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
  };


  window.addEventListener('storage', updateAuthStatus);

  const logout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    updateAuthStatus();
  };

  return {
    isAuthenticated,
    logout
  };
};

const { isAuthenticated, logout } = useAuth();

const route = useRoute();

const showLoginLink = computed(() => {
  return route.path !== '/login' && !isAuthenticated.value;
});


watch(isAuthenticated, () => {
  showLoginLink.value = route.path !== '/login' && !isAuthenticated.value;
});
</script>
