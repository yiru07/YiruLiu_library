<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";  
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const db = getFirestore();  

const signin = () => {
signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    const user = auth.currentUser;  
    console.log("User signed in successfully: ", user);
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          const userRole = userData.role;

          if (userRole === "admin") {
            console.log("Admin signed in");
            router.push('/admin-dashboard');  
          } else if (userRole === "user") {
            console.log("User signed in");
            router.push('/about');  
          }
        } else {
          console.log("User document does not exist in Firestore");
        }
      }).catch((error) => {
        console.log("Error fetching user role: ", error);
      });
    }
  })
  .catch((error) => {
    console.log("Sign-in error: ", error.code);
  });
};
</script>
