<template>
    <nav class="navbar navbar-dark navbar-expand bg-black p-1">
        <div class="container-fluid" id="navbarNav">
            <ul class="navbar-nav m-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name:'user.index'}">User</router-link>
                </li>
                 <li class="nav-item">
                    <router-link class="nav-link" :to="{name:'client.index'}">Clients</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name:'desk.index'}">SoccerBase</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Example 2</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Example 3</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>