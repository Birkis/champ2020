<template>
    <div class="container">
        <h2 class="teal-text">Log in here</h2>
        <button class="btn" @click.prevent="loginFacebook" >Log in with Facebook</button>
    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    data(){
        return {

        }
    },  //end data
    methods:{
        
        loginFacebook(){
                const provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result =>{
                    const token = result.credential.accessToken;
                    const user = result.user;})
                this.$router.push({name:'Home'})
            }
    } //end methods 
} // end export default 

</script>


<style scoped>

</style>