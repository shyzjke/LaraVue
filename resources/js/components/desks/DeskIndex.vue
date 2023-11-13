<template>
    <div class="background">
        <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md container">

        <div class="alert alert-danger opacity-75 w-75 mt-3" role="alert" v-if="errors !== ''">
            <p class="m-0">JSON data loading error!</p>
            <p class="m-0">{{ errors }}</p>
        </div>
            <form @submit.prevent="saveDesk" class=" my-3">
                <div class="form-group">
                    <input class="form-control w-75" placeholder="Enter desk name" v-model.trim="v$.name.$model" :class="{'is-invalid': v$.name.$error}">
                    <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                        <div class="error-msg text-dark">{{ error.$message }}</div>
                    </div>
                </div>

                <button type="submit" class="btn btn-sm btn-primary mt-2">
                    CREATE DESK
                </button>
            </form>

            <div class="row justify-content-start ms-0">
                <div v-for="desk in desks" :key="desk.id" class="card bg-light mb-4 me-4" style="width: 18rem;">
                    <router-link class="text-decoration-none" :to="{name: 'desklist.index', params: {deskId: desk.id}}" >
                        <h5 class="card-header text-dark">{{desk.name}}</h5>
                    </router-link>
                    
                    <div class="card-body">
                        <h5 class="card-title">Light card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    
                    <button type="button" class="btn btn-sm btn-danger mb-3" @click="deleteDesk(desk.id)">
                        DELETE
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

import useDesks from '../../composables/desks'
import { onMounted } from 'vue';
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'

export default {

    setup() {
        const { errors, desks, getDesks, destroyDesk, storeDesk, errored } = useDesks()
 
        onMounted(getDesks)

        const deleteDesk = async (id) => {
            if (!window.confirm('You sure?')) {
                return
            }
 
            await destroyDesk(id)
            await getDesks()
        }


        const saveDesk = async () => {
            if (!v$.value.$error) {
                await storeDesk({ ...state })
                await getDesks()
            } 
        }


        const state = reactive({
          name: '',
        })



        const rules = {
          name: {  required, minLength: minLength(4), maxLength: maxLength(8)  }, // Matches state.firstName
        }

        const v$ = useVuelidate(rules, state)

        
        return {
            desks,
            deleteDesk,
            v$,
            state,
            saveDesk,
            errors,
            errored
        }
    }

}
</script>

<style>

.background {
  min-height: 150vh;
  width: 100vw;
  background-color: gray;
}

</style>

