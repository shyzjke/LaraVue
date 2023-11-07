import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
 
export default function useClients() {
    const client = ref([])
    const clients = ref([])
 
    const errors = ref('')
    const router = useRouter()
 
    const getClients = async () => {
        let response = await axios.get('/clients')
        clients.value = response.data.data
    }
 
    const showClient = async (id) => {
        let response = await axios.get(`/clients/${id}`)
        client.value = response.data.data
    }

    const storeClient = async (data) => {
        errors.value = ''
        try {
            await axios.post('/clients', data)
            await router.push('/clients')
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
 
    }
 
    const updateClient = async (id) => {
        errors.value = ''
        try {
            await axios.patch(`/clients/${id}`, client.value)
            await router.push('/clients')
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    const destroyClient = async (id) => {
        await axios.delete(`/clients/${id}`)
    }
 

    return {
        errors,
        client,
        clients,
        showClient,
        getClients,
        storeClient,
        updateClient,
        destroyClient,
    }
}