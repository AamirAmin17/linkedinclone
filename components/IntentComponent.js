import React from "react";

const IntentComponent = ({ text, Icon }) => {
  return (
    <div className='intent'>
      <h2 className='text-xl'>{text}</h2>
      <Icon className='text-gray-700' />
    </div>
  );
};

export default IntentComponent;
