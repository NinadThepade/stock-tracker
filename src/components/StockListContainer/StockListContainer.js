import React, { useState, useEffect } from 'react'
import {default as localforage} from 'localforage'
import StockRow from '../StockRow/StockRow'

const StockListContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let test = [];
    localforage.iterate(value => {
      // Resulting key/value pair -- this callback
      // will be executed for every item in the database.
      test.push(value)
    }).then(function() {
      // Rerender once the iteration has completed else it will go into infinite loop
      setData(test)
    }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
    });
  },[data]);

  return (
    <div className="stock-container">
      {data.map((stock, index) => (
        <div key={index}>
          <StockRow stock={stock} />
        </div>
    ))}
    </div>
  )
}

export default StockListContainer
