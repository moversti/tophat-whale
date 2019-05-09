import React from 'react';
// import 'bootstrap/js/dist/alert'
import { ProductConsumer } from '../context';

export default function Message() {
  return (
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <ProductConsumer>{value => value.message}</ProductConsumer>
      <ProductConsumer>
        {value => {
          return (
            <button
              type="button"
              class="close"
              onClick={() => value.setMessage('')}
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          );
        }}
      </ProductConsumer>
    </div>
  );
}
