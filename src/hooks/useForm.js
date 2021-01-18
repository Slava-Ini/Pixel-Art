import {useEffect, useState} from 'react'

const useForm = (validate) => {

    const [values, setValues] = useState({email: '', password: ''})
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setErrors(validate(values))
    }, [values, setValues, validate])

    const handleChange = event => {
        const {name, value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [errors])

    return {
        handleSubmit,
        handleChange,
        values,
        errors,
        disabled
    }
}

export default useForm