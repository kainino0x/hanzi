import { html, render, Component } from 'https://unpkg.com/htm/preact/index.mjs?module'

class App extends Component {
  state = {
    font: 'textbook',
    fontSizeLog: 73,
    text: 'a 糸　栈棧桟',
  };

  setFont = ev => {
    if (ev.target.checked) this.setState({ font: ev.target.value });
    return false;
  };

  setFontSize = ev => {
    this.setState({ fontSizeLog: Number(ev.target.value) });
  };

  setText = ev => {
    this.setState({ text: ev.target.value });
  };

  syncScroll = ev => {
    if (ev.target._syncing) {
      ev.target._syncing = false;
      return;
    }
    for (const el of document.querySelectorAll('.txtline')) {
      if (el === ev.target) continue;
      const newScrollLeft = Math.round(ev.target.scrollLeft / ev.target.scrollWidth * el.scrollWidth);
      if (Math.round(el.scrollLeft) !== newScrollLeft) {
        el._syncing = true;
        el.scrollLeft = newScrollLeft;
      }
    }
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
      <br />
      <input type=range id=fontsize min=25 max=100 value="${this.state.fontSizeLog}" oninput=${this.setFontSize} />
      <style>.txtline { font-size: ${Math.pow(1.05, this.state.fontSizeLog) + 'pt'}; }</style>
      <div id=txt class="${this.state.font}">
        <label><h2>zh-hans</h2>
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=zh-hans />
        </label>
        <br />
        <label><h2>zh-hant</h2>
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=zh-hant />
        </label>
        <br />
        <label><h2>ja</h2>
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=ja />
        </label>
        <label><h2>zh-hk</h2>
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=zh-hk />
        </label>
        <label><h2>ko</h2>
          <input type=text class=txtline value="${this.state.text}" oninput=${this.setText} onscroll=${this.syncScroll} lang=ko />
        </label>
      </div>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
