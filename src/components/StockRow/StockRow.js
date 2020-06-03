import React from 'react'

import './StockRow.css'

const StockRow = ({stock}) => {
  return (
    <div className="stock-row">
      <div className="stock-name">{ stock[0] }</div>
      <div className="stock-price">{ stock[1] }</div>
    </div>
  )
}

export default StockRow