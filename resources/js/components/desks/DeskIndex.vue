<template>
    <div class="background">
        <div class="container">
            <div class="row py-4">
                <div v-for="desk in desks" :key="desk.id" class="card bg-light my-3 mx-3" style="max-width: 18rem;">
                    <router-link class="text-decoration-none" :to="{name: 'desk.show', params: {deskId: desk.id}}" >
                        <h5 class="card-header text-dark">{{desk.name}}</h5>
                    </router-link>
                    
                    <div class="card-body">
                        <h5 class="card-title">Light card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import useDesks from '../../composables/desks'
import { onMounted } from 'vue';

export default {

    setup() {
        const { desks, getDesks, } = useDesks()
 
        onMounted(getDesks)
        
        return {
            desks,
        }
    }

}
</script>

<style>

.background {
  height: 100vh;
  width: 100vw;
  background-color: gray;
}

</style>

