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


    const storeDesk = async (data) => {
      
        try {
            await axios.post('/desks', data)
            await router.push('/desks')
   
            errors.value = ''
        } catch (e) {
            errors.value = ''
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors[key][0] + ' ';
                }
            }
        }
 
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
    
    const destroyDesk = async (id) => {
        await axios.delete(`/desks/${id}`)
    }

    return {
        errors,
        desk,
        desks,
        getDesks,
        DeskShow,
        updateDesk,
        destroyDesk,
        storeDesk,

    }
}