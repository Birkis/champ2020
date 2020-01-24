<template>
  <div class="container">
    <h1>Welcome to Champ, {{ user.displayName }}</h1>
    
  
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
  name: 'HelloWorld',
  user: null,
  profilePic:null,
  data () {
    return {
      msg: 'Welcome to Champ'
    }
    
  },
  created(){
    this.user = firebase.auth().currentUser
    let ref = db.collection('users').get().then(result =>{
      result.forEach(element => {
        if(this.user.uid == element.data().user_id){
            this.profilePic = element.data().profilePic;
            console.log(this.profilePic)
        }else{
          console.log('no luck!')
        }
      })
    })

  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
