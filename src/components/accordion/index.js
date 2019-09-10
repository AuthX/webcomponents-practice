import './accordion.css'

class AccordionComponent extends HTMLElement {
    connectedCallback() {
        this.accordion = Array.from(this.querySelectorAll('summary'))
        this.accordion.forEach(panel => 
            panel.addEventListener('click', () => this.collapseOthers(panel)))
    }

    collapseOthers(toggled) {
        this.accordion.forEach(panel => {
            if (!toggled.isSameNode(panel)) panel.parentNode.open = false
        })
    }
}
customElements.define('accordion-component', AccordionComponent)