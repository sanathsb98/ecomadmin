import React, { useState, useRef, useEffect } from 'react';
import '../products/Products.css';
import axios from 'axios';

const Products = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [rawImgData,setRawImgData] = useState();
  const [productData, setProductData] = useState({
    product_name: "",
    product_des : "",
    product_price : null,
    stock_quantity : 10,
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
    setRawImgData(uploadedFile)
    if (uploadedFile) {
      const fileURL = URL.createObjectURL(uploadedFile);
      setImageSrc(fileURL);
      setProductData((prev) => ({
        ...prev,
        product_image: fileURL // Ensure the key matches the state definition
      }));
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
    const { name, value, } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(productData)
  };

  const submitProduct = async () => {
    if (!rawImgData) {
      console.error("No image selected");
      return;
    }
  
    const formData = new FormData();
    formData.append('file', rawImgData);
    formData.append('upload_preset', 'default'); // Replace with your upload preset
    formData.append('folder', 'your_folder_name'); // Optional
  
    setIsSubmitting(true);
  
    try {
      // Upload image to Cloudinary
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqrvlus3b/image/upload', 
        formData
      );
  
      if (!response.data.secure_url) {
        throw new Error("Failed to get image URL from Cloudinary");
      }
  
      const imageUrl = response.data.secure_url;
      console.log('Uploaded image URL:', imageUrl);
  
      // Create new product data with updated image URL
      const updatedProductData = {
        ...productData,
        product_image: imageUrl
      };
  
      // Send product data to backend
      const productResponse = await fetch('https://pg-shop-app-backend.vercel.app/products/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProductData)
      });
  
      if (!productResponse.ok) {
        throw new Error('Failed to submit product');
      }
  
      console.log('Product submitted successfully');
  
      // Reset form state
      setProductData({
        product_name: '',
        product_des: '',
        productCategory: 'ecom',
        product_price: null,
        newLaunch: false,
        product_image: '',
        productRating: 5
      });
      setFile(null);
      setImageSrc(null);
  
    } catch (error) {
      console.error("Error:", error.message);
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
                <input name='product_name' value={productData.product_name} onChange={handleChange} placeholder='product name' className='add-product-input' type='text' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Description</div>
              <div className='add-product-input'>
                <textarea name='product_des' value={productData.product_des} onChange={handleChange} id="myTextArea" rows="6" cols="50" placeholder='add-product-input' className='add-product-input' />
              </div>
            </div>
            <div className='add-product-des-sec'>
              <div className='add-product-name'>Product Price</div>
              <div className='add-product-input'>
                <input name='product_price' value={productData.product_price} onChange={handleChange} placeholder='product price' className='add-product-input' type='number' />
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
