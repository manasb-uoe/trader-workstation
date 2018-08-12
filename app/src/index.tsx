import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { StockStore } from "./stores/StockStore";
import { StockSearchApi } from "./api/StockSearchApi";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <App stockStore={new StockStore(new StockSearchApi())} />,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
