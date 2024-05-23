import React, { useState,useRef,useEffect } from 'react';
import '../products/Products.css';
import axios from 'axios';

const Products = () => {

  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [productData, setProductData] = useState({
        productName :"",
        productDescription :"",
        productCategory :"",
        productPrice :null,
        newLaunch:false,
        productImage :"",
        productRating :null
  })

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

  const submitProduct = () => {
    const formData = new FormData();
    formData.append("productName",productData.productName);
    formData.append("productDescription",productData.productDescription);
    formData.append("productCategory",productData.productCategory);
    formData.append("productPrice",productData.productPrice);
    formData.append("newLaunch",productData.newLaunch);
    formData.append("productImage",productData.productImage);
    formData.append("productRating",productData.productRating);
    if(file){
      formData.append("productImage",productData.productImage);
    }
    try{
     axios.post("https://shopappbackend.vercel.app/api/addProduct",formData)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className='page-container'>
      <div className='page-content'>

        <div className='add-product-header'>
          <div className='add-product-titles'>Add Product</div>
          <div className='add-savecancel-btns'>
            <div className='add-product-cancel'>Cancel</div>
            <div onClick={()=>{submitProduct()}} className='add-product-save'>Save</div>
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