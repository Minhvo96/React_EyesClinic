import React from 'react'

export default function Slide() {
    return (
        <section className="home-slider owl-carousel">
            <div
                className="slider-item"
                style={{ backgroundImage: 'url("images/BSMinh4.jpg")' }}
            >
                <div className="overlay" />
                <div className="container">
                    <div
                        className="row slider-text align-items-center"
                        data-scrollax-parent="true"
                    >
                        <div
                            className="col-md-6 col-sm-12 ftco-animate"
                            data-scrollax=" properties: { translateY: '70%' }"
                        >
                            <h1
                                className="mb-4"
                                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                            >
                                Chào mừng đến với phòng khám mắt Văn Minh
                            </h1>
                            <p
                                className="mb-4"
                                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                            >
                                Bác sĩ Minh là chuyên gia nhãn khoa với nền tảng chuyên môn vững chắc, giàu kinh nghiệm và y đức.
                            </p>



                        </div>
                    </div>
                </div>
            </div>
            <div
                className="slider-item"
                style={{ backgroundImage: 'url("images/BSMinh3.jpg")' }}
            >
                <div className="overlay" />
                <div className="container">
                    <div
                        className="row slider-text align-items-center"
                        data-scrollax-parent="true"
                    >
                        <div
                            className="col-md-6 col-sm-12 ftco-animate"
                            data-scrollax=" properties: { translateY: '70%' }"
                        >
                            <h1
                                className="mb-4"
                                data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                            >
                                Với 15 năm kinh nghiệm trong lĩnh vực Nhãn khoa
                            </h1>
                            <p className="mb-4">
                                Cùng hệ thống trang thiết bị y tế hiện đại bậc nhất được nhập khẩu từ các nước Anh, Mỹ, Đức, Úc...
                            </p>
                        </div>
                    </div>
                </div>
            </div>          
        </section>
    )
}
