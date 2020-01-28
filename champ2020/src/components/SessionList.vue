<template>

    <div class="container">
        <h2>A list of all sessions</h2>
        <ul>
            <li class="card" v-for="session in sessions.titles">
                <p>{{session}}</p>
                
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
            sessions:{
                titles:[],
                // description:[], 
                // sessionStart:[],
                // duration:[],
                // spots:[],
                // price:[],
                // category:[],
                // location:[],
                // feedback:null,
                }
        }

    },
    methods:{

    },
    created(){
        const ref = db.collection('sessions').get().then( res=> {
            res.forEach(doc => {
                this.sessions.titles.push(doc.data().title)
                // this.description.push(doc.data().description)
                // this.sessionStart.push(doc.data().sessionStart)
                // this.duration.push(doc.data().duration)
                // this.spots.push(doc.data().spots)
                // this.price.push(doc.data().price)
                // this.category.push(doc.data().category)
                // this.location.push(doc.data().location)
                return doc
            })
        })
        

    }
}
</script>

<style scoped>

</style>