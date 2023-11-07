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
 
    return {
        errors,
        desk,
        desks,
        getDesks,
        DeskShow
    }
}