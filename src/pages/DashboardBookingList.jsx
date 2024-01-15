import React, { lazy } from "react";
import StyleDashboard from "../layouts/StyleDashboard";
import BookingList from "../components/receptionist/BookingList";

// const BookingList = lazy(() => import('../components/receptionist/BookingList'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))
function DashboardBookingList() {
    return (
        <StyleDashboard children={<BookingList/>}/>       
    )
}

export default DashboardBookingList;