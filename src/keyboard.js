const DEFAULT_DARK_COLOR = {
  containerBackgroundColor: "rgba(15,20,25,0.8)",
  keyBackgroundColor: "#5E6670",
  keyColor: "#ddd",
  headerBackgroundColor: "#5E6670",
  headerColor: "#ddd",
  doneBtnBackgroundColor: "#1683fb",
  doneBtnColor: "#fff",
  btnFocusColor: "#ddd",
};

const DEFAULT_LIGHT_COLOR = {
  containerBackgroundColor: "rgba(210, 210, 210, .9)",
  keyBackgroundColor: "#f1f1f1",
  keyColor: "#333",
  headerBackgroundColor: "#eee",
  headerColor: "#333",
  doneBtnBackgroundColor: "#1683fb",
  doneBtnColor: "#eee",
  btnFocusColor: "#ddd",
};

const containerTemplate = document.createElement("template");
containerTemplate.innerHTML = `
  <style>
  .keyboard-input {
    height: 30px;
    width: auto;
    border: 1px solid black;
    display: flex;
    align-items: center;
  }
  .keyboard-input-values{
    display: flex;
    overflow: hidden;
    padding: 0 2px;
  }
  .keyboard-input-cursor{
    height: 20px;
    width: 1px;
    background-color: #222;
    visibility: hidden;
  }
  .keyboard-input-cursor-focus{
    animation:flash 1s infinite;
    visibility: visible !important;
  }

  @keyframes flash {
  0% {opacity: 1;}
  45% {opacity: 1;}
  55% {opacity: 0;}
  100% {opacity:0;}
  }
  </style>
  <div class="keyboard-binder">
    <div class="keyboard-input">
    <div class="keyboard-input-values"></div>
    <div class="keyboard-input-cursor"></div>  
    </div>
  </div>
`;

const styleTemplate = document.createElement("template");
styleTemplate.innerHTML = `
<style>
  .keyboard-container {
    visibility: hidden;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    padding-bottom: 20px;
  }
  .keyboard-show{
    visibility: visible !important;
  }

  .keyboard-header {
    height: 32px;
    text-align: right;
    line-height: 32px;
    padding-right: 12px;
    text-align: center;
    font-size: 22px;
  }

  .keyboard-keys-container{
    display: flex;
    padding: 0 4px;
  }
  .keyboard-value-keys{
    flex: 3;
  }
  .keyboard-control-keys{
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .keyboard-key-del{
    margin: 10px 0;
  }
  .keyboard-key-done{
    flex: 3;
    display: flex;
  }
  .keyboard-key-done > .keyboard-key-btn {
    height: 170px;
  }

  .keyboard-dynamic-keys{
    display: flex;
  }

  .keyboard-dynamic-keys > .keyboard-fixed-key {
    flex: 2;
  }

  .keyboard-dynamic-key.hide {
    flex: 0;
  }

  .keyboard-row{
    display: flex;
    margin: 10px 0;
  }

  .keyboard-key {
    flex: 1;
    display: flex;
  }

  .keyboard-key-btn {
    height: 50px;
    flex: 1;
    margin: 0 6px;
    border-radius: 4px;
    border: none;
    outline: none;
    font-size: 22px;
  }

  .keyboard-key-btn:active {
    background-color: #999;
  }

</style>
`;

const keys = [
  [
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
  ],
  [
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6" },
  ],
  [
    { key: "7", label: "7" },
    { key: "8", label: "8" },
    { key: "9", label: "9" },
  ],
];

const digitalKey =
  '<button class="keyboard-key-btn keyboard-dynamic-btn" label=".">.</button>';
const idKey =
  '<button class="keyboard-key-btn keyboard-dynamic-btn" label="x">X</button>';

const keyboardTemplate = document.createElement("template");
keyboardTemplate.innerHTML = `
  <div class="keyboard-container">
    <div class="keyboard-header">
      <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10386"><path d="M26.396 346.112l431.56 431.56c0.91 1.023 1.934 2.047 2.844 3.071 28.444 28.445 74.41 28.445 102.855 0L997.49 346.908c28.444-28.444 28.444-74.41 0-102.855s-74.41-28.444-102.855 0L512.34 626.347l-383.09-383.09c-28.444-28.445-74.41-28.445-102.855 0-28.33 28.444-28.33 74.41 0 102.855z" p-id="10387"></path></svg>
    </div>
    <div class="keyboard-keys-container">
        <div class="keyboard-value-keys">
          <div>
          ${keys
            .map((row) => {
              return `<div class="keyboard-row">${row
                .map((key) => {
                  return `<div class="keyboard-key"><button class="keyboard-key-btn" label="${key.key}">${key.label}</button></div>`;
                })
                .join("")}</div>`;
            })
            .join("")}
          </div>
          <div class="keyboard-dynamic-keys">
            <div class="keyboard-key keyboard-dynamic-key">
            </div>
            <div class="keyboard-key keyboard-fixed-key">
              <button class="keyboard-key-btn" label="0">0</button>
            </div>
          </div>
        </div>
        <div class="keyboard-control-keys">
            <div class="keyboard-key keyboard-key-del">
              <button class="keyboard-key-btn delete" label="del">
                <svg class="icon" style="width: 1.4em; height: 1.4em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M542.165333 670.165333L640 572.330667l97.834667 97.834666 60.330666-60.330666L700.330667 512l97.834666-97.834667-60.330666-60.330666L640 451.669333l-97.834667-97.834666-60.330666 60.330666L579.669333 512l-97.834666 97.834667z"></path>
                  <path d="M308.522667 795.349333c8.149333 9.685333 20.138667 15.317333 32.810666 15.317334h554.666667a42.666667 42.666667 0 0 0 42.666667-42.666667V256a42.666667 42.666667 0 0 0-42.666667-42.666667H341.333333c-12.672 0-24.661333 5.632-32.810666 15.317334l-213.333334 256c-13.184 15.829333-13.184 38.826667 0 54.656l213.333334 256.042666zM361.344 298.666667H853.333333v426.666666H361.344l-177.792-213.333333 177.792-213.333333z"></path>
                </svg>
              </button>
            </div>
            <div class="keyboard-key-done">
              <button class="keyboard-key-btn done" label="done">Done</button>
            </div>
        </div>
    </div>
  </div>
`;

class MKeyboard extends HTMLElement {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.btnClick = this.btnClick.bind(this);
    this.closeKeyboard = this.closeKeyboard.bind(this);

    this._type = "number";
    this._theme = "light";
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(containerTemplate.content.cloneNode(true));

    this._keyboard = this.generateKeyboard();
    this.value = [];
    this._maxsize = 20;
  }

  static get observedAttributes() {
    return ["type", "theme", "maxsize", "value"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "type":
        this._type = newVal;
        this.updateDynamicKey(newVal);
        break;
      case "theme":
        this._theme = newVal;
        this.applyTheme();
        break;
      case "maxsize":
        this._maxsize = Number(newVal);
        break;
      case "value":
        this.value = typeof newVal === "string" ? newVal.split("") : [];
        this.updateInputValue(this.value);
        break;
      default:
        break;
    }
  }

  set type(value) {
    this._type = value;
    this.updateDynamicKey(this._type);
  }
  get type() {
    return this._type;
  }

  connectedCallback() {
    this.bindEvents();
    this.attachStyle();
  }

  generateKeyboard() {
    this._keyboardRoot = document.createElement("div");
    this._keyboardRoot.appendChild(keyboardTemplate.content.cloneNode(true));
    document.querySelector("body").appendChild(this._keyboardRoot);
    this.updateDynamicKey(this._type);

    return this._keyboardRoot.querySelector(".keyboard-container");
  }

  bindEvents() {
    this._shadowRoot
      .querySelector(".keyboard-binder")
      .addEventListener("click", this.show);
    this._keyboardRoot
      .querySelectorAll(".keyboard-key-btn")
      .forEach((ele) => ele.addEventListener("click", this.btnClick));
    this._keyboardRoot
      .querySelector(".keyboard-header")
      .addEventListener("click", this.closeKeyboard);
  }

  attachStyle() {
    const style = document.querySelector("#m-keyboard-style-container");
    if (!Boolean(style)) {
      const styleRoot = document.createElement("div");
      styleRoot.id = "m-keyboard-style-container";
      styleRoot.appendChild(styleTemplate.content.cloneNode(true));
      document.querySelector("body").appendChild(styleRoot);
    }

    this.applyTheme();
  }

  show() {
    this._keyboard.classList.add("keyboard-show");
    this._shadowRoot
      .querySelector(".keyboard-input-cursor")
      .classList.add("keyboard-input-cursor-focus");
  }

  hide() {
    this._keyboard.classList.remove("keyboard-show");
    this._shadowRoot
      .querySelector(".keyboard-input-cursor")
      .classList.remove("keyboard-input-cursor-focus");
  }

  closeKeyboard() {
    this.hide();
    this.dispatchEvent(
      new CustomEvent("onhide", {
        detail: this.value.join(""),
      })
    );
  }

  btnClick($event) {
    const value = $event.target.attributes.label.value;
    const pre = [...this.value];

    switch (value) {
      case "del":
        this.value.pop();
        break;
      case "done":
        this.doneInput();
        this.hide();
        break;
      default:
        this.value.push(value);
    }
    this.valueChange(pre);
    this.updateInputValue(this.value);
  }

  updateInputValue(value) {
    this._shadowRoot.querySelector(
      ".keyboard-input-values"
    ).innerHTML = `${value.map((v) => `<div>${v}</div>`).join("")}`;
  }

  valueChange(pre) {
    this.dispatchEvent(
      new CustomEvent("oninput", {
        detail: {
          oldVal: pre.join(""),
          newVal: this.value.join(""),
        },
      })
    );
  }

  doneInput() {
    this.dispatchEvent(
      new CustomEvent("onchange", {
        detail: this.value.join(""),
      })
    );
  }

  updateDynamicKey(type) {
    const container = this._keyboardRoot.querySelector(".keyboard-dynamic-key");
    switch (type) {
      case "number":
        container.classList.add("hide");
        break;
      case "digital":
        container.classList.remove("hide");
        container.innerHTML = digitalKey;
        break;
      case "idcard":
        container.classList.remove("hide");
        container.innerHTML = idKey;
        break;
      default:
        break;
    }
  }

  applyTheme() {
    const theme = document.querySelector("#keyboard-theme-container");
    if (Boolean(theme)) {
      theme.remove();
    }

    const isDark = this._theme === "dark";
    this._themeRoot = document.createElement("div");
    this._themeRoot.id = "keyboard-theme-container";
    this._themeRoot.innerHTML = `
    <style>
      .keyboard-container{background-color: ${
        isDark
          ? DEFAULT_DARK_COLOR.containerBackgroundColor
          : DEFAULT_LIGHT_COLOR.containerBackgroundColor
      };}
      .keyboard-key-btn{
        background-color: ${
          isDark
            ? DEFAULT_DARK_COLOR.keyBackgroundColor
            : DEFAULT_LIGHT_COLOR.keyBackgroundColor
        };
        color: ${
          isDark ? DEFAULT_DARK_COLOR.keyColor : DEFAULT_LIGHT_COLOR.keyColor
        };
      }
      .keyboard-key-btn.done{
        background-color: ${
          isDark
            ? DEFAULT_DARK_COLOR.doneBtnBackgroundColor
            : DEFAULT_LIGHT_COLOR.doneBtnBackgroundColor
        };
        color: ${
          isDark
            ? DEFAULT_DARK_COLOR.doneBtnColor
            : DEFAULT_LIGHT_COLOR.doneBtnColor
        };
      }
      .keyboard-header {
        background-color: ${
          isDark
            ? DEFAULT_DARK_COLOR.headerBackgroundColor
            : DEFAULT_LIGHT_COLOR.headerBackgroundColor
        }; 
        color: ${
          isDark
            ? DEFAULT_DARK_COLOR.headerColor
            : DEFAULT_LIGHT_COLOR.headerColor
        };
      }
      </style>
    `;

    document.querySelector("body").appendChild(this._themeRoot);
  }

  destroy() {
    this._keyboardRoot.remove();
    this._themeRoot.remove();
  }
}

window.customElements.define("m-keyboard", MKeyboard);
