import React, { useState, useEffect, Fragment } from 'react'

import './StockRow.css'

const StockRow = ({stock}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  useEffect(() => {
    let dt = new Date(stock.dateTime).toLocaleString();
    let dtArray = dt.split(',');
    setDate(dtArray[0])
    setTime(dtArray[1])
  },[stock])

  return (
    <Fragment className="stock-row">
      <td className="stock-name">{ stock.stockName }</td>
      <td className={`stock-price ${stock.isNewPriceHigher ? "stock-price-higher" : "stock-price-lower"}`}>{ stock.stockPrice }</td>
      <td className="stock-date">{ date }</td>
      <td className="stock-time">{ time }</td>
    </Fragment>
  )
}

export default StockRow