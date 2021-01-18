import axios from 'axios'

export default axios.create({
    baseURL: 'https://pixel-art-f969a.firebaseio.com/gallery'
})