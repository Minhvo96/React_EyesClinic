import React, { lazy } from "react";

const BookingList = lazy(() => import('../components/receptionist/BookingList'))
const StyleDashboard = lazy(() => import('../layouts/StyleDashboard'))
function DashboardBookingList() {
    return (
        <StyleDashboard children={<BookingList/>}/>       
    )
}

export default DashboardBookingList;