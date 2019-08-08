const template = document.createElement("template");
template.innerHTML = `
  <style>
    #face {
      stroke-width: 2px;
      stroke: black;
      fill: white;
    }
    #hour, #min, #sec {
      stroke-width: 1px;
      fill: #333;
    }
    #sec { stroke: #f55; }
  </style>

  <div>
    <svg id="clock" viewBox="0 0 100 100">
      <circle id="face" cx="50" cy="50" r="45"/>
      <g id="hands">
        <rect id="hour" x="48.5" y="12.5" width="5" height="40" rx="2.5" ry="2.55" transform="rotate(45 50 50)"/>
        <rect id="min" x="48" y="12.5" width="3" height="40" rx="2" ry="2"/>
        <line id="sec" x1="50" y1="50" x2="50" y2="16" />
      </g>
    </svg>
  </div>
`;

customElements.define(
  "my-clock",
  class MyClock extends HTMLElement {
    $(selector) {
      return this.shadowRoot && this.shadowRoot.querySelector(selector);
    }

    constructor() {
      super();
      this.setSeconds = this.setSeconds.bind(this);
      this.setMinutes = this.setMinutes.bind(this);
      this.setHour = this.setHour.bind(this);
      const root = this.attachShadow({ mode: "open" });
      root.appendChild(template.content.cloneNode(true));

      setInterval(() => {
        const now = new Date();
        this.setSeconds(now.getSeconds());
        this.setMinutes(now.getMinutes());
        this.setHour(now.getHours());
      }, 1000);
    }

    setSeconds(sec) {
      this.$("#sec").setAttribute(
        "transform",
        `rotate(${(360 / 60) * sec} 50 50)`
      );
    }

    setMinutes(min) {
      this.$("#min").setAttribute(
        "transform",
        `rotate(${(360 / 60) * min} 50 50)`
      );
    }

    setHour(hour) {
      this.$("#hour").setAttribute(
        "transform",
        `rotate(${(360 / 12) * hour} 50 50)`
      );
    }
  }
);
