import React from 'react';
import { Link } from 'react-router-dom'; 
import './../styles/product-list-item.css';

const ProductListItem  = (props) => {
  const setViewCallback = () => {
    props.setCurrentItem(props.product);
  }

  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number) / 100).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let product = props.product;
  let imageName = product.image; 
  // returns an array of images, 0 index because we want the main page to only show one picture
  const background = require(`./../assets/images/${imageName}`); // require canot take only variable due to webpack
  const style = {
    backgroundImage: `url(${background})`,
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
          <div className="productPrice">${product.price}</div>
          <Link to={'/catalog/details'}>
            <button className="btn btn-info mt-3 moreInfoButton" onClick={() => setViewCallback()}>More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
