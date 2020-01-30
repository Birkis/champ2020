<template>
    <div class="container">
            <h2>Create Session</h2>


            <form action="" @submit.prevent="createSession" >
                     
            
                <!-- TITLE -->
                <label for="title">Session title</label>
                <input type="text" name="title" v-model="title">

                <!-- DESCRIPTION -->
                <label for="description">Session description</label>
                <input type="text" name="description" v-model="description">

                <!-- SESSION STARTS -->
                <label for="sessionStart">Session starts</label>
                <input type="date" min="2020-01-30" name="sessionStart" id="" v-model="sessionStart">

                <!-- DURATION -->
                <label for="duration">Session duration</label>
                <input type="number" name="duration" v-model="duration">

                <!-- SPOTS -->
                <label for="spots">Number of spots</label>
                <input type="number" name="spots" min="1" max="99" v-model="spots">

                <!-- PRICE -->
                <label for="price">Price</label>
                <input type="number" name="price" v-model="price">

                <!-- CATEGORY -->
                <label for="category">Session category</label>
                <input type="text" name="category" v-model="category">
                
                <!-- LOCATION -->
                <label for="location">Where it is</label>
                <input type="text" name="location" v-model="location">

                <button class="btn orange field center">CREATE SESSION</button>

            </form>
            <p v-if="feedback">{{feedback}}</p>

    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'



export default {
    name: 'CreateSession',
    components:{  
         
    },
    data(){
        return {
            title:null,
            description:null, 
            sessionStart:null,
            duration:null,
            spots:null,
            price:null,
            category:null,
            location:null,
            feedback:null,
            
        }
    },
    methods:{  
        createSession(){
             if(this.title && this.description && this.sessionStart && this.duration && this.spots && this.category && this.location){
                    let user_id =  firebase.auth().currentUser.uid;
                    let host_name = firebase.auth().currentUser.displayName
                    let host_pic = firebase.auth().currentUser.photoURL
                    let timestamp = firebase.firestore.Timestamp.now()
                    
                    db.collection('sessions').doc().set({
                        host_id: user_id,
                        title:this.title,
                        description:this.description,
                        sessionStart:this.sessionStart,
                        duration:this.duration,
                        spots:this.spots,
                        price:this.price,
                        category:this.category,
                        location:this.location,
                        host_name,
                        host_pic,
                        timestamp

                    }).then(()=> {
                        this.$router.push({name:'Home'})
                    })


             } else {
                this.feedback = "oops.. Ya need to fill out all the blanks"

             }
             
             
        }

    },
    created(){

    }
}
</script>

<style scoped>



</style>