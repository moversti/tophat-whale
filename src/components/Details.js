import React from 'react';
import { ProductConsumer, ProductContext } from '../context';
import Magnifier from 'react-magnifier';

class Details extends React.Component {
  constructor({ match }) {
    super();
    this.state = {
      detail: 'none yet'
    };
    this.id = match.params.id;
  }

  getDetails = id => {
    let index = this.context.products.findIndex(p => {
      // eslint-disable-next-line
      return p.id === Number.parseInt(id);
    });
    return this.context.products[index];
  };

  componentDidMount() {
    let d = this.getDetails(this.id);
    this.setState(s => {
      return { detail: d };
    });
  }
  render() {
    return (
      <React.Fragment>
        <ProductConsumer>
          {value => {
            return (
              <div className="container my-5">
                <div className="row">
                  <div className="col-md">
                    <Magnifier
                      className="px-3 py-3 border"
                      mgWidth={200}
                      mgHeight={200}
                      mgShowOverflow={false}
                      src={'/' + this.state.detail.img}
                    />
                  </div>
                  <div className="col-md">
                    <h2>{this.state.detail.title}</h2>
                    <p>{this.state.detail.info}</p>
                    <h5 className="float-right">
                      {this.state.detail.price} EUR
                    </h5>
                  </div>
                </div>
              </div>
            );
          }}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}
Details.contextType = ProductContext;

export default Details;
