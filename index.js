//import { html, render, Component } from 'https://unpkg.com/htm@3.1.0/preact/index.mjs?module'

import { h, Component, render } from 'https://unpkg.com/preact@^10?module';
import htm from 'https://unpkg.com/htm@^3?module';

const html = htm.bind(h);

class Row extends Component {
  render() {
    return html`
      <label><h2>${this.props.lang}</h2>
        <textarea class=txtline rows=1 lang=${this.props.lang}
          oninput=${this.props.app.setText}
          onscroll=${this.props.app.syncSizeAndScroll}
          ref=${ref => {
            if (ref) {
              new ResizeObserver(() => {
                this.props.app.syncSizeAndScroll({ target: ref });
              }).observe(ref);
            }
          }}
        >${this.props.app.state.text}</textarea>
      </label>
    `;
  }
}

class App extends Component {
  state = {
    font: 'textbook',
    fontSizeLog: 73,
    text: '糸　栈棧桟　䯑',
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

  syncSizeAndScroll = ev => {
    if (ev.target._syncing) {
      ev.target._syncing = false;
      return;
    }

    for (const el of document.querySelectorAll('.txtline')) {
      if (el === ev.target) continue;

      el._syncing = true;
      el.style.width = ev.target.offsetWidth + 'px';
      el.style.height = ev.target.offsetHeight + 'px';
      el.scrollLeft = ev.target.scrollLeft / ev.target.scrollWidth * el.scrollWidth;
      el.scrollTop = ev.target.scrollTop / ev.target.scrollHeight * el.scrollHeight;
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
        <${Row} app=${this} lang=zh-hans />
        <${Row} app=${this} lang=zh-hant />
        <${Row} app=${this} lang=ja      />
        <${Row} app=${this} lang=zh-hk   />
        <${Row} app=${this} lang=ko      />
      </div>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
