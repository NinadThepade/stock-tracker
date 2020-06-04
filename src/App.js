import React, { useState, useEffect } from 'react'
import io from "socket.io-client";
import {default as localforage} from 'localforage'

import StockListContainer from './components/StockListContainer/StockListContainer'

import './App.css';

let socket;

function App() {
  const [data, setData] = useState([]);
  const ENDPOINT = 'https://react-proxy-server.herokuapp.com/';

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on('message', (event) => {
      console.log(event)
      const response = JSON.parse(event);

      let test = response.map(stock => {
        let isNewPriceHigher;
        // check if the item already exists in DB
        localforage.getItem(stock[0]).then(value => {
          // This code runs once the value has been loaded from the offline store.
          isNewPriceHigher = value ? (value.stockPrice < stock[1]) : false

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
    })

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT]);

  return (
    <div className="App">
      <StockListContainer data={data} />
    </div>
  );
}

export default App;
