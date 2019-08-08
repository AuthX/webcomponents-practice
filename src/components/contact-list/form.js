class ContactForm extends HTMLElement {
    get email() {
        return this.querySelector('input[name="email"]')
    }
    get name() {
        return this.querySelector('input[name="name"]')
    }
    get phone() {
        return this.querySelector('input[name="phone"]')
    }
    get form() {
        return this.querySelector('form')
    }
    get list() {
        return this.parentElement.querySelector('contact-list')
    }
    connectedCallback() {
        console.log('Hooking', this.form)
        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            let contact = {
                email: this.email.value,
                name: this.name.value,
                phone: this.phone.value
            }
            this.email.value = ''
            this.phone.value = ''
            this.name.value = ''
            this.list.addContact(contact)
        })
    }
}
customElements.define('contact-form', ContactForm)