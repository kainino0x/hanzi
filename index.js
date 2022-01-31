import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'

class App extends Component {
  state = {
    font: 'textbook',
    text: '栈棧桟',
  }

  setFont = ev => {
    if (ev.target.checked) this.setState({ font: ev.target.value });
    return false;
  }

  setText = ev => {
    this.setState({ text: ev.target.value });
  }

  render() {
    return html`
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'textbook'}  value=textbook  />textbook</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'notosans'}  value=notosans  />Noto Sans</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'notoserif'} value=notoserif />Noto Serif</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'syssans'}   value=syssans   />sans-serif</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'sysserif'}  value=sysserif  />serif</label>
      <div id=txt class="${this.state.font}">
        <label>
          <div class=langlabel>zh-hans</div>
          <span lang=zh-hans>${this.state.text}</span>
          <br />
          <input lang=zh-hans type=text value="${this.state.text}" oninput=${this.setText} />
        </label>
        <br />
        <label>
          <div class=langlabel>zh-hant</div>
          <span lang=zh-hant>${this.state.text}</span>
          <br />
          <input lang=zh-hant type=text value="${this.state.text}" oninput=${this.setText} />
        </label>
        <br />
        <label>
          <div class=langlabel>ja</div>
          <span lang=ja>${this.state.text}</span>
          <br />
          <input lang=ja type=text value="${this.state.text}" oninput=${this.setText} />
        </label>
      </div>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
