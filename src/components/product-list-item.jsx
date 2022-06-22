import React from 'react';

class ProductListItem extends React.Component {

  setViewCallback() {
    let product = this.props.product;
    let callback = this.props.setView;
    let details = 'details';
    callback(details, product);
  }

  numberWithCommas(number) {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    let product = this.props.product;
    let imageUrl = product.image[0]; // returns an array of images, 0 index because we want the main page to only show one picture

    const style = {
      backgroundImage: `url(${imageUrl})`,
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    };

    return (
      <div className="col-lg-3 col-sm-12 px-0 catalogItem text-center">
        <div className="text-center card">
          <div className="productImage card-img-top" style={style}>
          </div>
          <div className="productInfo card-body">
            <div className="font-weight-bold productName">{product.name}</div>
            <div className="productPrice">${this.numberWithCommas(product.price)}</div>
            <button className="btn btn-info mt-3 moreInfoButton" onClick={this.setViewCallback.bind(this)}>More Info</button>
          </div>
        </div>
      </div>

    );
  }

}

export default ProductListItem;
