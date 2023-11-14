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


    const storeDesklist = async (data) => {
        errors.value = ''
        try {
            await axios.post('/desklists', data )
            await router.push({name: 'desklist.index'})

         
        } catch (e) {
            if (e.response.status === 405) {
                errors.value = undefined
            } else {
                if (e.response.status === 422) {
                    
                    errors.value = ''
                    for (const key in e.response.data.errors) {
                        errors.value = e.response.data.errors[key][0] + ' ';
                    }
                }
            }


        }
    }
    const updateDesklist = async (desklist) => {
        errors.value = ''
        try {
            await axios.put('/desklists/' + desklist.id, desklist, {
                params: {

                },
            })
            await router.push({name: 'desklist.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyDesklist = async (id) => {
        await axios.delete(`/desklists/${id}`);
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
        storeDesklist,
        updateDesklist,
        destroyDesklist
    }
}