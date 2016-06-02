import React from "react";
import ReactDOM from "react-dom";

import SimpleCloudExample from "./simple-cloud";
import CustomPropsExample from "./custom-props";
import DefaultRendererExample from "./default-renderer";
import CustomTagRendererExample from "./custom-tag-renderer";
import CustomRendererExample from "./custom-renderer";

const el = document.getElementById.bind(document);

ReactDOM.render(<SimpleCloudExample />, el("simple-cloud"));
ReactDOM.render(<CustomPropsExample />, el("custom-props"));
ReactDOM.render(<DefaultRendererExample />, el("default-renderer"));
ReactDOM.render(<CustomTagRendererExample />, el("custom-tag-renderer"));
ReactDOM.render(<CustomRendererExample />, el("custom-renderer"));
