import React from "react";
import ReactDOM from "react-dom";

import SimpleCloudExample from "./simple-cloud";
import CustomPropsExample from "./custom-props";
import DefaultRendererExample from "./default-renderer";
import CustomTagRendererExample from "./custom-tag-renderer";
import CustomRendererExample from "./custom-renderer";

const App = () => (
  <div>
    <h1>TagCloud examples</h1>

    <h2>Simple cloud</h2>
    <SimpleCloudExample />

    <h2>Custom props</h2>
    <CustomPropsExample />

    <h2>Default renderer</h2>
    <DefaultRendererExample />

    <h2>Custom tag renderer</h2>
    <CustomTagRendererExample />

    <h2>Custom renderer</h2>
    <CustomRendererExample />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
