import React from 'react';
import { Link } from 'react-router-dom'; 
import './../styles/product-list-item.css';

const ProductListItem  = (props) => {
  const setViewCallback = () => {
    props.setCurrentProduct(props.product);
  }

  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let product = props.product;
  let imageName = product.image; 
  // returns an array of images, 0 index because we want the main page to only show one picture
  const background = require(`./../assets/images/${imageName}`); // require cannot take variable due to webpack
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="col-lg-3 m-5 col-sm-12 catalogItem p-0 text-center">
      <Link style={{textDecoration: 'none', color: 'black'}} to={'/catalog/details'}>
        <div onClick={() => setViewCallback()} className="text-center card border-0">
          <div className="productImage card-img-top" style={style}>
          </div>
          <div className="productInfo card-body">
            <div className="font-weight-bold productName">{product.name}</div>
            <div className="productPrice">${numberWithCommas(product.price)}</div>
              {/* <button className="btn btn-info mt-3 moreInfoButton" onClick={() => setViewCallback()}>More Info</button> */}
          </div>
        </div>
      </Link>
    </div>

  );
}

export default ProductListItem;
