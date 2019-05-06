import React from 'react';
import { ProductConsumer } from '../context';
import Product from './Product';

export default function ProductList() {
  return (
    <div className="container pt-5">
      <div className="row">
        <ProductConsumer>
          {value => {
            return value.products.map(product => {
              return <Product key={product.id} product={product} />;
            });
          }}
        </ProductConsumer>
      </div>
    </div>
  );
}
