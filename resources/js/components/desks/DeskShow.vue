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

  </div>
</template>

<script>
import useDesks from '../../composables/desks';
import { onMounted } from 'vue';

import { reactive } from 'vue'
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

        const { errors, desk, DeskShow, updateDesk } = useDesks()

        onMounted(() => DeskShow(props.deskId))

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
            updateDesk,
            saveName,
            state, 
            v$,
            errors,

        }
   }
}
</script>   

<style>

</style>