import './table.css'

class TableComponent extends HTMLElement {
    connectedCallback() {
        this.columns = this.querySelector('thead > tr')
        this.tableBody = this.querySelector('tbody')
        this.rows = Array.from(this.tableBody.querySelectorAll('tr'))
        this.filterCol = 1  //right now this always looks at the second column
        this.sortCol = 2    //right now this always sorts on the third column
        this.sortState = null

        this.querySelector('#filter-input').addEventListener('input', evt => this.filterTable(evt))
        this.querySelector('#table-filter').addEventListener('reset', () => this.resetTable())
        this.columns.cells[this.sortCol].classList.add('sort-col')
        this.columns.cells[this.sortCol].addEventListener('click', () => this.sortTable())
    }

    filterTable(evt) {
        this.rows.forEach(row => {
            const cellValue = row.cells[this.filterCol].innerText.toLowerCase(),
                filterValue = evt.target.value.toLowerCase()

            if (!cellValue.includes(filterValue)) row.hidden = true
            else row.hidden = false
        })
    }

    sortTable() {
        let output = document.createDocumentFragment()
        const render = sortedRows => {
            //clear out tbody
            for (let r = this.tableBody.firstChild; r !== null; r = this.tableBody.firstChild)
                this.tableBody.removeChild(r)

            this.tableBody.appendChild(sortedRows)
            this.rows = Array.from(this.tableBody.querySelectorAll('tr'))
            if (this.sortState == 'asc') {
                this.columns.cells[this.sortCol].classList.remove('desc')
                this.columns.cells[this.sortCol].classList.add('asc')
            }
            if (this.sortState == 'desc') {
                this.columns.cells[this.sortCol].classList.remove('asc')
                this.columns.cells[this.sortCol].classList.add('desc')
            }
        }

        //toggle sort state
        switch (this.sortState) {
            case null:
                this.sortState = 'asc'
                break
            case 'asc':
                this.sortState = 'desc'
                break
            case 'desc':
                this.sortState = 'asc'
                break
            default:
                break
        }

        this.rows.sort((a, b) => {
            const aValue = Number.parseInt(a.cells[this.sortCol].innerText)
            const bValue = Number.parseInt(b.cells[this.sortCol].innerText)
            if (this.sortState == 'desc') return bValue - aValue
            else return aValue - bValue
        })

        this.rows.forEach(row => output.appendChild(row.cloneNode(true)))
        render(output)
    }

    resetTable() {
        this.rows.forEach(row => row.hidden = false)
    }
}

customElements.define('table-component', TableComponent)