<template>
<div class="navbar">
    <nav class="teal lighten-2">
        <div class="container">
            
            <router-link :to="{ name: 'Home' }"><a href="" class="brand-logo left">Champ2020</a></router-link>
            
            
         
            <ul class="right">
                <li v-if="!user" ><router-link :to="{ name:'Signup'}">Signup</router-link></li>
                <li v-if="!user"><router-link :to="{ name: 'Login' }">Login</router-link></li>
                <li v-if="user" @click.prevent="logout" >Log out</li>
                <img class="center-align circle" :src="this.profilePic" alt="">
            </ul>
        </div>
    </nav>
  

</div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'Navbar',
    data(){
        return {
            user:null,
            profilePic:null,

        }
    },
    methods:{
        logout(){
            firebase.auth().signOut().then(()=>{
                console.log("you've been signed the fuck out")
            })
        }


    },
    created(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.user=user;
                this.profilePic=user.photoURL;
                
            }else{
                this.user=null
            }
        })
    }    
}
</script>

<style scoped>

img  {
    max-width: 35px;
    margin-left:20px;
    margin-top:15px; 
}

</style>