import { lazy, useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = lazy(() => import('./DashboardLayout'))

const StyleDashboard = ({ children }) => {
  const [isStylesheetLoaded, setIsStylesheetLoaded] = useState(false);
  const navigate = useNavigate();
  const auth = useAuthContext();
  const URL_SECURE = ["dashboard"]

  const URL_RECEPTIONIST = ["booking-list", "waiting-list"]
  const URL_DOCTOR = ["doctor", "patient", "waiting-list"]
  const URL_ASSISTANT = ["assistant", "waiting-list"]
  const URL_CASHIER = ["waiting-pay", "waiting-list"]

  const checkUrlIsSecure = (arrayUrl) => {
    const lowercaseURL = location.href.toLowerCase();
    // Kiểm tra mỗi từ khóa xem nó có tồn tại trong URL không
    return arrayUrl.some(keyword => lowercaseURL.includes(keyword.toLowerCase()));
  }

  const checkUrlValidRole = (role) => {
    switch (role) {
      case "ROLE_RECEPTIONIST":
        const checkRecep = checkUrlIsSecure(URL_RECEPTIONIST)
        if (!checkRecep) {
          navigate('/error-403')
        }
        break;
      case "ROLE_DOCTOR":
        const checkDoctor = checkUrlIsSecure(URL_DOCTOR)
        if (!checkDoctor) {
          navigate('/error-403')
        }
        break;
      case "ROLE_ASSISTANT":
        const checkAssistant = checkUrlIsSecure(URL_ASSISTANT)
        if (!checkAssistant) {
          navigate('/error-403')
        }
        break;
      case "ROLE_CASHIER":
        const checkCashier = checkUrlIsSecure(URL_CASHIER)
        if (!checkCashier) {
          navigate('/error-403')
        }
        break;
    }
  }

  useEffect(() => {
    // chưa login mà muốn vào url
    const token = localStorage.getItem('token');
    const checkUrl = checkUrlIsSecure(URL_SECURE);
    if (!token && checkUrl) {
      navigate('/error-401')
    }
    checkUrlValidRole(auth?.user?.roles)
  }, [])

  
  

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
        <DashboardLayout children={children} />
      )}
    </>
  );
};

export default StyleDashboard;
