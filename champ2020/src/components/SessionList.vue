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
                    <span>økens ID {{session.id}}</span>

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
            // legge til current user i en array som hører til den session han trykker på
            // vise frem hvor mange som er påmeldt
            // Når antall påmeldte er like mye som antall plasser, så skal knappen bli uvirksom (kan bruke en v-if og en boolen for full/ikke full)
            db.collection('sessions').doc(id).get().then(doc =>{
                console.log(doc.data().host_name)
            })
         
        }

    },
    // laster inn alle sessions og lagrer de som en array i Sessions. Alle feltene ligger i sessions 
    // felter er: title, spots, duration, location, price, sessionStart, category, description, host_id (som er lik 'uid')
    created(){
        const ref = db.collection('sessions').get().then( res=> {
            res.forEach(doc => {
                this.sessions.push(doc.data())
                this.sessions.map( session => {
                    session.session_id=doc.id
                })
                //this.session_ids.push(doc.id)
            })
        }) 
    },
    mounted(){
      
    }
}
</script>

<style scoped>

img {
    border-radius: 50%;
}

</style>