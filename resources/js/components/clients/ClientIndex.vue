<template>
    <div class="overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md container">
       
        <table class="min-w-full border divide-y divide-gray-200 table table-dark table-hover">
            <thead>
            <router-link type="button" class="btn btn-sm btn-danger my-2" :to="{ name: 'client.create' }" >Create Client</router-link>
            <tr>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">ID</span>
                </th>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                </th>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Lastname</span>
                </th>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                </th>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Boolean</span>
                </th>
                <th class="bg-black">
                    <span class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Edit</span>
                </th>
            </tr>
            </thead>
 
            <tbody class="bg-white divide-y divide-gray-200 divide-solid">
            <template v-for="client in clients" :key="client.id">
                <tr class="bg-white">
                    <td class="text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.id }}
                    </td>
                    <td class="text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.name }}
                    </td>
                    <td class="text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.surname }}
                    </td>
                    <td class="ext-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.email }}
                    </td>
                    <td class="text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ client.is_woman }}
                    </td>
                    <td class="">
                        <router-link :to="{ name: 'client.edit', params: { id: client.id } }"
                            class="btn btn-danger btn-sm mx-2 w-25">
                            Edit
                        </router-link>
                        <button @click="deleteClient(client.id)"
                                class="btn btn-danger btn-sm">
                                Delete
                        </button>
                    </td>

                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>
 
<script>
import useClients from '../../composables/clients'
import { onMounted } from 'vue';
 
export default {
    setup() {
        const { clients, getClients, destroyClient } = useClients()
 
        onMounted(getClients)


        const deleteClient = async (id) => {
            if (!window.confirm('You sure?')) {
                return
            }
 
            await destroyClient(id)
            await getClients()
        }
 
        return {
            clients,
            deleteClient,
        }
    }
}
</script>