import React from 'react';
import { ProductConsumer, ProductContext } from '../context';
import firebase from '../firebase';
import { Link } from 'react-router-dom';

class Order extends React.Component {
  state = {
    nimi: '',
    osoite: ''
  };

  handleOrder = () => {
    this.pushOrder();
    this.context.emptyCart();
    this.context.setMessage('Tilaus lähetetty');
    this.setState({ nimi: '', osoite: '' });
  };

  pushOrder = () => {
    const ref = firebase.database().ref('orders');
    const cart = {};
    this.context.cart.forEach(i => {
      cart[i.id] = {
        count: i.count,
        price: i.price,
        title: i.title,
        total: i.total
      };
    });
    cart.nimi = this.state.nimi;
    cart.osoite = this.state.osoite;
    ref.push(cart);
  };

  handleChange = e => {
    let tar = e.target;
    let val = tar.value;
    let name = tar.name;
    switch (name) {
      case 'nimi':
        this.setState({ nimi: val });
        break;
      case 'osoite':
        this.setState({ osoite: val });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Nimi</label>
            <input
              name="nimi"
              className="form-control"
              type="text"
              placeholder="Nimesi"
              value={this.state.nimi}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Osoite</label>
            <input
              name="osoite"
              className="form-control"
              type="text"
              placeholder="Katu 123"
              value={this.state.osoite}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Tuote</th>
              <th>Hinta</th>
              <th>Määrä</th>
              <th className="text-right">Yhteensä</th>
            </tr>
          </thead>
          <tbody>
            <ProductConsumer>
              {value => {
                return value.cart.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td>{p.title}</td>
                      <td>{p.price} EUR</td>
                      <td>{p.count}</td>
                      <td className="text-right">{p.total} EUR</td>
                    </tr>
                  );
                });
              }}
            </ProductConsumer>
            <ProductConsumer>
              {value => {
                return (
                  <tr key={-1}>
                    <th>Kokonaissumma</th>
                    <th />
                    <th />
                    <th className="text-right">{value.cartTotal()} EUR</th>
                  </tr>
                );
              }}
            </ProductConsumer>
          </tbody>
        </table>
        <Link to="/">
          <button className="btn btn-primary" onClick={this.handleOrder}>
            Osta
          </button>
        </Link>
      </div>
    );
  }
}
Order.contextType = ProductContext;
export default Order;
