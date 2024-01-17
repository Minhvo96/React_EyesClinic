import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import billService from '../../services/billServices';


export default function Overview() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [month31Day, setMonth31Day] = useState(["01", "03", "05", "07", "08", "10", "12"])
    const [month30Day, setMonth30Day] = useState(["04", "06", "09", "11"])
    const [month28Day, setMonth28Day] = useState(["02"])
    const [dateOfMonth, setDateOfMonth] = useState([])
    const [billsByMonth, setBillsByMonth] = useState([])
    const [totalMonthlyIncome, setTotalMonthlyIncome] = useState()
    const [totalYearlyIncome, setTotalYearlyIncome] = useState(0)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getRevenuesByMonth = async (date) => {
        const month = formatDate(date).split("-")[0];
        const year = formatDate(date).split("-")[1];

        const obj = {
            month,
            year
        }
        const bills = await billService.getBillsByMonthYear(obj);

        const totalYearlyIncome = await billService.getBillsByYear(obj);

        setBillsByMonth(bills);
        setTotalYearlyIncome(formatNumber(totalYearlyIncome));

    }

    const getDaysByMonth = (month) => {
        if (month31Day.includes(month)) {
            const a = [];
            for (let i = 1; i <= 31; i++) {
                a.push(String(i));
            }
            setDateOfMonth(a);
        }
        if (month30Day.includes(month)) {
            const a = [];
            for (let i = 1; i <= 30; i++) {
                a.push(String(i));
            }
            setDateOfMonth(a);
        }
        if (month28Day.includes(month)) {
            const a = [];
            for (let i = 1; i <= 28; i++) {
                a.push(String(i));
            }
            setDateOfMonth(a);
        }
    }

    const formatDate = (date) => {
        if (date) {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${month}-${year}`;
        }
        return '';
    };

    const chartRef = useRef(null);


    const renderChart = (data, categories) => {
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }
        var options = {
            chart: {
                type: 'line'
            },
            series: [{
                name: 'sales',
                data: data
            }],
            xaxis: {
                categories: categories
            }
        }
        chartRef.current = new ApexCharts(document.querySelector("#chart"), options);
        chartRef.current.render();
    }

    function formatNumber(number) {
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return parts.join('.');
    }


    useEffect(() => {
        const month = formatDate(selectedDate).split("-")[0];
        getDaysByMonth(month);
    }, [selectedDate])

    useEffect(() => {
        if(selectedDate){
            getRevenuesByMonth(selectedDate)
        }
    }, [dateOfMonth])

    useEffect(() => {
        const arrayData = new Array(dateOfMonth.length).fill('0');

        const bills = billsByMonth;

        bills.forEach(item => {
            arrayData[parseInt(item.date) - 1] = item.total.toString();
        })

        renderChart(arrayData, dateOfMonth);

        let total = 0;
        arrayData.forEach(item => total += parseInt(item));
        setTotalMonthlyIncome(formatNumber(total));

    }, [billsByMonth])

    return (
        <>
            <div className="container-fluid">
                {/*  Row 1 */}
                <div className="row">
                    <div className="col-lg-8 d-flex align-items-strech">
                        <div className="card w-100">
                            <div className="card-body">
                                <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                    <div className="mb-3 mb-sm-0">
                                        <h5 className="card-title fw-semibold">Thống kê thu nhập</h5>
                                    </div>
                                    <div style={{ zIndex: 50 }}>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="MM-yyyy"
                                            showMonthYearPicker
                                            customInput={<input type="text" readOnly />}
                                            value={formatDate(selectedDate)}
                                            className='form-control text-center'
                                            placeholderText='Chọn tháng-năm'
                                        />
                                    </div>
                                </div>
                                <div id="chart" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* Yearly Breakup */}
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row align-items-start">
                                            <div className="col-8">
                                                <h5 className="card-title mb-9 fw-semibold">
                                                    {" "}
                                                    Tổng thu năm này{" "}
                                                </h5>
                                                <h4 className="fw-semibold mb-3">{totalYearlyIncome} VNĐ</h4>
                                            </div>
                                            <div className="col-4">
                                                <div className="d-flex justify-content-end">
                                                    <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                        <i className="ti ti-currency-dollar fs-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="earning" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                {/* Monthly Earnings */}
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row align-items-start">
                                            <div className="col-8">
                                                <h5 className="card-title mb-9 fw-semibold">
                                                    {" "}
                                                    Tổng thu tháng này{" "}
                                                </h5>
                                                <h4 className="fw-semibold mb-3">{totalMonthlyIncome} VNĐ</h4>
                                            </div>
                                            <div className="col-4">
                                                <div className="d-flex justify-content-end">
                                                    <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                                                        <i className="ti ti-currency-dollar fs-6" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="earning" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="card w-100">
                            <div className="card-body p-4">
                                <div className="mb-4">
                                    <h5 className="card-title fw-semibold">Recent Transactions</h5>
                                </div>
                                <ul className="timeline-widget mb-0 position-relative mb-n5">
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            09:30
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8" />
                                            <span className="timeline-badge-border d-block flex-shrink-0" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1">
                                            Payment received from John Doe of $385.90
                                        </div>
                                    </li>
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            10:00 am
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8" />
                                            <span className="timeline-badge-border d-block flex-shrink-0" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                                            New sale recorded{" "}
                                            <a
                                                href="javascript:void(0)"
                                                className="text-primary d-block fw-normal"
                                            >
                                                #ML-3467
                                            </a>
                                        </div>
                                    </li>
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            12:00 am
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                                            <span className="timeline-badge-border d-block flex-shrink-0" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1">
                                            Payment was made of $64.95 to Michael
                                        </div>
                                    </li>
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            09:30 am
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-8" />
                                            <span className="timeline-badge-border d-block flex-shrink-0" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                                            New sale recorded{" "}
                                            <a
                                                href="javascript:void(0)"
                                                className="text-primary d-block fw-normal"
                                            >
                                                #ML-3467
                                            </a>
                                        </div>
                                    </li>
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            09:30 am
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-8" />
                                            <span className="timeline-badge-border d-block flex-shrink-0" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                                            New arrival recorded
                                        </div>
                                    </li>
                                    <li className="timeline-item d-flex position-relative overflow-hidden">
                                        <div className="timeline-time text-dark flex-shrink-0 text-end">
                                            12:00 am
                                        </div>
                                        <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                                            <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                                        </div>
                                        <div className="timeline-desc fs-3 text-dark mt-n1">
                                            Payment Done
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="card w-100">
                            <div className="card-body p-4">
                                <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
                                <div className="table-responsive">
                                    <table className="table text-nowrap mb-0 align-middle">
                                        <thead className="text-dark fs-4">
                                            <tr>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Id</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Assigned</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Name</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Priority</h6>
                                                </th>
                                                <th className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">Budget</h6>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">1</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                                    <span className="fw-normal">Web Designer</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-normal">Elite Admin</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-primary rounded-3 fw-semibold">
                                                            Low
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">2</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Andrew McDownland</h6>
                                                    <span className="fw-normal">Project Manager</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-secondary rounded-3 fw-semibold">
                                                            Medium
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">3</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Christopher Jamil</h6>
                                                    <span className="fw-normal">Project Manager</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-danger rounded-3 fw-semibold">
                                                            High
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0">4</h6>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                                                    <span className="fw-normal">Frontend Engineer</span>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <p className="mb-0 fw-normal">Hosting Press HTML</p>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <span className="badge bg-success rounded-3 fw-semibold">
                                                            Critical
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </>
    )
}