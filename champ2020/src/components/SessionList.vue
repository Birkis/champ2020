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
            session_ids:[],
            name:null,
            email:null,
            locAtt:[]
            
        }

    },
    methods:{
        bookSession(id){
            
            let timestamp = firebase.firestore.Timestamp.now()
            let ref = db.collection('sessions').doc(id).get().then( result =>{
                result.data().attendees.forEach( res => {
                        this.locAtt.push(res.email) 
                        console.log(res.email)
                    } 
                )
            })
            setTimeout(console.log(this.locAtt.length)

         

            


            // legge til current user i en array som hører til den session han trykker på
            // vise frem hvor mange som er påmeldt
            // Når antall påmeldte er like mye som antall plasser, så skal knappen bli uvirksom (kan bruke en v-if og en boolen for full/ikke full)
            
            //db.collection('sessions').doc(id).set({attendees:firebase.firestore.FieldValue.arrayUnion({name:this.name, email:this.email,  timestamp})}, {merge:true})
        
            )}

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
        //let me = 
        let user = db.collection('users').doc(firebase.auth().currentUser.uid).get().then( res => {
            this.name = res.data().name
            this.email = res.data().email
            });
        
        
      
    }
}
</script>

<style scoped>

img {
    border-radius: 50%;
}

</style>