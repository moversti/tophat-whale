import React from 'react';
import { ProductConsumer, ProductContext } from '../context';
import './Details.css';

// Source: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement('DIV');
  glass.setAttribute('class', 'img-magnifier-glass');
  glass.setAttribute('id', 'glass');

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = 'no-repeat';
  glass.style.backgroundSize =
    img.width * zoom + 'px ' + img.height * zoom + 'px';
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener('mousemove', moveMagnifier);
  img.addEventListener('mousemove', moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener('touchmove', moveMagnifier);
  img.addEventListener('touchmove', moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (
      x - 20 > img.width - w / zoom ||
      x + 20 < w / zoom ||
      y - 20 > img.height - h / zoom ||
      y + 20 < h / zoom
    ) {
      glass.style.display = 'none';
    } else {
      glass.style.display = 'block';
    }
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    /* Set the position of the magnifier glass: */
    glass.style.left = x - w + 'px';
    glass.style.top = y - h + 'px';
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition =
      '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

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
    this.setState(
      s => {
        return { detail: d };
      },
      () => {
        magnify('image', 2.5);
      }
    );
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
                    <img
                      className="px-3 py-3 border"
                      id="image"
                      src={'/' + this.state.detail.img}
                      style={{ maxWidth: '100%' }}
                      alt={this.state.detail.title}
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
