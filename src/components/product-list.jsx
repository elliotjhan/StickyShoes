import React from 'react';
import ProductListItem from './product-list-item';
import './product-list.css';

const ProductList = (props) => {
  let productList = props.productList;
  let callback = props.setView;
  const eachProductList = productList.map(element => {
    return (
      <ProductListItem setView={callback} key={element.id} product={element}/>
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
