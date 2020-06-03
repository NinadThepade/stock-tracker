import React, { useState, useEffect } from 'react'
import {default as localforage} from 'localforage'

import StockListContainer from './components/StockListContainer/StockListContainer'

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const ENDPOINT = 'ws://stocks.mnet.website';

  useEffect(() => {
    const ws = new WebSocket(ENDPOINT);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      let test = response.map(stock => {

        let isNewPriceHigher;
        // check if the item already exists in DB
        localforage.getItem(stock[0]).then(value => {
          // This code runs once the value has been loaded from the offline store.
          isNewPriceHigher = (value.stockPrice < stock[1])

          // set the item to the db
          localforage.setItem(stock[0], {
            'stockName': stock[0], 
            'stockPrice': stock[1], 
            'dateTime': Date.now(), 
            'isNewPriceHigher': isNewPriceHigher 
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        return stock
      })

      setData(test);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [ENDPOINT]);

  return (
    <div className="App">
      <StockListContainer data={data} />
    </div>
  );
}

export default App;
