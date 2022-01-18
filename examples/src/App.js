/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react'
import Highlight from 'react-highlight'
import analytics from './analytics'
import GitHubButton from 'react-github-btn'

const BASE_URL =
  'https://raw.githubusercontent.com/madox2/react-tagcloud/master/examples/src/'

const examples = [
  { file: 'simple-cloud.js', title: 'Simple cloud' },
  { file: 'interactive-cloud.js', title: 'Interactive cloud' },
  { file: 'custom-color-options.js', title: 'Custom color options' },
  { file: 'custom-styles.js', title: 'Custom styles' },
  { file: 'tag-props.js', title: 'Custom tag props' },
  { file: 'custom-renderer.js', title: 'Custom renderer' },
  { file: 'shuffle-with-seed.js', title: 'Shuffle with seed' },
].map((example, key) => ({ ...example, key }))

class App extends React.Component {
  componentDidMount() {
    analytics.pageview()
  }
  render() {
    return (
      <main>
        <header>
          <h1>Tag cloud for React</h1>
          <h3>
            react-tagcloud examples
            <a
              className="github-link"
              href="https://github.com/madox2/react-tagcloud"
            >
              <i className="fa fa-github fa-lg"></i>
            </a>
          </h3>

          <h3>
            <GitHubButton
              className="github-button"
              href="https://github.com/madox2/react-tagcloud"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star madox2/react-tagcloud on GitHub"
            >
              Star
            </GitHubButton>
          </h3>
        </header>
        <section>
          <article>
            <div>
              <h2>Quickstart</h2>
              <div className="detail-wrapper">
                <Highlight className="javascript code-preview">
                  {`
npm install react-tagcloud
                `.trim()}
                </Highlight>
              </div>
              <div className="detail-wrapper">
                <Highlight className="javascript code-preview">
                  {`
const data = [
  { value: 'JavaScript', count: 38 },
  { value: 'React', count: 30 },
  { value: 'Nodejs', count: 28 },
  { value: 'Express.js', count: 25 },
  { value: 'HTML5', count: 33 },
  { value: 'MongoDB', count: 18 },
  { value: 'CSS3', count: 20 },
]

const SimpleCloud = () => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
  />
)
                `.trim()}
                </Highlight>
              </div>
              <p>
                Documentation:{' '}
                <a href="https://github.com/madox2/react-tagcloud">
                  https://github.com/madox2/react-tagcloud
                </a>
              </p>
            </div>
          </article>
        </section>
        <section>
          {examples.map((e) => (
            <Example
              title={e.title}
              element={require(`./${e.file}`).default}
              file={e.file}
              key={e.key}
            />
          ))}
        </section>
        <footer>
          <p>
            2022 <a href="http://madox2.poriadne.sk">madox2</a>
          </p>
        </footer>
      </main>
    )
  }
}

class Example extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = { expanded: false, fetched: false, detail: '' }
    this.toggleDetail = this.toggleDetail.bind(this)
  }

  toggleDetail(e) {
    this.setState({ expanded: !this.state.expanded })
    if (!this.state.fetched) {
      analytics.codeExpanded()
      this.fetch()
    }
    e.preventDefault()
  }

  fetch() {
    fetch(BASE_URL + this.props.file)
      .then((response) => response.text())
      .then((text) => {
        this.setState({
          fetched: true,
          detail: text,
        })
      })
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
            <a href="#" onClick={this.toggleDetail}>
              {this.state.expanded
                ? '\u25BC source code'
                : '\u25B6 source code'}
            </a>
            {this.state.expanded && (
              <Highlight className="javascript code-preview">
                {this.state.fetched ? this.state.detail : 'Loading...'}
              </Highlight>
            )}
          </div>
        </div>
      </article>
    )
  }
}

export default App
