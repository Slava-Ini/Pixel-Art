import {useEffect, useState} from 'react'
import {projectFirestore} from '../firebase/config'

const useFirestore = collection => {

    const [avatars, setAvatars] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        const unsub = projectFirestore.collection(collection)
            .onSnapshot(snap => {
                let documents = []
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
                })
                setAvatars(documents)
                setImages(documents)
            })
        return () => unsub()
    }, [collection])
    return {avatars, images}
}

export default useFirestore