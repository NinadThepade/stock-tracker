import React from 'react'

import './StockRow.css'

const StockRow = ({stock}) => {
  return (
    <div className="stock-row">
      <div className="stock-name">{ stock.stockName }</div>
      <div className="stock-price">{ stock.stockPrice }</div>
    </div>
  )
}

export default StockRow