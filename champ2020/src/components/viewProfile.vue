<template>
    <div class="container">

        <div class="card">
            <div class="card-content">
                <img class="circle" :src="profilePic" alt="">
                <h1 class="">This is your profile, {{name}}</h1>
                <p>Your email is: {{email}}</p>
            


            </div>
            
        </div>
       

    </div>

</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name:'ViewProfile',
    user_id:null,
    data(){
        return {
            userID: this.$route.params.user_id,
            name:null,
            email:null,
            profilePic:null,

        }
    },
    methods:{
        updateId(){
            this.userID = this.$route.params.user_id
            db.collection('users')
        }
    },
    watch: {
      $route: 'updateId'

    },
    created(){
        // find the user_id of current user
        let user_id =  firebase.auth().currentUser.uid
        let res = db.collection('users').where('user_id','==', user_id).get().then(res =>{
                 res.forEach(doc=>{
                     this.name = doc.data().name
                     this.email = doc.data().email
                     this.profilePic=doc.data().profilePic
                 })
       
        })
        }
    }


</script>


<style scoped>

h1 {
    font-size: 1.8em;
}

</style>