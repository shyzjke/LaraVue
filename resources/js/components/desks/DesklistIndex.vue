<template>
        <div class="container">
        <div class="alert alert-danger bg-opacity-75 w-75 mt-3" role="alert" v-if="errors !== ''">
                <p class="m-0">JSON data loading error!</p>
                <p class="m-0">{{ errors }}</p>
        </div>
    
        <h4 class="mt-3"> {{ desk.name }}</h4>
        <div class="form-group mt-2">
            <input type="text" v-model.trim="v$.name.$model" v-model="desk.name" @blur="saveName" v-on:keyup.enter="saveName" class="form-control" :class="{'is-invalid': v$.name.$error}">
            <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
                    <div class="error-msg text-danger">{{ error.$message }}</div>
            </div>
        </div>

        <form @submit.prevent="saveDesklist">
            <div class="form-group">
                <input type="text" v-model.trim="v$.stateDesklist.name.$model" class="form-control mt-2" placeholder="Enter new desklist" :class="{ 'is-invalid': v$.stateDesklist.$error}">
                <div class="input-errors" v-for="error of v$.stateDesklist.name.$errors" :key="error.$uid">
                    <div class="error-msg text-danger">{{ error.$message }}</div>
                </div>
                <!-- Front-end errors -->
            </div>
            <button type="submit" color="
                primary" class="btn btn-sm btn-primary mt-2 w-10">CREATE DESKLIST
            </button>
        </form>

        <div class="row">
                <template v-for="desklist in desklists" :key="desklist.id" >
                    <div class="col-lg-3" >
                        <div class="card mt-3">
                            <div  class="card-body bg-red rounded">
                                <!-- Desklist update form -->
                                <form @submit.prevent="updateDesklist(desklist.id)" v-if="desklist_input_id == desklist.id" v-on:keyup.enter="desklist_input_id = !desklist.id" class="d-flex justify-content-between align-items-center py-3">
                                    <input type="text" v-model="desklist.name" class="form-control" placeholder="Write list name">
                                    <!-- Front-end errors -->
                                    <!-- Close button -->
                                    <button type="button" @click="updateDeskistName(desklist, desklist_input_id = !desklist.id)" style="padding: 0; border: none; background: none; margin-left: 5px" class="close btn-lg" aria-label="Close">
                                        <span class="fa-lg" aria-hidden="true">&times;</span>
                                    </button>
                                </form>
                                <!-- Desklist title -->
                                <h4 class="card-title d-flex justify-content-between align-items-center">{{desklist.name}}
                                    <!-- Desklist update icon -->
                                    <i class="fa-solid fa-pencil-alt" @click="desklist_input_id = desklist.id" style="font-size: 15px; cursor: pointer;"></i>
                                </h4>
                            </div>
                            <button class="btn btn-sm btn-danger" @click="deleteDesklist(desklist.id)">
                                DELETE
                            </button>
                        </div>
                    </div>
                </template>
            </div>
        </div>
</template>


<script>
import useDesklists from '../../composables/desklists';
import { onMounted } from 'vue';
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'

export default {
    props: {
       deskId: {
           required: true,
           type: String
       }
   },
    setup(props) {
    
    const { errors, desk, desks, desklists, getDesklists, getDesk, updateDesklist, storeDesklist, destroyDesklist } = useDesklists()

    onMounted(() => getDesk(props.deskId));
    onMounted(() => getDesklists(props.deskId));
    //onMounted(() => getTask());
    //onMounted(() => getDesks(props.deskId));
    //onMounted(() => getDesk(props.deskId));

    const stateDesklist = reactive({})
    const desklist_id = ref([]);
    

    const saveDesklist = async () => {
    
        v$.value.stateDesklist.name.$touch();
        if (v$.value.stateDesklist.name.$invalid) return;
        //alert("Form Submitted " + JSON.stringify(state, null, 2));
                    //await getDesks()
        await storeDesklist({
            ...state.stateDesklist
        });
        await getDesklists(props.deskId)
        v$.value.stateDesklist.name.$reset();
        state.stateDesklist.name = ''

        //desk_list_name.name = '';
    }



    const deleteDesklist = async (id) => {
            if (!window.confirm('You sure?')) {
                return
            }
 
            await destroyDesklist(id)
            await getDesklists(props.deskId);
    }



    const state = reactive({
    name: '',
    stateDesklist: {
                name: '',
                desk_id: props.deskId
            },
    })

    const rules = {
    name: {  required, minLength: minLength(4), maxLength: maxLength(8)  }, // Matches state.firstName
    stateDesklist: {
                name: {
                    required, minLength: minLength(4), maxLength: maxLength(8)
                } // Matches state.firstName
        },
    }

    const desklist_input_id = ref(null)

    const v$ = useVuelidate(rules, state)

    const saveName = async () => {
        if (!v$.value.$error) {
            await updateDesk(props.deskId)
        }
    }

    return {
        desk,
        desks,
        desklists,
        state, 
        v$,
        errors,
        stateDesklist,
        desklist_id,
        desklist_input_id,
       
        saveName,
        saveDesklist,
        deleteDesklist,
        updateDesklist
    }
}
}
</script>   

<style>

</style>