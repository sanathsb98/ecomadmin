import React from 'react';
import '../products/Products.css';

const Products = () => {
  return (
    <div className='page-container'>
      <div className='page-content'>

        <div className='add-product-header'>
          <div className='add-product-titles'>Add Product</div>
          <div className='add-savecancel-btns'>
            <div className='add-product-cancel'>Cancel</div>
            <div className='add-product-save'>Save</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Products