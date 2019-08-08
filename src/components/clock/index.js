//	The Clock
//		Create an element that displays the current time
//		Has the ability to change the timezone
//		* Bonus Round: Analog clock instead of digital


import './clock.css'

class ClockComponent extends HTMLElement {
    // gets called when the element is added to the page
    connectedCallback() {
		setInterval(() => {
			this.innerHTML =  
				`<div class="clock">
					<div class="clock__inner">
						${this.getTime()}
					</div>
				</div>`;
		}, 1000);
	}

	getTime() {
		return this.hours + this.separator + this.minutes + this.separator + this.seconds;
	}

	get date() {
		return new Date();
	}

	get separator() {
		return '<span class="clock__separator">:</span>';
	}

	get hours(){
		return `<p id="hours" class="clock__time">${this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours()}</p>`;
	}
	
	get minutes() {
		return `<p id="minutes" class="clock__time">${this.date.getMinutes() < 10 ? '0' + this.date.getMinutes() : this.date.getMinutes()}</p>`;
	}

	get seconds(){
		return `<p id="seconds" class="clock__time">${this.date.getSeconds() < 10 ? '0' + this.date.getSeconds() : this.date.getSeconds() }</p>`;
	}
}
customElements.define('clock-component', ClockComponent)