import { lazy, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = lazy(() => import('./DashboardLayout'))

const StyleDashboard = ({children}) => {
  const [isStylesheetLoaded, setIsStylesheetLoaded] = useState(false);
  const navigate = useNavigate();

  const URL_SECURE = ["dashboard"]
  const checkUrlIsSecure = () => {
    const lowercaseURL = location.href.toLowerCase();
    // Kiểm tra mỗi từ khóa xem nó có tồn tại trong URL không
    return URL_SECURE.every(keyword => lowercaseURL.includes(keyword.toLowerCase()));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const checkUrl = checkUrlIsSecure();
    if(!token && checkUrl){
      navigate('/error-401')
    } 
  },[])

  useEffect(() => {
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
