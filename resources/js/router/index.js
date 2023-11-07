import { createRouter, createWebHistory } from 'vue-router'

 
import ClientIndex from '../components/clients/ClientIndex.vue'
import ClientCreate from '../components/clients/ClientCreate.vue'
import ClientEdit from '../components/clients/ClientEdit.vue'
import UserIndex from '../components/home/UserIndex.vue'
import DeskIndex from '../components/desks/DeskIndex.vue'


 
const routes = [

    {
        path: '/clients',
        name: 'client.index',
        component: ClientIndex
    },
    {
        path: '/clients/create',
        name: 'client.create',
        component: ClientCreate
    },
    {
        path: '/clients/:id/edit',
        name: 'client.edit',
        component: ClientEdit,
        props: true
    },
    {
        path: '/users',
        name: 'user.index',
        component: UserIndex
    },

    {
        path: '/desks',
        name: 'desk.index',
        component: DeskIndex
    },
];
 
export default createRouter({
    history: createWebHistory(),
    routes
})