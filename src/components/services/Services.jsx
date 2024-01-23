import React from 'react'

export default function Services() {
    return (
        <section className="ftco-section ftco-services">
            <div className="container">
                <div className="row justify-content-center mb-5 pb-5">
                    <div className="col-md-7 text-center heading-section ftco-animate">
                        <h2 className="mb-2">Dịch vụ của chúng tôi sẽ làm bạn hài lòng</h2>
                        <p>
                            Chuyên thăm khám và điều trị các tật về khúc xạ và các bệnh lý về mắt.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                        <div className="media block-6 services d-block text-center">
                            <div className="icon d-flex justify-content-center align-items-center">
                                {/* <span className="flaticon-tooth-1" /> */}
                                <img src="https://vuakinh.com/wp-content/uploads/2023/10/kham-mat-02.jpg" style={{width: 100, borderRadius: 50}} />
                            </div>
                            <div className="media-body p-2 mt-3">
                                <h3 className="heading">Khám mắt tổng quát</h3>
                                <p>
                                Khám mắt bao gồm phát hiện chẩn đoán tật khúc xạ và các bệnh ở mắt. 
                                Kể cả khi mắt bạn trông bình thường và chưa từng đeo kính, 
                                khuyến cáo từ WHO khuyên bạn nên đi khám ít nhất 1-2 năm/lần.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                        <div className="media block-6 services d-block text-center">
                            <div className="icon d-flex justify-content-center align-items-center">
                               <img src="https://matvietnga.com/pic/QA/pic-QA-im_637298259873998740.png"  style={{width: 100, borderRadius: 50}}/>
                            </div>
                            <div className="media-body p-2 mt-3">
                                <h3 className="heading">Sử dụng OrthoK</h3>
                                <p>
                                OrthoK là phương pháp sử dụng kính tiếp xúc ban đêm ngăn ngừa sự tiến triển cận thị của trẻ. 
                                Sử dụng kính OrthoK giúp giải phóng trẻ khỏi kính gọng và giúp độ cận không tăng thêm nữa.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                        <div className="media block-6 services d-block text-center">
                            <div className="icon d-flex justify-content-center align-items-center">
                                <img src="https://sft.vn/wp-content/uploads/2021/01/kinh-ap-trong-can-thi-06-thang-1.jpg" style={{width: 100, borderRadius: 50}} />
                            </div>
                            <div className="media-body p-2 mt-3">
                                <h3 className="heading">Làm kính áp tròng</h3>
                                <p>
                                Kính áp tròng được sử dụng cho người lớn và trẻ nhỏ với nhiều chỉ định khác nhau, 
                                như: giác mạc chóp, sẹo giác mạc, đục thể thủy tinh bẩm sinh, lệch khúc xạ, kiểm soát tiển triển cận thị,..
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 d-flex align-self-stretch ftco-animate">
                        <div className="media block-6 services d-block text-center">
                            <div className="icon d-flex justify-content-center align-items-center">
                                <img src="https://www.matsaigon.com/wp-content/uploads/2019/07/kham-mat.jpg" style={{width: 100, borderRadius: 50}} />
                            </div>
                            <div className="media-body p-2 mt-3">
                                <h3 className="heading">Chẩn đoán kỹ thuật cao</h3>
                                <p>
                                Phòng khám cung cấp dịch vụ chẩn đoán kỹ thuật cao, giúp phát hiện, chẩn đoán và theo dõi các bệnh lý về mắt được tối ưu nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
