(this.webpackJsonpexamples=this.webpackJsonpexamples||[]).push([[0],{15:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(1),l=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}],o={luminosity:"light",hue:"blue"};t.default=function(){return u.a.createElement(c.TagCloud,{minSize:12,maxSize:35,colorOptions:o,tags:l,onClick:function(e){return console.log("clicking on tag:",e)}})}},16:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(1),l=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}],o=function(e,t,a){return u.a.createElement("span",{key:e.value,style:{animation:"blinker 3s linear infinite",animationDelay:"".concat(2*Math.random(),"s"),fontSize:"".concat(t/2,"em"),border:"2px solid ".concat(a),margin:"3px",padding:"3px",display:"inline-block",color:"white"}},e.value)};t.default=function(){return u.a.createElement(c.TagCloud,{tags:l,minSize:1,maxSize:5,renderer:o})}},17:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(1),l=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}];t.default=function(){return u.a.createElement(c.TagCloud,{minSize:12,maxSize:35,tags:l,style:{width:300,textAlign:"left"},className:"myTagCloud"})}},18:function(e,t,a){"use strict";a.r(t);var n=a(3),u=a(0),c=a.n(u),l=a(1),o=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}];t.default=function(){var e=Object(u.useState)(12),t=Object(n.a)(e,2),a=t[0],r=t[1],i=Object(u.useState)(35),s=Object(n.a)(i,2),v=s[0],p=s[1],d=Object(u.useState)(o),m=Object(n.a)(d,2),f=m[0],h=m[1],j=Object(u.useState)(!0),g=Object(n.a)(j,2),b=g[0],E=g[1],S=Object(u.useState)(!0),y=Object(n.a)(S,2),x=y[0],O=y[1];return c.a.createElement("div",null,c.a.createElement("div",{className:"controls"},c.a.createElement("div",null,c.a.createElement("span",null,"Min"),c.a.createElement("input",{type:"number",min:0,value:a,onChange:function(e){return r(parseInt(e.target.value,10))}})),c.a.createElement("div",null,c.a.createElement("span",null,"Max"),c.a.createElement("input",{type:"number",min:0,value:v,onChange:function(e){return p(parseInt(e.target.value,10))}})),c.a.createElement("div",null,c.a.createElement("span",null,"Shuffle"),c.a.createElement("input",{type:"checkbox",checked:x,onChange:function(){return O(!x)}})),c.a.createElement("div",null,c.a.createElement("span",null,"Color"),c.a.createElement("input",{type:"checkbox",checked:b,onChange:function(){return E(!b)}})),c.a.createElement("div",null,c.a.createElement("button",{onClick:function(){return h(f.slice(0,-1))}},"Pop"))),c.a.createElement(l.TagCloud,{minSize:a,maxSize:v,tags:f,shuffle:x,disableRandomColor:!b,className:"simple-cloud",onClick:function(e){var t=prompt("Edit tag value",e.value);if(null!=t){var a={value:t,count:e.count},n=f.map((function(t){return t.value===e.value?a:t}));h(n)}}}))}},19:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(1),l=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}],o=1337;function r(){var e=1e4*Math.sin(o++);return e-Math.floor(e)}t.default=function(){return u.a.createElement(c.TagCloud,{minSize:12,maxSize:35,tags:l,randomNumberGenerator:r})}},20:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(1),l=[{value:"jQuery",count:25},{value:"MongoDB",count:18},{value:"JavaScript",count:38},{value:"React",count:30},{value:"Nodejs",count:28},{value:"Express.js",count:25},{value:"HTML5",count:33},{value:"CSS3",count:20},{value:"Webpack",count:22},{value:"Babel.js",count:7},{value:"ECMAScript",count:25},{value:"Jest",count:15},{value:"Mocha",count:17},{value:"React Native",count:27},{value:"Angular.js",count:30},{value:"TypeScript",count:15},{value:"Flow",count:30},{value:"NPM",count:11}];t.default=function(){return u.a.createElement(c.TagCloud,{minSize:12,maxSize:35,tags:l,className:"simple-cloud",onClick:function(e){return alert("'".concat(e.value,"' was selected!"))}})}},21:function(e,t,a){},22:function(e,t,a){},221:function(e,t,a){var n={"./":5,"./App":6,"./App.js":6,"./analytics":4,"./analytics.js":4,"./custom-color-options":15,"./custom-color-options.js":15,"./custom-renderer":16,"./custom-renderer.js":16,"./custom-styles":17,"./custom-styles.js":17,"./index":5,"./index.js":5,"./interactive-cloud":18,"./interactive-cloud.js":18,"./logo.svg":228,"./shuffle-with-seed":19,"./shuffle-with-seed.js":19,"./simple-cloud":20,"./simple-cloud.js":20,"./styles/github-gist.css":21,"./styles/index.css":22};function u(e){var t=c(e);return a(t)}function c(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}u.keys=function(){return Object.keys(n)},u.resolve=c,e.exports=u,u.id=221},228:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},26:function(e,t,a){e.exports=a(5)},4:function(e,t,a){"use strict";a.r(t);var n=a(8);n.a.initialize("UA-87163647-1");var u={pageview:function(){return n.a.pageview("/")},codeExpanded:function(){return n.a.event({category:"User",action:"Expanded Code Preview"})}};t.default=u},5:function(e,t,a){"use strict";a.r(t);var n=a(0),u=a.n(n),c=a(23),l=a.n(c),o=a(6);a(22),a(21),a(229);l.a.render(u.a.createElement(o.default,null),document.getElementById("root"))},6:function(e,t,a){"use strict";a.r(t);var n=a(7),u=a(9),c=a(10),l=a(13),o=a(11),r=a(12),i=a(24),s=a(0),v=a.n(s),p=a(25),d=a.n(p),m=a(4);function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var h=[{file:"simple-cloud.js",title:"Simple cloud"},{file:"interactive-cloud.js",title:"Interactive cloud"},{file:"custom-color-options.js",title:"Custom color options"},{file:"custom-styles.js",title:"Custom styles"},{file:"custom-renderer.js",title:"Custom renderer"},{file:"shuffle-with-seed.js",title:"Shuffle with seed"}].map((function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(a,!0).forEach((function(t){Object(i.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{key:t})})),j=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(r.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){m.default.pageview()}},{key:"render",value:function(){return v.a.createElement("main",null,v.a.createElement("header",null,v.a.createElement("h1",null,"Tag cloud for React"),v.a.createElement("h3",null,"react-tagcloud examples",v.a.createElement("a",{className:"github-link",href:"https://github.com/madox2/react-tagcloud"},v.a.createElement("i",{className:"fa fa-github fa-lg"})))),v.a.createElement("section",null,h.map((function(e){return v.a.createElement(g,{title:e.title,element:a(221)("./".concat(e.file)).default,file:e.file,key:e.key})}))),v.a.createElement("footer",null,v.a.createElement("p",null,"2019 ",v.a.createElement("a",{href:"http://madox2.poriadne.sk"},"madox2"))))}}]),t}(v.a.Component),g=function(e){function t(e,a){var c;return Object(u.a)(this,t),(c=Object(l.a)(this,Object(o.a)(t).call(this,e,a))).state={expanded:!1,fetched:!1,detail:""},c.toggleDetail=c.toggleDetail.bind(Object(n.a)(c)),c}return Object(r.a)(t,e),Object(c.a)(t,[{key:"toggleDetail",value:function(e){this.setState({expanded:!this.state.expanded}),this.state.fetched||(m.default.codeExpanded(),this.fetch()),e.preventDefault()}},{key:"fetch",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(){var e=this;fetch("https://raw.githubusercontent.com/madox2/react-tagcloud/master/examples/src/"+this.props.file).then((function(e){return e.text()})).then((function(t){e.setState({fetched:!0,detail:t})}))}))},{key:"render",value:function(){return v.a.createElement("article",null,v.a.createElement("div",null,v.a.createElement("h2",null,this.props.title),v.a.createElement("div",{className:"cloud-wrapper"},v.a.createElement(this.props.element)),v.a.createElement("div",{className:"detail-wrapper"},v.a.createElement("a",{href:"#",onClick:this.toggleDetail},this.state.expanded?"\u25b2 hide":"\u25bc show code"),this.state.expanded&&this.state.fetched&&v.a.createElement(d.a,{className:"javascript code-preview"},this.state.detail))))}}]),t}(v.a.Component);t.default=j}},[[26,1,2]]]);
//# sourceMappingURL=main.1fa482ca.chunk.js.map