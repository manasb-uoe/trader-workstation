import * as React from "react";
import "./App.css";
import { StockAutocomplete } from "./components/Autocomplete";
import { StockStore } from "./stores/StockStore";

interface IAppProps {
  stockStore: StockStore;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
              Trader Workstation
            </a>
          </nav>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <StockAutocomplete className="mt-4" stockStore={this.props.stockStore} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
