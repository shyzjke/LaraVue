<template>
    <div class="mt-2 mb-6 text-sm text-red-600" v-if="errors !== ''">
        {{ errors }}
    </div>
 
    <form class="space-y-6" @submit.prevent="saveClient">
        <div class="space-y-4 rounded-md shadow-sm">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.name">
                </div>
            </div>

            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Lastname</label>
                <div class="mt-1">
                    <input type="text" name="name" id="name"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.surname">
                </div>
            </div>
 
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <div class="mt-1">
                    <input type="text" name="email" id="email"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.email">
                </div>
            </div>
 
            <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Gender</label>
                <div class="mt-1">
                    <input type="text" name="address" id="address"
                           class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                           v-model="form.is_woman">
                </div>
            </div>
 
        </div>
 
        <button type="submit"
                class="btn btn-secondary btn-sm my-2">
            Create Client
        </button>
    </form>
</template>
 
<script>
import useClients from '../../composables/clients'
import { reactive } from 'vue'
 
export default {
    setup() {
        const form = reactive({
            name: '',
            surname: '',
            email: '',
            is_woman: '',
        })
 
        const { errors, storeClient } = useClients()
 
        const saveClient = async () => {
            await storeClient({ ...form })
            
        }
 
        return {
            form,
            errors,
            saveClient
        }
    }
}
</script>