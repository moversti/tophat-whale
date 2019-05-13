import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';

function changeQuantity(e, setQuantity) {
  const tar = e.target;
  setQuantity(tar.value);
}

export default function Cartitem({ product }) {
  const [quantity, setQuantity] = useState(product.count);
  useEffect(() => {
    product.count = quantity;
    product.total = product.count * product.price;
  });
  return (
    <tr>
      <td>
        <Link to={'/details/' + product.id}>{product.title}</Link>
      </td>
      <td>{product.price} EUR</td>
      <td>
        <ProductConsumer>
          {value => {
            return (
              <React.Fragment>
                <button
                  className="btn btn-danger"
                  disabled={product.count < 1 ? true : false}
                  onClick={() => {
                    setQuantity(Number.parseInt(quantity) - 1);
                    value.minusOne(product.id);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => {
                    changeQuantity(e, setQuantity);
                  }}
                  className="btn mx-2 border border-dark"
                />
                <button
                  className="btn btn-success"
                  onClick={() => {
                    setQuantity(Number.parseInt(quantity) + 1);
                    value.plusOne(product.id);
                  }}
                >
                  +
                </button>
              </React.Fragment>
            );
          }}
        </ProductConsumer>
      </td>
      <td>{product.total} EUR</td>
    </tr>
  );
}
