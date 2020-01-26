<template>

<div class="container">
    <div class="card">
        <div class="card-image">
          <img :src="profilePic">
          <span class="card-title">{{name}}</span>
        </div>
        <div class="card-content">
          <form action="">
            <label for="bio">bio</label>
            <input type="text" name="bio" v-model="bio">
            <label for="phone">Phone number</label>
            <input type="text" name="phone" v-model="phone">
            <div class="field center">
            <button class="btn orange center-align" name="update" @click.prevent="updateProfile" >Update</button>
            </div>
          </form>
        </div>
        
        <div class="card-action">
          <a href="#">{{email}}</a>
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
            bio:null,
            phone:null,
            dob:null,


        }
    },
    methods:{
        updateId(){
            this.userID = this.$route.params.user_id
            db.collection('users')
        },
        updateProfile(){
            let bio = this.bio;
            let user_id =  firebase.auth().currentUser.uid;
            let ref = db.collection('users').doc(user_id).update({
                bio,
                phone:this.phone
            })
           
           
            
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

.card {
    max-width: 250px;;
}

img {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(5px);
}


</style>