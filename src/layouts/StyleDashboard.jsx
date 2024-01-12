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

    // const scriptElement = document.createElement('script');
    // scriptElement.src = '/src/assets/js/dashboard.js'

    // Event handler to set isStylesheetLoaded to true when the stylesheet is loaded
    const handleStylesheetLoad = () => {
      setIsStylesheetLoaded(true);
    };

    linkElement.onload = handleStylesheetLoad;
    // scriptElement.onload = handleStylesheetLoad;

    document.head.appendChild(linkElement);
    // document.body.appendChild(scriptElement);

    // Cleanup function để xóa thẻ <link> khi component bị unmount
    return () => {
      document.head.removeChild(linkElement);
      // document.body.removeChild(scriptElement)
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
