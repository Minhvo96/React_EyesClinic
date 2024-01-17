import { useEffect, useState } from "react";

const addStyleDashboard = () => {
    useEffect(() => {
        // Thêm thẻ <link> khi component được tạo
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = '/src/assets/css/styles.min.css';
        document.head.appendChild(linkElement);
        
        // Cleanup function để xóa thẻ <link> khi component bị unmount
        return () => {
          document.head.removeChild(linkElement);
        };
    }, []);
}

export default addStyleDashboard;