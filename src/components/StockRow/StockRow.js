import React, { useState, useEffect } from 'react'

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
    <div className="stock-row">
      <div className="stock-name">{ stock.stockName }</div>
      <div className={`stock-price ${stock.isNewPriceHigher ? "stock-price-higher" : "stock-price-lower"}`}>{ stock.stockPrice }</div>
      <div className="stock-date">{ date }</div>
      <div className="stock-time">{ time }</div>
    </div>
  )
}

export default StockRow