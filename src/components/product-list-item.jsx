import React from 'react';
import { Link } from 'react-router-dom'; 
import './../styles/product-list-item.css';

const ProductListItem  = (props) => {
  const { numberWithCommas, setCurrentProduct, product } = props;
  const { name, price, image } = product;
  const background = require(`./../assets/images/${image}`); // require cannot take variable due to webpack
  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  };
  return (
    <div data-testid="productListItem" className="col-lg-3 m-5 col-sm-12 catalogItem p-0 text-center">
      <Link style={{textDecoration: 'none', color: 'black'}} to={'/details'}>
        <div onClick={() => setCurrentProduct(product)} className="text-center card border-0">
          <div className="productImage card-img-top" style={style}></div>
          <div className="productInfo card-body">
            <div className="font-weight-bold productName">{name}</div>
            <div className="productPrice">${numberWithCommas(price)}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductListItem;
