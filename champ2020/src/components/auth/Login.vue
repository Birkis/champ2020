<template>
    <div class="container">
        <h2 class="teal-text">Log in here</h2>
        <button class="btn" @click.prevent="loginFacebook" >Log in with Facebook</button>

        <p>or</p>

        <form action="" @submit.prevent="loginEmail">
            <h5 class="teal-text" >Login with email and password</h5>
            <label for="email">Your email</label>
            <input type="email" name="email" id="" v-model="email"> 

            <label for="password">Your password</label>
            <input type="password" name="password" id="" v-model="password">

            <button class="btn">Log in</button>

        </form>

    </div>
</template>


<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    data(){
        return {
            email:null,
            password:null,

        }
    },  //end data
    methods:{
        loginEmail(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                this.$router.push({name: 'Home'})
            )
        },
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