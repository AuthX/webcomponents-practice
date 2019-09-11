class TableComponent extends HTMLElement {
    connectedCallback() {
        this.rows = this.querySelectorAll('tr')
        this.querySelector('#filter-input').addEventListener('input', evt => this.filterTable(evt))
        this.querySelector('#table-filter').addEventListener('reset', () => this.resetTable())
    }

    filterTable(evt) {
        this.rows.forEach(row => {
            const cellValue = row.cells[1].innerText.toLowerCase(), //right now this always looks at the second column
                filterValue = evt.target.value.toLowerCase()

            if (!row.rowIndex == 0) {
                if (!cellValue.includes(filterValue)) row.hidden = true
                else row.hidden = false
            }
        })
    }

    resetTable() {
        this.rows.forEach(row => row.hidden = false)
    }
}

customElements.define('table-component', TableComponent)