import './clock.css'

class CLockComponent extends HTMLElement {
    connectedCallback() {
        var div = document.getElementById('clock');
        var today = new Date();
        var time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        div.innerHTML = time;

        setInterval(function () {
            document.getElementById('clock').innerHTML = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        }, 1000);
    }
}
customElements.define('clock-component', CLockComponent)