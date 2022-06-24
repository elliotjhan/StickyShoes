import React from 'react';
import ProductListItem from './product-list-item';
import './../styles/product-list.css';
import { Link } from 'react-router-dom'; 

const ProductList = (props) => {
  const eachProductList = props.productList.map(element => {
    return (
      <ProductListItem 
        key={element.productid} 
        setCurrentItem={props.setCurrentItem} 
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
