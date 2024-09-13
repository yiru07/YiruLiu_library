<template>
     <h1>Create an Account</h1>
     <p><input type="text" placeholder="Email" v-model="email" /></p>
     <p><input type="password" placeholder="Password" v-model="password" /></p>
     <p><button @click="register">Save to Firebase</button></p>
 </template>
 
 <script setup>
 import { ref } from "vue";
 import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
 import { getFirestore, doc, setDoc } from "firebase/firestore";
 import { useRouter } from "vue-router";
 
 const email = ref("");
 const password = ref("");
 const router = useRouter();
 const auth = getAuth();
 const db = getFirestore();
 
 const register = () => {
 
   if (email.value === adminEmail) {
     console.log("This email has been registered!");
     window.alert("This email has been registered!");
     return;
   }
 
   createUserWithEmailAndPassword(auth, email.value, password.value)
     .then((data) => {
       console.log("Firebase registration successful!");
 
       const user = data.user;
 
       setDoc(doc(db, "users", user.uid), {
         email: user.email,
         role: "user" 
       })
       .then(() => {
         console.log("User role set to 'user' in Firestore.");
         router.push('/FireLogin'); 
       })
       .catch((error) => {
         console.log("Error writing user role to Firestore: ", error);
       });
 
     })
     .catch((error) => {
       console.log(error.code);
     });
 };
 </script>