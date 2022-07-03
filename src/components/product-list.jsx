import React, { useEffect } from 'react';
import ProductListItem from './product-list-item';
import './../styles/product-list.css';
import Cookies from 'js-cookie';

const ProductList = (props) => {
  useEffect(() => { 
    Cookies.remove('currentProduct');
  });

  const eachProductList = props.productList.map(element => {
    return (
      <ProductListItem 
        key={element.productid} 
        setCurrentProduct={props.setCurrentProduct} 
        product={element}
      />
    );
  });

  return (
    <div className="catalogBody container-fluid">
      <div className="row banner mb-1"></div>
      <div className="row justify-content-center productListContainer">{eachProductList}</div>
    </div>
  );
}

export default ProductList;
