import React, { useState, useEffect } from 'react'
import StockRow from '../StockRow/StockRow'

const StockListContainer = () => {
  const [data, setData] = useState([]);
  const ENDPOINT = 'ws://stocks.mnet.website';

  useEffect(() => {
    const ws = new WebSocket(ENDPOINT);

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setData(response);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [ENDPOINT]);

  console.log('data: ', data)
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