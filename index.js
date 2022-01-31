import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'

class App extends Component {
  state = {
    font: 'textbook',
    text: 'a 糸　栈棧桟',
  };

  setFont = ev => {
    if (ev.target.checked) this.setState({ font: ev.target.value });
    return false;
  };

  setText = ev => {
    this.setState({ text: ev.target.value });
  };

  syncing = false;
  syncScroll = ev => {
    if (this.syncing) return;
    this.syncing = true;
    for (const el of document.querySelectorAll('.txtline')) {
      if (el === ev.target) continue;
      el.scrollLeft = ev.target.scrollLeft / ev.target.scrollWidth * el.scrollWidth;
    }
    setTimeout(() => { this.syncing = false; }, 10);
  };

  render() {
    return html`
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'textbook'}  value=textbook  />textbook</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'workbook'}  value=workbook  />workbook</label>
      <br />
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'notoserif'} value=notoserif />Noto Serif</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'sysserif'}  value=sysserif  />serif</label>
      <br />
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'notosans'}  value=notosans  />Noto Sans</label>
      <label><input type=radio name=font onchange=${this.setFont} checked=${this.state.font == 'syssans'}   value=syssans   />sans-serif</label>
      <div id=txt class="${this.state.font}">
        <label>
          <div class=langlabel>zh-hans</div>
          <span lang=zh-hans>${this.state.text}</span>
          <br />
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=zh-hans />
        </label>
        <br />
        <label>
          <div class=langlabel>zh-hant</div>
          <span lang=zh-hant>${this.state.text}</span>
          <br />
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=zh-hant />
        </label>
        <br />
        <label>
          <div class=langlabel>ja</div>
          <span lang=ja>${this.state.text}</span>
          <br />
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=ja />
        </label>
      </div>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
