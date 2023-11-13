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

      <div class="row">
            <template v-for="desklist in desklists" :key="desklist.id" >
                <div class="col-lg-4" >
                    <div class="card mt-3">
                        <div  class="card-body bg-red rounded">
                            <h4 class="card-title d-flex justify-content-between align-items-center">{{desklist.name}}
                                <!-- Desklist update icon -->
                                <i class="fa-solid fa-pencil-alt" @click="desk_list_input_id = desk_list.id" style="font-size: 15px; cursor: pointer;"></i>
                            </h4>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>


<script>
import useDesklists from '../../composables/desklists';
import { onMounted } from 'vue';
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'

export default {
props: ["deskId"],
    setup(props) {
    
    const { errors, desk, desks, desklists, getDesklists, getDesk, updateDesk } = useDesklists()

    onMounted(() => getDesk(props.deskId));
    onMounted(() => getDesklists(props.deskId));
    //onMounted(() => getTask());
    //onMounted(() => getDesks(props.deskId));
    //onMounted(() => getDesk(props.deskId));
    
    const state = reactive({
    name: '',
    })

    const rules = {
    name: {  required, minLength: minLength(4), maxLength: maxLength(8)  }, // Matches state.firstName
    }

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
        saveName,
    }
}
}
</script>   

<style>

</style>