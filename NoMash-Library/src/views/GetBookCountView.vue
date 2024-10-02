<template>
    <div id = "app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if = "count !== null">Total Book Count: {{ count }}</p>
        <p v-if = "error">{{ error }}</p>

        <h1>Capitalised Book Name</h1>
        <button @click="getBookNameUppercase">Get Book Name Capitalised</button>
        <ul v-if="names.length > 0">
            <li v-for="(name, index) in names" :key="index">{{ name }}</li> 
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            count: null,
            error: null,
            names: []
        };
    },
    methods: {
        async getBookCount(){
            try{
                const response = await axios.get('https://countbooks-yiinsbtiaa-uc.a.run.app/countBooks');
                console.log("API Response:", response.data);
                this.count = response.data.count;
                this.error = null;
            }catch(error){
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        },
        async getBookNameUppercase(){
            try{
                const response = await axios.get('https://nameupper-yiinsbtiaa-uc.a.run.app/nameUpper');
                console.log("API Response:", response.data);
                this.names = response.data.names.map(name => name.toUpperCase());
                this.error = null;
            }catch(error){
                console.error('Error fetching book names:', error);
                this.error = error;
                this.names = [];
            }
        }
    }
}
</script>