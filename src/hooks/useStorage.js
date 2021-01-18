import {useEffect, useState} from 'react'
import {projectFirestore, projectStorage, timestamp} from '../firebase/config'

const useStorage = (
    file,
    userName,
    category,
    size,
    name,
    userId,
    path,
    collection,
    shouldUpload
) => {
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (shouldUpload) {
            const storageRef = projectStorage.ref(path + file.name)
            const collectionRef = projectFirestore.collection(collection)
            storageRef.put(file).on(
                'state_changed',
                snap => {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
                    setProgress(percentage)
                },
                err => setError(err),
                async () => {
                    const url = await storageRef.getDownloadURL()
                    const createdAt = timestamp()
                    setUrl(url)
                    switch (collection) {
                        case 'images':
                            return collectionRef.add({url, createdAt, userName, category, size, name, userId, userLiked: []})
                        case 'avatars':
                            return collectionRef.add({url, createdAt, userId, name})
                        default:
                            return null
                    }
                }
            )
        }
    }, [
        userName,
        category,
        size,
        name,
        userId,
        path,
        collection,
        shouldUpload
    ])

    return {url, error, progress}
}

export default useStorage