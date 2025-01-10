import React from 'react';
import '../sidebar/Sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {

  return (
    <div className='sidebar-container'>
        <div className='sidebar-contents'>
              <div className='sidebar-tab'>
                  <div className='sidebar-tab-icon'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3287 3.51594C13.3873 3.56801 13.4428 3.62347 13.4948 3.68204L19.4948 10.432C19.8202 10.7981 20 11.2709 20 11.7608V19.0004C20 20.1049 19.1046 21.0004 18 21.0004H14.002C14.0013 21.0004 14.0007 21.0004 14 21.0004H10C9.99934 21.0004 9.99868 21.0004 9.99803 21.0004H6C4.89543 21.0004 4 20.1049 4 19.0004V11.7608C4 11.2709 4.17976 10.7981 4.50518 10.432L10.5052 3.68204C11.239 2.85647 12.5032 2.78211 13.3287 3.51594ZM11 19.0004H13V15.0004H11V19.0004ZM15 19.0004V14.0004C15 13.4481 14.5523 13.0004 14 13.0004H10C9.44772 13.0004 9 13.4481 9 14.0004V19.0004H6V11.7608L12 5.01076L18 11.7608V19.0004H15Z" fill="white" />
                      </svg>
                  </div>
                  <Link className='sidebar-tab-name' to={"/"}>Dashboard</Link>
              </div>
              <div className='sidebar-tab'>
                  <div className='sidebar-tab-icon'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5459 3.57029C11.9641 3.15205 12.5498 2.9466 13.1377 3.01192L21 3L20.9881 10.8623C21.0534 11.4502 20.848 12.0359 20.4297 12.4541L11.4541 21.4297C10.6937 22.1901 9.46093 22.1901 8.70056 21.4297L2.57027 15.2994C1.80991 14.5391 1.80991 13.3063 2.57027 12.5459L11.5459 3.57029ZM13 5L3.94704 13.9227L10.0773 20.053L19 11V5H13ZM14 8L16 10L14 12L12 10L14 8Z" fill="#7E84A3" />
                      </svg>
                  </div>
                  <Link className='sidebar-tab-name' to={"/products"}>Products</Link>
              </div>
              <div className='sidebar-tab'>
                  <div className='sidebar-tab-icon'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15V17H4V15H6ZM19 15C19.5523 15 20 15.4477 20 16C20 16.5523 19.5523 17 19 17H9C8.44772 17 8 16.5523 8 16C8 15.4477 8.44772 15 9 15H19ZM6 11V13H4V11H6ZM19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H19ZM6 7V9H4V7H6ZM19 7C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9H9C8.44772 9 8 8.55228 8 8C8 7.44772 8.44772 7 9 7H19Z" fill="white" />
                      </svg>
                  </div>
                  <Link className='sidebar-tab-name' to={"/orders"}>Orders</Link>
              </div>
        </div>
    </div>
  )
}

export default Sidebar