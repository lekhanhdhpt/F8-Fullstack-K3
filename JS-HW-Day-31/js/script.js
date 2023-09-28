class CountdownTimer extends HTMLElement {
  constructor() {
    super();
    this.duration = parseInt(this.getAttribute("duration")) || 30;
    this.attachShadow({ mode: "open" });
    this.renderTime();
    this.lastTimestamp = 0;
    this.delay = 1000;
    this.isCounting = true;
    this.updateTimer();
  }

  renderTime() {
    const counterElement = document.createElement("div");
    counterElement.classList.add("counter");
    counterElement.textContent = this.duration;
    this.shadowRoot.appendChild(counterElement);

    const style = document.createElement("style");
    style.textContent = `
          .counter {
            align-items: center;
            background: #ff9100;
            border-radius: 50%;
            color: #fff;
            display: flex;
            font-size: 2rem;
            height: 50px;
            justify-content: center;
            margin: 30px auto;
            padding: 15px;
            width: 50px;
          }
        `;
    this.shadowRoot.appendChild(style);
  }

  updateTimer() {
    const counterElement = this.shadowRoot.querySelector(".counter");
    const timestamp = performance.now();

    if (timestamp - this.lastTimestamp >= this.delay && this.isCounting) {
      if (this.duration >= 0) {
        counterElement.textContent = this.duration;
        this.duration--;
        const actionButton = document.querySelector(".btn");
        if (actionButton) {
          actionButton.disabled = true;
        }
      } else {
        this.isCounting = false;
        const actionButton = document.querySelector(".btn");
        if (actionButton) {
          actionButton.disabled = false;
          actionButton.addEventListener("click", function () {
            window.location.href = "https://fullstack.edu.vn";
          });
        }
      }
      this.lastTimestamp = timestamp;
    }

    if (this.isCounting) {
      requestAnimationFrame(() => this.updateTimer());
    }
  }
}

customElements.define("countdown-timer", CountdownTimer);
