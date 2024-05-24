import React, { useState,useRef,useEffect } from 'react';
import '../products/Products.css';
import axios from 'axios';

const Products = () => {

  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [productData, setProductData] = useState({
        productName :"",
        productDescription :"",
        productCategory :"ecom",
        productPrice :null,
        newLaunch:false,
        productImage :"",
        productRating :5
  })
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    return () => {
      setIsMounted(false); // Component will unmount, set isMounted to false
    };
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true)
  }
  const handleDragLeave = () => {
    setDragging(false)
  }
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false)

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile)
    }
  }
  const handleFileInput = (event) => {
    const uploadedFile = event.target.files[0]
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImageSrc(objectUrl);
      setProductData((prevData)=>({...prevData,productImage:objectUrl}))

      return () => URL.revokeObjectURL(objectUrl); // Cleanup the object URL when the component unmounts or the file changes
    }
  }, [file]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitProduct = async () => {
    setIsSubmitting(true);
  
    try {
      const response = await fetch('https://shopappbackend.vercel.app/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit product');
      }
  
      console.log('Product submitted successfully');
      setProductData({
        productName: '',
        productDescription: '',
        productCategory: 'ecom',
        productPrice: null,
        newLaunch: false,
        productImage: '',
        productRating: 5
      });
      setFile(null);
      setImageSrc(null);
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  
  

  return (
    <div className='page-container'>
      <div className='page-content'>

        <div className='add-product-header'>
          <div className='add-product-titles'>Add Product</div>
          <div className='add-savecancel-btns'>
            <div className='add-product-cancel'>Cancel</div>
            <div onClick={() => !isSubmitting && submitProduct()} className={`add-product-save ${isSubmitting ? 'disabled' : ''}`}>
  {isSubmitting ? 'Submitting...' : 'Save'}
</div>
          </div>
        </div>

        <div className='add-product-body'>

          <div className='add-product-left'>

            <div className='add-product-name-sec'>
              <div className='add-product-name'>Product Name</div>
              <div className='add-product-input'>
                <input name='productName' value={productData.productName} onChange={handleChange} placeholder='product name' className='add-product-input' type='text' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Description</div>
              <div className='add-product-input'>
                <textarea name='productDescription' value={productData.productDescription} onChange={handleChange} id="myTextArea" rows="6" cols="50" placeholder='add-product-input' className='add-product-input' type='text-description' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Price</div>
              <div className='add-product-input'>
                <input name='productPrice' value={productData.productPrice} onChange={handleChange}  placeholder='product price' className='add-product-input' type='number' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>New Launch</div>
              <div className='add-product-input'>
                <select 
                name='newLaunch' value={productData.newLaunch} onChange={handleChange}
                id='options' className='add-product-input'>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>


          </div>
          <div className='add-product-right'>
            <div className='add-product-name'>Product Image</div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`drag-drop-space ${dragging ? 'dragging' : ''}`}
            >
              <div onClick={handleButtonClick} className='add-file-btn'>Add File
                <input type='file' onChange={handleFileInput} style={{ display: 'none' }} ref={fileInputRef} />
              </div>
              <div className='drag-drop-title'>Or drag and drop files</div>
              {file && <div className='file-name'>Selected file: {file.name}</div>}
              {imageSrc && <img src={imageSrc} alt="Product" className='added-product-image' />}
            </div>
          </div>

        </div>

        <div className='add-product-footer'>

        </div>

      </div>
    </div>
  )
}

export default Products