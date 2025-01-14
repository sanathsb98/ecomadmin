import React, { useState, useRef, useEffect } from 'react';
import '../products/Products.css';
import axios from 'axios';

const Products = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [productData, setProductData] = useState({
    product_name: "",
    product_des : "",
    product_price : null,
    product_image: "",
  });
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  const handleFileInput = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      handleFileUpload(uploadedFile);
    }
  };

  const handleFileUpload = async (uploadedFile) => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('upload_preset', 'default'); // Replace with your upload preset
    formData.append('folder', 'your_folder_name'); // Optional: Replace with your folder name in Cloudinary

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqrvlus3b/image/upload', // Replace 'your_cloud_name'
        formData
      );
      const imageUrl = response.data.secure_url;
      setImageSrc(imageUrl); // Preview the image
      setProductData((prevData) => ({
        ...prevData,
        productImage: imageUrl
      }));
      console.log('Uploaded image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

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
      const response = await fetch('https://pg-shop-app-backend.vercel.app/api/addProduct', {
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
                <input name='productName' value={productData.product_name} onChange={handleChange} placeholder='product name' className='add-product-input' type='text' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Description</div>
              <div className='add-product-input'>
                <textarea name='productDescription' value={productData.product_des} onChange={handleChange} id="myTextArea" rows="6" cols="50" placeholder='add-product-input' className='add-product-input' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Price</div>
              <div className='add-product-input'>
                <input name='productPrice' value={productData.product_price} onChange={handleChange} placeholder='product price' className='add-product-input' type='number' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>New Launch</div>
              <div className='add-product-input'>
                <select name='newLaunch' value={productData.newLaunch} onChange={handleChange} id='options' className='add-product-input'>
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
      </div>
    </div>
  );
};

export default Products;
