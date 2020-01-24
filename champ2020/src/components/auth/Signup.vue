<template>
    <div class="container signup">
        <form class="card-panel" action="" @submit.prevent="signup">
            <h2 class="center grey-darken-4-text">Sign up old school</h2>
            <div class="field">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="email" >
            </div>
            <div class="field">
                <label for="email">Password</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="name">Name</label>
                <input type="text" name="name" v-model="name">
            </div>
            <p class="center red-text" v-if="feedback">{{feedback}}</p>
            <div class="field center orange-button">
                <button class="btn deep-orange">Signup</button>
            </div>
        </form>
          <p class="center">or</p>
    <form action="" class="card-panel" @submit.prevent="signUpFacebook">
            <div class="field center">
            <button class="btn blue white-text">Log in with Facebook</button>
            </div>
    </form>
        


    </div>
</template>

<script>
import firebase from 'firebase'
import slugify from 'slugify'
import db from '@/firebase/init'


export default {
    name:'Signup',
    data(){
        return{
            email:null,
            password:null,
            name:null,
            feedback:null,
        }
    },
    methods:{
        signup(){
            if(this.name && this.email && this.password){
                this.slug = slugify(this.name, {
                    replacement: '-',
                    lower: true,
                    remove: /[*+~.()'"!:@]/g
                })
                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc => {
                    if(doc.exists){
                        this.feedback = 'This name is taken'
                    }else{
                        this.feedback = 'Go for it'
                    }
                })
            }else{
                this.feedback= 'You need to enter a name'
                
            }
        },
        signUpFacebook(){
                const provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(result =>{
                    const token = result.credential.accessToken;
                    const user = result.user;
                    return user
                }).catch(error =>{
                    let errorCode = error.code;
                })
            }
        },
        created(){
            console.log(`the person logged in is ${this.user}`)
        }
    }

</script>


<style>
h2 {
    font-size: 2em;
}

.signup {
    max-width: 500px;
    margin-top: 150px;
}

.orange-button {
    margin-top: 20px;
}


</style>