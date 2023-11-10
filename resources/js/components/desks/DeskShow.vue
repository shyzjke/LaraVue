<template>
  <div class="container">
    <div class="form-group">
        <input type="text" v-model.trim="v$.name.$model" v-model="desk.name" @blur="saveName" v-on:keyup.enter="saveName" class="form-control" :class="{'is-invalid': v$.name.$error}">
        <div class="input-errors" v-for="error of v$.name.$errors" :key="error.$uid">
              <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import useDesks from '../../composables/desks';
import { onMounted } from 'vue';

import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'

export default {
   props: {
       deskId: {
           required: true,
           type: String
       }
   },

   setup(props) {

        const { desk, DeskShow, updateDesk } = useDesks()

        onMounted(() => DeskShow(props.deskId))

        const saveName = async () => {
              if (!v$.value.$error) {
                await updateDesk(props.deskId)
              }  
        }

        const state = reactive({
          name: '',
        })

        const rules = {
          name: { required, minLength: minLength(3) }, // Matches state.firstName
        }

        const v$ = useVuelidate(rules, state)

        return {
            desk,
            updateDesk,
            saveName,
            state, 
            v$,
        }
   }
}
</script>   

<style>

</style>