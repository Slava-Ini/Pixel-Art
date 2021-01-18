
import {projectFirestore, projectStorage} from './config'

const deleteFirebaseElement = (path, name, collection, doc) => {
    const storageRef = projectStorage.ref(path + name)
    const collectionRef = projectFirestore.collection(collection).doc(doc)
    // let successMessage = ''
    // let errorMessage = ''

    storageRef.delete()
    collectionRef.delete()
}

export default deleteFirebaseElement