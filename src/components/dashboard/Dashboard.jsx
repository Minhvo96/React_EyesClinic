import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import addStyleDashboard from "../../AddStyleDashboard";

export default function Dashboard() {

    addStyleDashboard();

    return (
        <>
            <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
            >
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        {/*  Row 1 */}
                        <div className="row">
                            <div className="col-lg-8 d-flex align-items-strech">
                                <div className="card w-100">
                                    <div className="card-body">
                                        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                                            <div className="mb-3 mb-sm-0">
                                                <h5 className="card-title fw-semibold">Sales Overview</h5>
                                            </div>
                                            <div>
                                                <select className="form-select">
                                                    <option value={1}>March 2023</option>
                                                    <option value={2}>April 2023</option>
                                                    <option value={3}>May 2023</option>
                                                    <option value={4}>June 2023</option>
                                                </select>
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
                                        <div className="card overflow-hidden">
                                            <div className="card-body p-4">
                                                <h5 className="card-title mb-9 fw-semibold">Yearly Breakup</h5>
                                                <div className="row align-items-center">
                                                    <div className="col-8">
                                                        <h4 className="fw-semibold mb-3">$36,358</h4>
                                                        <div className="d-flex align-items-center mb-3">
                                                            <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                                                                <i className="ti ti-arrow-up-left text-success" />
                                                            </span>
                                                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                                                            <p className="fs-3 mb-0">last year</p>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="me-4">
                                                                <span className="round-8 bg-primary rounded-circle me-2 d-inline-block" />
                                                                <span className="fs-2">2023</span>
                                                            </div>
                                                            <div>
                                                                <span className="round-8 bg-light-primary rounded-circle me-2 d-inline-block" />
                                                                <span className="fs-2">2023</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4">
                                                        <div className="d-flex justify-content-center">
                                                            <div id="breakup" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        {/* Monthly Earnings */}
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row alig n-items-start">
                                                    <div className="col-8">
                                                        <h5 className="card-title mb-9 fw-semibold">
                                                            {" "}
                                                            Monthly Earnings{" "}
                                                        </h5>
                                                        <h4 className="fw-semibold mb-3">$6,820</h4>
                                                        <div className="d-flex align-items-center pb-1">
                                                            <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                                                                <i className="ti ti-arrow-down-right text-danger" />
                                                            </span>
                                                            <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                                                            <p className="fs-3 mb-0">last year</p>
                                                        </div>
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
                        <div className="row">
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
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}