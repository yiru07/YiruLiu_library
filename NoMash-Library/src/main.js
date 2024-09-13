// // import './assets/main.css'
// // import '@/assets/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

// import { createApp } from 'vue'
// import App from './App.vue'


// import router from './router'


// import PrimeVue from 'primevue/config'
// import Aura from '@primevue/themes/aura'
// // import DataTable from 'primevue/datatable'
// // import Column from 'primevue/Column'

// const app = createApp(App)
// app.use(PrimeVue, { theme: { preset: Aura } })

// // app.component('DataTable', DataTable)
// // app.component('Column', Column)

// app.use(router)
// app.mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
// const app = initializeApp(firebaseConfig);




const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')

