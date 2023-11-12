import { createRouter, createWebHistory } from 'vue-router'

 
import ClientIndex from '../components/clients/ClientIndex.vue'
import ClientCreate from '../components/clients/ClientCreate.vue'
import ClientEdit from '../components/clients/ClientEdit.vue'
import UserIndex from '../components/home/UserIndex.vue'
import DeskIndex from '../components/desks/DeskIndex.vue'
import DeskShow from '../components/desks/DeskShow.vue'
import DeskCreate from '../components/desks/DeskCreate.vue'


 
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
    {
        path: '/desks/create',
        name: 'desk.create',
        component: DeskCreate
    },
    {
        path: '/desks/:deskId',
        name: 'desk.show',
        component: DeskShow,
        props: true
    },
];
 
export default createRouter({
    history: createWebHistory(),
    routes
})