import React from "react";
import Highlight from "react-highlight";
import analytics from "./analytics";

const BASE_URL = 'https://raw.githubusercontent.com/madox2/react-tagcloud/master/examples/src/';

const examples = [
  {file: 'simple-cloud.js', title: 'Simple cloud', key: 1},
  {file: 'custom-color-options.js', title: 'Custom color options', key: 2},
  {file: 'custom-styles.js', title: 'Custom styles', key: 3},
  {file: 'custom-renderer.js', title: 'Custom renderer', key: 4}
];

class App extends React.Component {
  componentDidMount() {
    analytics.pageview();
  }
  render() {
    return (
      <main>
        <header>
          <h1>Tag cloud for React</h1>
          <h3>
            react-tagcloud examples
            <a className='github-link' href='https://github.com/madox2/react-tagcloud'>
              <i className='fa fa-github fa-lg'></i>
            </a>
          </h3>
        </header>
        <section>
        {examples.map(e => (
          <Example title={e.title} element={require(`./${e.file}`).default} file={e.file} key={e.key} />
        ))}
        </section>
        <footer>
          <p>2018 <a href='http://madox2.poriadne.sk'>madox2</a></p>
        </footer>
      </main>
    )
  }
}

class Example extends React.Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { expanded: false, fetched: false, detail: '' };
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(e) {
    this.setState({ expanded: !this.state.expanded });
    if (!this.state.fetched) {
      analytics.codeExpanded();
      this.fetch();
    }
    e.preventDefault();
  }

  fetch() {
    fetch(BASE_URL + this.props.file)
    .then(response => response.text())
    .then(text => {
      this.setState({
        fetched: true,
        detail: text
      });
    });
  }

  render() {
    return (
      <article>
        <div>
          <h2>{this.props.title}</h2>
          <div className="cloud-wrapper">
            {React.createElement(this.props.element)}
          </div>
          <div className="detail-wrapper">
            <a href="#" onClick={this.toggleDetail}>{this.state.expanded ? '\u25B2 hide' : '\u25BC show code'}</a>
            {this.state.expanded && this.state.fetched && (
              <Highlight className="javascript code-preview">
                {this.state.detail}
              </Highlight>
            )}
          </div>
        </div>
      </article>
    );
  }
}

export default App;
