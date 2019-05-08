import React from 'react';
import Cartitem from './Cartitem';
import { ProductConsumer, ProductContext } from '../context';
import firebase from '../firebase';

class Cart extends React.Component {
  state = {
    sent: false
  };

  handleOrder = () => {
    this.pushOrder();
    this.context.emptyCart();
    this.setState({ sent: true });
  };

  pushOrder = () => {
    const ref = firebase.database().ref('orders');
    const cart = {};
    this.context.cart.forEach(i => {
      cart[i.id] = i;
    });
    ref.push(cart);
  };

  render() {
    return (
      <div>
        {this.state.sent ? (
          <div className="alert alert-success" role="alert">
            Tilaus lähetetty!
          </div>
        ) : null}
        <ProductConsumer>
          {value => {
            return value.cart.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tuote</th>
                    <th>Hinta</th>
                    <th>Määrä</th>
                    <th>Yhteensä</th>
                  </tr>
                </thead>
                <tbody>
                  {value.cart.map(p => {
                    return <Cartitem key={p.id} product={p} />;
                  })}
                </tbody>
              </table>
            ) : null;
          }}
        </ProductConsumer>
        <ProductConsumer>
          {value => {
            return value.cart.length > 0 ? (
              <div>
                <button
                  className="btn btn-info mr-5 ml-3 px-4 float-right"
                  onClick={() => {
                    this.handleOrder();
                  }}
                >
                  Osta
                </button>
                <h5 className="float-right">
                  Yhteensä {value.cartTotal()} EUR
                </h5>
              </div>
            ) : null;
          }}
        </ProductConsumer>
        <ProductConsumer>
          {value => {
            return value.cart.length > 0 ? (
              <button
                className="btn btn-danger mx-5 mt-5"
                onClick={value.emptyCart}
              >
                Tyhjennä ostoskori
              </button>
            ) : (
              <h3>Ostoskori tyhjä</h3>
            );
          }}
        </ProductConsumer>
      </div>
    );
  }
}
Cart.contextType = ProductContext;
export default Cart;
