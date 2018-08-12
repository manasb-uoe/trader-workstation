import { IStockSearchApi } from "./../api/StockSearchApi";
import Stock from "../domain/Stock";
import { observable, runInAction, action, reaction } from "mobx";
import * as lodash from "lodash";

export class StockStore {
  @observable
  searchTerm = "";

  @observable
  selectedStock: Stock;

  @observable
  suggestedStocks: Stock[] = [];

  constructor(public stockSeachApi: IStockSearchApi) {
    const debouncedSearchStocks = lodash
      .debounce(this.searchStocks, 500)
      .bind(this);

    reaction(() => this.searchTerm, searchTerm => debouncedSearchStocks());
  }

  @action
  selectStock(stock: Stock) {
    this.searchTerm = stock.name;
    this.selectedStock = stock;
    this.suggestedStocks.length = 0;
  }

  @action
  updateSearchTerm(value: string) {
    this.searchTerm = value;
  }

  private searchStocks() {
    if (this.searchTerm.length === 0 || (this.selectedStock && this.searchTerm === this.selectedStock.name)) {
      return;
    }

    this.stockSeachApi.searchStocks(this.searchTerm).then(stocks => {
      runInAction(() => (this.suggestedStocks = stocks));
    });
  }
}
