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
    <table className="stock-container">
      <thead>
        <th>Stock Code</th>
        <th>Stock Price</th>
        <th>Last Updated Date</th>
        <th>Last Updated Time</th>
      </thead>
      <tbody>
        {data.map((stock, index) => (
        <tr key={index}>
          <StockRow stock={stock} />
        </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StockListContainer
