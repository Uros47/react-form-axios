import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className='not-found-page h-screen flex text-center items-center justify-center'>
      <div className='not-found-elements'>
        <h1 className='text-xl mb-1'>404 not found.</h1>
        <p>the requested page does not exist.</p>
        <Link className='hover:underline font-bold mt-2' to='/'>
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
