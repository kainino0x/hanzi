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
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'textbook'} value=textbook />textbook</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'sans'} value=sans />sans-serif</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'serif'} value=serif />serif</label>
      <ul class="${this.state.font}">
        <li lang=zh-hans><input class=txt type=text value="${this.state.text}" oninput=${this.setText} /></li>
        <li lang=zh-hant><input class=txt type=text value="${this.state.text}" oninput=${this.setText} /></li>
        <li lang=ja><input class=txt type=text value="${this.state.text}" oninput=${this.setText} /></li>
      </ul>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
