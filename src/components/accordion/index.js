import './accordion.css'

class AccordionComponent extends HTMLElement {
    connectedCallback() {
        Array.from(this.querySelectorAll('[data-header]')).forEach(header => {
            header.addEventListener('click', (e) => {
                e.preventDefault()

                this.collapseAll()
                header.nextElementSibling.hidden = false
            })
        })
    }

    collapseAll() {
        Array.from(this.querySelectorAll('[data-body]')).forEach(body => {
            body.hidden = true
        })
    }
}
customElements.define('accordion-component', AccordionComponent)