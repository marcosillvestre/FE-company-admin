import axios from 'axios'

export const fetchapi = axios.create({
    baseURL: 'http://localhost:5050'
})

async function kkk() {
    const kk = await fetchapi.get('cadastro')

    console.log(kk)
}

kkk()