class ContactList extends HTMLElement {
    connectedCallback() {

    }
    
    addContact(contact) {
        let tpl = document.createElement('template')
        tpl.innerHTML = `
            <div class="card p-3 mr-2" style="width: 18rem; float: left" data-contact>
                <h5 class="card-title">
                    ${contact.name}
                </h5>
                <ul class="card-body">
                    <li>
                        Email Address<br /> ${contact.email}
                    </li>
                    <li>
                        Phone Number<br /> ${contact.phone}
                    </li>
                </ul>
                <a href="#" class="card-link" data-remove>Remove</a>
            </div>
        `

        this.appendChild(tpl.content)
        let contactEl = this.querySelector('[data-contact]:last-child')
        contactEl.querySelector('[data-remove]').addEventListener('click', e => {
            e.preventDefault()
            this.removeContact(contactEl)
        })
    }

    removeContact(el) {
        el.remove()
    }
}
customElements.define('contact-list', ContactList)