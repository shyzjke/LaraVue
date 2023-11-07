<template>
  <div class="container">
    <div class="form-group">
        <input type="text" v-model="desk.name" class="form-control border-secondary" @blur="saveName" v-on:keyup.enter="$event.target.blur()">
    </div>
  </div>
</template>

<script>
import useDesks from '../../composables/desks';
import { onMounted } from 'vue';

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

       const saveName= async () => {
            await updateDesk(props.deskId)
        }

       return {
           desk,
           updateDesk,
           saveName
       }
   }
}
</script>   

<style>

</style>