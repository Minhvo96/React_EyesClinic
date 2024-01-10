import { lazy, useEffect, useState } from 'react';

const DashboardLayout = lazy(() => import('./DashboardLayout'))

const StyleDashboard = ({children}) => {
  const [isStylesheetLoaded, setIsStylesheetLoaded] = useState(false);

  useEffect(() => {
    console.log('useEffect');

    // Thêm thẻ <link> khi component được tạo
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/src/assets/css/styles.min.css';

    // Event handler to set isStylesheetLoaded to true when the stylesheet is loaded
    const handleStylesheetLoad = () => {
      setIsStylesheetLoaded(true);
    };

    linkElement.onload = handleStylesheetLoad;

    document.head.appendChild(linkElement);

    // Cleanup function để xóa thẻ <link> khi component bị unmount
    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);

  return (
    <>
      {isStylesheetLoaded && (
        // Render your components here when the stylesheet is loaded
        <DashboardLayout children={children}/>
      )}
    </>
  );
};

export default StyleDashboard;
