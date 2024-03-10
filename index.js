import { h, Component, render } from 'https://unpkg.com/preact@^10?module';
import htm from 'https://unpkg.com/htm@^3?module';

const html = htm.bind(h);

const fontfamilies = {
  'zh-hans Textbook': 'my KaiTi',
  'zh-hant Textbook': 'my DFKai-SB',
  'ja Textbook': 'my EPSON 教科書体Ｍ',

  'ja Workbook': 'my UD Digi Kyokasho N-R',

  'zh-hans NotoSerif': 'Noto Serif SC',
  'zh-hant NotoSerif': 'Noto Serif TC',
  'ja NotoSerif': 'Noto Serif JP',
  'ko NotoSerif': 'Noto Serif KR',

  'zh-hans NotoSans': 'Noto Sans SC',
  'zh-hant NotoSans': 'Noto Sans TC',
  'ja NotoSans': 'Noto Sans JP',
  'zh-hk NotoSans': 'Noto Sans HK',
  'ko NotoSans': 'Noto Sans KR',
};

class Option extends Component {
  setState = ev => {
    this.props.app.setState(state => ({
      ...state,
      [this.props.optkey]: {
        ...state[this.props.optkey],
        [this.props.optvalue]: ev.target.checked
      },
    }));
  };

  render() {
    return html`
      <label>
        <input type=checkbox
          onchange=${this.setState}
          checked=${this.props.app.state[this.props.optkey][this.props.optvalue]}
          value=${this.props.optvalue} />
        ${this.props.optvalue}
      </label>`;
  }
}

class Row extends Component {
  render() {
    let key, fontfamily;
    if (this.props.font === 'serif') {
      fontfamily = 'serif';
    } else if (this.props.font === 'sans-serif') {
      fontfamily = 'sans-serif';
    } else {
      key = `${this.props.lang} ${this.props.font}`;
      fontfamily = fontfamilies[key];
      if (!fontfamily) return;
    }

    if (!this.props.app.state.fonts[this.props.font]) return;
    if (!this.props.app.state.langs[this.props.lang]) return;

    return html`
      <h2 class="txtkey">${key}</h2>
      <div class="txtline" lang="${this.props.lang}"
        style='font-family: "${fontfamily}", "my Adobe NotDef";'
      >${this.props.app.state.text.trim()}</div>
    `;
  }
}

class App extends Component {
  state = {
    fontSizeLog: 44,
    text: '糸　栈棧桟　䯑　心　り',
    fonts: {
      Textbook: true,
      Workbook: true,
      NotoSerif: true,
      NotoSans: true,
      serif: false,
      'sans-serif': false,
    },
    langs: {
      'zh-hans': true,
      'zh-hant': true,
      'zh-hk': false,
      'ja': true,
      'ko': false,
    },
  };

  setFontSize = ev => {
    this.setState({ fontSizeLog: Number(ev.target.value) });
  };

  setText = ev => {
    this.setState({ text: ev.target.value });
  };

  render() {
    return html`
      <style>
        .txtline {
          font-size: ${Math.pow(1.05, this.state.fontSizeLog)}vw;
        }
      </style>
      <table id=settings>
        <tr id=opts>
          <td>
            ${Object.keys(this.state.fonts).map(font => html`<${Option} app=${this} optkey=fonts optvalue="${font}" />`)}
          </td>
          <td>
            ${Object.keys(this.state.langs).map(lang => html`<${Option} app=${this} optkey=langs optvalue="${lang}" />`)}
          </td>
        </tr>
        <tr>
          <td colspan=2>
            <!-- page is lang=en, but this input box has unknown language -->
            <textarea id=textin lang="" oninput=${this.setText}>${this.state.text}</textarea>
          </td>
        </tr>
        <tr>
          <td colspan=2 id=fontsizepar>
            <input type=range id=fontsize min=0 max=93 value="${this.state.fontSizeLog}" oninput=${this.setFontSize} />
          </td>
        </tr>
      </table>
      <div id=txt>
        ${(() => {
          const rows = [];
          for (const font of Object.keys(this.state.fonts)) {
            for (const lang of Object.keys(this.state.langs)) {
              rows.push(html`<${Row} app=${this} lang=${lang} font=${font} />`);
            }
            rows.push(html`<hr />`);
          }
          return rows;
        })()}
      </div>
    `;
  }
}

globalThis.app = html`<${App} />`;
render(app, document.body);
