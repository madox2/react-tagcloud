import ReactGA from 'react-ga';

if (process.env.NODE_ENV !== 'production') {
  ReactGA.initialize('UA-000000-01', { debug: true  });
} else {
  ReactGA.initialize('UA-87163647-1');
}

const pageview = () => ReactGA.pageview('/');

const codeExpanded = () => ReactGA.event({
  category: 'User',
  action: 'Expanded Code Preview'
});

const analytics = { pageview, codeExpanded };


export default analytics;
