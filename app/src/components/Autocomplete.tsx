import * as React from "react";
import { StockStore } from "../stores/StockStore";
import { observer } from "mobx-react";
import Stock from "../domain/Stock";
import "./Autocomplete.css";

interface IAutocompleteProps {
  className?: string;
  stockStore: StockStore;
}

interface IAutocompleteState {
  suggestionsHidden: boolean;
}

@observer
export class StockAutocomplete extends React.Component<
  IAutocompleteProps,
  IAutocompleteState
> {
  constructor(props: IAutocompleteProps, state: IAutocompleteState) {
    super(props, state);
    this.state = { suggestionsHidden: true };
  }
  render() {
    const stockStore = this.props.stockStore;
    return (
      <div className={this.props.className}>
        <input
          // onBlur={e => this.setState({ suggestionsHidden: true })}
          className="form-control"
          value={stockStore.searchTerm}
          onChange={e => this.onInputChanged(e.target.value)}
          style={{ width: "100%" }}
          placeholder="Search for stocks by name or ticker"
        />
        {!this.state.suggestionsHidden &&
          stockStore.searchTerm.length > 0 && (
            <div className="card shadow bg-white rounded">
              <div className="card-body" style={{ padding: "0", margin: "0" }}>
                {stockStore.suggestedStocks.map(stock => {
                  return (
                    <div
                      className="suggestion selectable"
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      onClick={e => this.onStockSelected(stock)}
                      key={stock.symbol}
                    >
                      <div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.markSearchedText(
                              stock.name,
                              stockStore.searchTerm
                            )
                          }}
                        />
                        <div
                          style={{ fontSize: "90%" }}
                          className="text-primary"
                          dangerouslySetInnerHTML={{
                            __html: this.markSearchedText(
                              stock.symbol,
                              stockStore.searchTerm
                            )
                          }}
                        />
                      </div>
                      <div style={{ fontSize: "90%" }}>
                        {stock.exchange}
                      </div>
                    </div>
                  );
                })}
                {stockStore.suggestedStocks.length === 0 && (
                  <div className="suggestion">No results</div>
                )}
              </div>
            </div>
          )}
      </div>
    );
  }

  private onInputChanged(searchTerm: string) {
    this.setState({ suggestionsHidden: false });
    this.props.stockStore.updateSearchTerm(searchTerm);
  }

  private onStockSelected(stock: Stock) {
    this.setState({ suggestionsHidden: true });
    this.props.stockStore.selectStock(stock);
  }

  private markSearchedText(textToMark: string, searchTerm: string) {
    const startIndex = textToMark
      .toLowerCase()
      .indexOf(searchTerm.toLowerCase());
    if (startIndex === -1) {
      return textToMark;
    }

    return (
      textToMark.substring(0, startIndex) +
      "<strong>" +
      textToMark.substring(startIndex, startIndex + searchTerm.length) +
      "</strong>" +
      textToMark.substring(startIndex + searchTerm.length, textToMark.length)
    );
  }
}
