<template>

    <div class="container">
        <h2>A list of all sessions</h2>
        <ul>
            <li class="card" v-for="session in sessions" :key="session.id">

                <div class="card-content">
                    

                    <span class="card-title ">{{session.title}}</span>  <img class="right" :src="session.host_pic">
                    <span class="">{{session.category}}</span>  
                  
                
                    <p>{{session.description}}</p> <p class="right">{{session.host_name}}</p>
                    <p>Økten varer: {{session.duration}} timer</p>
    
                    <p>Økten begynner {{session.sessionStart}}</p>
                    <span>økens ID: {{session.session_id}}</span>
                    <p v-if="session.attendees" >Påmeldte: {{session.attendees.name}}</p>

                </div>
                <div class="card-action">
                    <button class="btn" @click.prevent="bookSession(session.session_id)">Book Now!</button>
                </div>
                
                
            </li>
        </ul>


    </div>

</template>


<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    name: 'SessionList',
    data(){
        return {
            sessions:[],
            session_ids:[]
        }

    },
    methods:{
        bookSession(id){
            let user = firebase.auth().currentUser
            let timestamp = firebase.firestore.Timestamp.now()
            // legge til current user i en array som hører til den session han trykker på
            // vise frem hvor mange som er påmeldt
            // Når antall påmeldte er like mye som antall plasser, så skal knappen bli uvirksom (kan bruke en v-if og en boolen for full/ikke full)
            db.collection('sessions').doc(id).set({attendees:firebase.firestore.FieldValue.arrayUnion(user.displayName)}, {merge:true})
            console.log(this.sessions)

            // db.collection('sessions').doc(id).set({attendees:{name:user.displayName, user_id:user.uid, timestamp}}, {merge:true})

            // regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")   <----
            
         
        }

    },
    // laster inn alle sessions og lagrer de som en array i Sessions. Alle feltene ligger i sessions 
    // felter er: title, spots, duration, location, price, sessionStart, category, description, host_id (som er lik 'uid')
    created(){
        db.collection('sessions').get().then(res => {
            res.forEach(doc => {
                db.collection('sessions').doc(doc.id).set({session_id:doc.id},{merge:true});             
            })

        })
        db.collection('sessions').get().then(res=>{
            res.forEach(doc => this.sessions.push(doc.data())
            )
        }) 
    },
    mounted(){
        let me = firebase.auth().currentUser
        console.log(me.email)
      
    }
}
</script>

<style scoped>

img {
    border-radius: 50%;
}

</style>