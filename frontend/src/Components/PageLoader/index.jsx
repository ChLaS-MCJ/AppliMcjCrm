import React from 'react';
import { Spin } from 'antd';

/**
 * Renders a loading spinner component.
 * @returns {JSX.Element} The loading spinner component.
 */
const PageLoader = () => (
  <div className="centerAbsolute">
    <Spin size="large" />
  </div>
);
export default PageLoader;
