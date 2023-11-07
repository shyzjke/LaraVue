<template>
    <navbar></navbar>
    <router-view/>
</template>

<script>
import ClientIndex from "./clients/ClientIndex.vue"
import UserIndex from "./home/UserIndex.vue"
import DeskIndex from "./desks/DeskIndex.vue"
import Navbar from './layouts/Navbar.vue'


export default 
  {
  components: { ClientIndex, DeskIndex, UserIndex, Navbar },


}
</script>

<style>

</style>