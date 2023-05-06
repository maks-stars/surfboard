const form = document.querySelector('.form');

const validateField = (field) => {
    if (field.value.trim().length) {
        field.classList.remove('radio_error')
        return true
    } else {
        field.classList.add('radio_error')
        return false
    }
}

const validateForm = (data) => {
    let valid = true

    for (const key in data) {
        const element = data[key];

        const validField = validateField(element)
        
        if (!validField) {
            valid = false
        }
    }

    return valid
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const data = {
        name: form.elements.name,
        phone: form.elements.phone,
        comment: form.elements.comment,
    }

    if (validateForm(data)) {
        console.log('форма валидна, отправляем запрос')
    } else {
        console.log('запрос не отправляем, ждём заполнения формы')
    }
    
})
