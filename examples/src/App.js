import React from "react";
import Highlight from "react-highlight";

const BASE_URL = 'https://raw.githubusercontent.com/madox2/react-tagcloud/master/examples/src/';

const examples = [
  {file: 'simple-cloud.js', title: 'Simple cloud', key: 1},
  {file: 'custom-color-options.js', title: 'Custom color options', key: 2},
  {file: 'custom-styles.js', title: 'Custom styles', key: 3},
  {file: 'custom-renderer.js', title: 'Custom renderer', key: 4}
];

const App = () => (
  <main>
    <header>
      <h1>Tag cloud for React</h1>
      <h3>react-tagcloud examples</h3>
    </header>

    <section>
    {examples.map(e => (
      <Example title={e.title} element={require(`./${e.file}`).default} file={e.file} key={e.key} />
    ))}
    </section>
    <footer>
      <p>2016 madox2</p>
    </footer>
  </main>
);

class Example extends React.Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { expanded: false, fetched: false, detail: '' };
    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(e) {
    this.setState({ expanded: !this.state.expanded });
    if (!this.state.fetched) {
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
        <h2>{this.props.title}</h2>
        {React.createElement(this.props.element)}
        <div className="detail-wrapper">
          <a href="#" onClick={this.toggleDetail}>{this.state.expanded ? '\u25B2 hide' : '\u25BC show code'}</a>
          {this.state.expanded && this.state.fetched && (
            <Highlight className="javascript code-preview">
              {this.state.detail}
            </Highlight>
          )}
        </div>
      </article>
    );
  }
}

export default App;
