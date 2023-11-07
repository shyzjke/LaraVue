<template>
  <div class="container">
    <div class="form-group">
        <input type="text" v-model="desk.name" class="form-control border-secondary">
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
       const { desk, DeskShow } = useDesks()

       onMounted(() => DeskShow(props.deskId))

       return {
           desk,
       }
   }
}
</script>   

<style>

</style>