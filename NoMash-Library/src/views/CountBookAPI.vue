<template>
    <pre>{{ jsondata }}</pre>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            jsondata:null,
            error: null
        };
    },
    mounted(){
        this.getBookCountAPI(),
        this.getBookNameAPI()
    },
    methods: {
        async getBookCountAPI(){
            try{
                const response = await axios.get('https://countbooks-yiinsbtiaa-uc.a.run.app/countBooks');
                this.jsondata = response.data
                this.error = null;
            }catch(error){
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        },
        async getBookNameAPI(){
            try{
                const response = await axios.get('https://nameupper-yiinsbtiaa-uc.a.run.app/nameUpper');
                this.jsondata = response.data
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