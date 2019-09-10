import './accordion.css'

class AccordionComponent extends HTMLElement {
    connectedCallback() {
        const accordion = Array.from(this.querySelectorAll('[data-panel]'))
        accordion.forEach(panel => 
            panel.addEventListener('click', () => this.collapseOthers(accordion, panel)))
    }

    collapseOthers(accordion, toggled) {
        accordion.forEach(panel => {
            if (!toggled.isSameNode(panel)) panel.parentNode.open = false
        })
    }
}
customElements.define('accordion-component', AccordionComponent)