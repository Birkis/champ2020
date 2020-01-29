<template>

<div class="container">
    <div class="row">
        <div class="col s12">

            <div class="card">
                <div class="card-image">
                <img :src="profilePic">
                <span class="card-title">{{name}}</span>
                </div>
                    <div class="card-content">

            
                    <!-- THE FORM -->
                    
                    <form action="">
                        <!-- INTERESTS -->
                        <label for="interests">My interests</label>
                        <input type="text" name="interests" v-model="interests">

                        <!-- GOAL -->
                        <label for="goal">My goal</label>
                        <input type="text" name="goal" v-model="goal">

                        <!-- GENDER -->
                        <label for="gender">Gender</label>
                        <input type="text" name="gender" v-model="gender">

                        <!-- DOB -->
                        <label for="dob">Date of Birth</label>
                        <input type="date" name="dob" v-model="dob">

                        <!-- MOTTO -->
                        <label for="motto">My motto</label>
                        <input type="text" name="motto" v-model="motto">

                        <!-- postcode -->
                        <label for="postcode">My postcode</label>
                        <input type="number" name="postcode" v-model="postcode">

                        <!-- BIO -->
                        <label for="bio">bio</label>
                        <input type="text" name="bio" v-model="bio">
                        
                        <!-- PHONE -->
                        <label for="phone">Phone number</label>
                        <input type="tel" name="phone" v-model="phone">

                        <!-- Is Trainer Switch -->
                        <label for="trainer">I'm a personal trainer</label>
                        <div class="switch" name="trainer" >
                            <label>
                            Off
                            <input type="checkbox" >
                            <span class="lever"></span>
                            On
                            </label>
                        </div>
                        
                        <!-- EMAIL -->
                        <div class="myEmail">
                        <label for="myEmail">My email: </label> 
                        <input type="email" name="email" v-model="email">
                        </div>
                        
                        <input type="range" name="points" min="0" max="10">



                        <!-- SUBMIT -->
                        <div class="field center">
                            <button class="btn orange center-align" name="update" @click.prevent="updateProfile" >Update</button>
                        </div>

                        <p class="red-text center">{{feedback}}</p>
                    </form>
                </div>


            </div>
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
            feedback:null,
            istrainer:false,
            motto:null,
            dob:null,
            interests:[],
            goal:[],
            rating:null,
            reviews:null,
            gender:null,
            postcode:null,



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
                phone:this.phone,
                postcode:this.postcode,
                gender:this.gender,
                goal:this.goal,
                dob:this.dob,
                motto:this.motto,
                interests: this.interests
            }).catch(err => {
                this.feedback=err.message
            })
            alert("Your profile info was updated")
            //this.feedback = 'The info was updated!'
            console.log(this.interests)
            },
              
        },
    watch: {
      $route: 'updateId'

    },
    created(){
        // find the user_id of current user
        let user_id =  firebase.auth().currentUser.uid
        db.collection('users').where('user_id','==', user_id).get().then(res =>{
                 res.forEach(doc=>{
                     this.name = doc.data().name
                     this.email = doc.data().email
                     this.profilePic = doc.data().profilePic
                     this.bio = doc.data().bio
                     this.phone = doc.data().phone
                     this.dob= doc.data().dob
                     this.gender= doc.data().gender
                     this.motto=doc.data().motto
                     this.postcode=doc.data().postcode
                     this.interests=doc.data().interests
                     this.goal=doc.data().goal
                 }) 
        })
        }
    }


</script>


<style scoped>

h1 {
    font-size: 1.8em;
}



img {
  -webkit-filter: blur(25px); /* Safari 6.0 - 9.0 */
  filter: blur(25px);
}
.btn {
    margin-top:10px;
}

.myEmail{
    margin-top:10px;
    margin-bottom:10px;
}

</style>