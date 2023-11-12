import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
 
export default function useDesks() {
    const desk = ref([])
    const desks = ref([])
 
    const errors = ref('')
    const router = useRouter()
 
    const getDesks = async () => {
        let response = await axios.get('/desks')
        desks.value = response.data.data
    }

    const DeskShow = async (id) => {
        let response = await axios.get('/desks/' + id)
        desk.value = response.data.data
    }

    const updateDesk = async (id) => {
        
        try {
            await axios.patch(`/desks/${id}`, desk.value)
            await router.push('/desks')
        } catch (e) {
            errors.value = true
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
 
    return {
        errors,
        desk,
        desks,
        getDesks,
        DeskShow,
        updateDesk
    }
}