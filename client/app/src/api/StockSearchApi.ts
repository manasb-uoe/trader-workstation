import Stock from "../domain/Stock";

export interface IStockSearchApi {
  searchStocks(searchTerm: string): Promise<Stock[]>;
}

export class StockSearchApiSample implements IStockSearchApi {
  searchStocks(searchTerm: string): Promise<Stock[]> {
    return new Promise<Stock[]>((resolve, reject) => {
      return resolve([
        new Stock(searchTerm + "1", searchTerm + "BlaBla", "NYSE"),
        new Stock(searchTerm + "2", searchTerm + "Poof", "NYSE"),
        new Stock(searchTerm + "3", searchTerm + "Gaah", "LSE")
      ]);
    });
  }
}

export class StockSearchApi implements IStockSearchApi {
  searchStocks(searchTerm: string): Promise<Stock[]> {
    return new Promise<Stock[]>((resolve, reject) => {
      fetch("/stocks?query=" + searchTerm)
        .then(response => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(responseJson => {
          if (responseJson.error) {
            throw new Error(responseJson.error);
          }
          
          const stocks = responseJson.ResultSet.Result.map(
            (stockJson: any) =>
              new Stock(stockJson.symbol, stockJson.name, stockJson.exchDisp)
          );
          return resolve(stocks);
        })
        .catch(error => {
          console.error(error);
          return reject(error.message);
        });
    });
  }
}
