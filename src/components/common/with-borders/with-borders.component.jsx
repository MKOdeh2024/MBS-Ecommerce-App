import React from 'react';
import './with-borders.css';

/**
 * 
 * @param {{ children: React.ReactNode; opacity?: number; }} props 
 * @returns 
 */
const WithBorders = props => (
  <div className="withBorders" style={{ opacity: props.opacity }}>
    {props.children}
  </div>
);

export default WithBorders;