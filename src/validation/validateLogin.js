const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export default function validateLogin(values) {
    let errors = {}
    if (!values.email) {
        errors.email = 'Email address is required'
    } else if (!re.test(values.email)) {
        errors.email = 'Email address is invalid'
    }
    if (!values.password) {
        errors.password = 'Password is required'
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 or more characters'
    }

    return errors
}