import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
 
export default function useDesklists() {
    const desk = ref([])
    const desks = ref([])
    const desklist = ref([])
    const desklists = ref([])
 
    const errors = ref('')
    const router = useRouter()

    const getDesks = async () => {
        let response = await axios.get('/desks')
        desks.value = response.data.data
    }

    const getDesk = async (id) => {
        let response = await axios.get('/desks/' + id)
        desk.value = response.data.data
    }

 
    const getDesklists = async (deskId) => {
        let response = await axios.get('/desklists/', {
            params: {
              desk_id: deskId,
            }
          })
        desklists.value = response.data.data
    }

    const updateDesk = async (id) => {
        
        try {
            await axios.patch(`/desks/${id}`, desk.value)
            await router.push('/desks')
        } catch (e) {
        
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors[key][0] + ' ';
                }
            }
        }
    }

    return {
        desk,
        desks,
        errors,
        desklist,
        desklists,
        getDesk,
        getDesks,
        getDesklists,
        updateDesk
    }
}