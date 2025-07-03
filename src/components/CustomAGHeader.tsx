import React from 'react';
import { type IHeaderParams } from 'ag-grid-community';

interface CustomHeaderProps extends IHeaderParams {
  // Add any custom props you might need
}

const CustomAGHeader: React.FC<CustomHeaderProps> = (props) => {
  const handleButtonClick = () => {
    // Implement your button's functionality here
    alert(`Button clicked for column: ${props.displayName}`);
    // Example: props.api.deselectAll();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <span>{props.displayName}</span>
      <button onClick={handleButtonClick} style={{ marginLeft: '8px' }}>
        Click Me
      </button>
    </div>
  );
};

export default CustomAGHeader;