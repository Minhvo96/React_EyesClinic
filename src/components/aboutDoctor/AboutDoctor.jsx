import React from 'react'

export default function AboutDoctor() {
    return (
        <div className="container-wrap mt-5">
            <div className="row d-flex no-gutters">
                <div
                    className="col-md-6 img"
                    style={{ backgroundImage: "url(images/BSMinh2.jpg)" }}
                ></div>
                <div className="col-md-6 d-flex">
                    <div className="about-wrap">
                        <div className="heading-section heading-section-white mb-5 ftco-animate">
                            <h2 className="mb-2">Về Ths. BS Trịnh Văn Minh</h2>
                            <p>
                                Với hơn 15 năm kinh nghiệm tu nghiệp và làm việc tại Hàn Quốc và Mỹ.<br></br>
                                Đã từng làm việc và hợp tác với nhiều GS-TS giỏi ở các nước tiên tiến.
                            </p>
                        </div>
                        <div className="list-services d-flex ftco-animate">
                            <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-check2" />
                            </div>
                            <div className="text">
                                <h3>Kiến thức và kinh nghiệm vững vàng</h3>
                                <p>
                                    Xây dựng phòng khám mắt Văn Minh từ những ngày đầu,
                                    Ths Văn Minh mong muốn đem kinh nghiệm phục vụ người bệnh một cách tốt nhất.
                                </p>
                            </div>
                        </div>
                        <div className="list-services d-flex ftco-animate">
                            <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-check2" />
                            </div>
                            <div className="text">
                                <h3>Điều trị nhiều ca bệnh khó, được bệnh nhân tin tưởng</h3>
                                <p>
                                    Ths Văn Minh đã điều trị thành công hơn 1500 ca OrthoK,
                                    góp phần vào công cuộc kiểm soát tiến triển cận thị – bảo vệ đôi mắt của trẻ em.
                                </p>
                            </div>
                        </div>
                        <div className="list-services d-flex ftco-animate">
                            <div className="icon d-flex justify-content-center align-items-center">
                                <span className="icon-check2" />
                            </div>
                            <div className="text">
                                <h3>Tay nghề cao cùng các trang thiết bị hiện đại</h3>
                                <p>
                                    Không chỉ có tay nghề cao,
                                    phòng khám của Ths Văn Minh còn sở hữu trang thiết bị tối tân,
                                    giúp phát hiện những bệnh về mắt từ giai đoạn đầu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
