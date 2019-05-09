import React from 'react';
import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import About from './components/About';
import Login from './components/Login';
import Details from './components/Details';
import Contact from './components/Contact';
import Order from './components/Order';
import Message from './components/Message';
import JotainMeniPieleen from './components/JotainMeniPieleen';
import { ProductConsumer } from './context';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <ProductConsumer>
          {value => (value.message.length > 0 ? <Message /> : null)}
        </ProductConsumer>
        <div className="flex-grow-1">
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/kori" component={Cart} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/details/:id" component={Details} />
            <Route path="/login" component={Login} />
            <Route path="/order" component={Order} />
            <Route component={JotainMeniPieleen} />
          </Switch>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
