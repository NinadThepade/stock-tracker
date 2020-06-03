import React from 'react'
import StockRow from '../StockRow/StockRow'

const StockListContainer = ({data}) => {
  return (
    <div>
      {data.map((stock, index) => (
      <div key={index}>
        <StockRow stock={stock} />
      </div>
    ))}
    </div>
  )
}

export default StockListContainer