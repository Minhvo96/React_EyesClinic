import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalExamDetail from "./ModalExamDetail";
import axios from "axios";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import userService from "../../../services/userService";
import Swal from "sweetalert2";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const registerSchema = yup.object({
    fullName: yup.string().required("Bạn cần phải cung cấp họ và tên"),
    address: yup.string().required("Bạn cần phải cung cấp địa chỉ"),
    phoneNumber: yup.string().required("Bạn cần phải cung cấp số điện thoại").matches(/^(0[0-9]{9})$/, "Số điện thoại không hợp lệ"),
    degree: yup.string().required('Vui lòng chọn bằng cấp'),
    role: yup.string().required('Vui lòng chọn vai trò'),
    experience: yup.number().required('Vui lòng nhập số năm kinh nghiệm').typeError('Vui lòng nhập số năm kinh nghiệm'),
    password: yup.string().required("Bạn cần phải nhập mật khẩu"),
    showPassword: yup.string().required("Hãy xác nhận lại mật khẩu")
    .oneOf([yup.ref('password')], "Mật khẩu không trùng khớp!"),
    message: yup.string()
})

const ModalMedicine = ({ showModal, closeModal }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [staff, setStaff] = useState({});

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/3031/3031702.png';
    const [fileDataURL, setFileDataURL] = useState(defaultImage);

    const uploadAvatar = async (e) => {

        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
            alert("Image mime type is not valid");
            return;
        }

        let fileReader, isCancel = false;

        if (!file) {
            return;
        }

        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result);
                }
            };
            fileReader.readAsDataURL(file);
        }

        const CLOUD_NAME = "dw3x98oui";
        const UNSIGNED_UPLOAD_PRESET = "ml_default";

        const POST_URL =
            "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/auto/upload";

        var formData = new FormData();
        formData.append("file", file);
        formData.append("cloud_name", CLOUD_NAME);
        formData.append("upload_preset", UNSIGNED_UPLOAD_PRESET);

        const uploadedImage = await axios({
            method: 'post',
            url: POST_URL,
            data: formData
        }).then((data) => {
            return data.data;
        });

        setStaff({
            ...staff,
            avatar: uploadedImage.url
        });
    };

    const handleClickImage = () => {
        document.getElementById('img').click();
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
        criteriaMode: "all"
    })

    const handleSubmitForm = async (data) => {
        
        const user = {
            ...staff,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            experience: data.experience + " năm kinh nghiệm",
            degree: data.degree,
            role: data.role,
            password: data.password,
            status: "WORKING"
          }
        await userService.createUser(user);

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tạo nhân viên mới thành công !',
            showConfirmButton: false,
            timer: 3500
          })

        reset();
        closeModal();
        setFileDataURL(defaultImage);  
    }



    return (
        <>
            <Modal show={showModal} onHide={closeModal} size='lg' centered>
                <Modal.Header closeButton onClick={() => {reset(), setFileDataURL(defaultImage)}}>
                    <Modal.Title className="ms-4">Thêm nhân viên cho phòng khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="text-center mb-5">
                                            <div>
                                                <input type="file" id="img" name="img" className="form-control" onChange={uploadAvatar} hidden />
                                                <img src={fileDataURL} alt="" width={"150px"} height={"150px"} onClick={handleClickImage} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Họ và tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors?.fullName?.message ? 'is-invalid' : ''}`}
                                                        {...register("fullName")}
                                                    />
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.fullName?.message}</span>
                                                </div>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Bằng cấp
                                                    </label>
                                                    <select type='text' className={`form-control ${errors?.degree?.message ? 'is-invalid' : ''}`}
                                                        {...register("degree")}>
                                                        <option value="" style={{ color: 'black' }}>--Chọn bằng cấp--</option>
                                                        <>
                                                            <option className='text-black' value="UNIVERSITY">Đại học</option>
                                                            <option className='text-black' value="COLLEGE">Cao đẳng</option>
                                                            <option className='text-black' value="INTERMEDIATE">Trung cấp</option>
                                                        </>
                                                    </select>
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.degree?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors?.address?.message ? 'is-invalid' : ''}`}
                                                        {...register("address")}
                                                    />
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.address?.message}</span>
                                                </div>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Kinh nghiệm
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className={`form-control ${errors?.experience?.message ? 'is-invalid' : ''}`}
                                                        {...register("experience")}
                                                    />
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.experience?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors?.phoneNumber?.message ? 'is-invalid' : ''}`}
                                                        {...register("phoneNumber")}
                                                    />
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.phoneNumber?.message}</span>
                                                </div>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Vai trò
                                                    </label>
                                                    <select type='text' className={`form-control ${errors?.role?.message ? 'is-invalid' : ''}`}
                                                        {...register("role")}>
                                                        <option value="" style={{ color: 'black' }}>--Chọn vai trò--</option>
                                                        <>
                                                            <option className='text-black' value="ROLE_DOCTOR">Bác sĩ</option>
                                                            <option className='text-black' value="ROLE_RECEPTIONIST">Lễ tân</option>
                                                            <option className='text-black' value="ROLE_ASSISTANT">Trợ lý</option>
                                                            <option className='text-black' value="ROLE_CASHIER">Thu ngân</option>
                                                        </>
                                                    </select>
                                                    <span className="text-danger font-weight-bold invalid-feedback">{errors?.role?.message}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Mật khẩu
                                                    </label>
                                                    <div className="input-group">
                                                        <input type={showPassword ? "text" : "password"} className={`form-control ${errors?.password?.message ? 'is-invalid' : ''}`}
                                                            {...register("password")} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" onClick={handleShowPassword}>
                                                                <i className={showPassword ? "icon-eye" : "icon-eye-slash"}></i>
                                                            </span>
                                                        </div>
                                                        <span className="text-danger font-weight-bold invalid-feedback">{errors?.password?.message}</span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="mb-3 col-6">
                                                <div>
                                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                                        Nhập lại mật khẩu
                                                    </label>
                                                    <div className="input-group">
                                                        <input type={showPassword ? "text" : "password"} className={`form-control ${errors?.showPassword?.message ? 'is-invalid' : ''}`}
                                                            {...register("showPassword")} />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text" onClick={handleShowPassword}>
                                                                <i className={showPassword ? "icon-eye" : "icon-eye-slash"}></i>
                                                            </span>
                                                        </div>
                                                        <span className="text-danger font-weight-bold invalid-feedback">{errors?.showPassword?.message}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit(handleSubmitForm)}>
                        Tạo mới
                    </button>
                    <button onClick={() => {closeModal(), reset(), setFileDataURL(defaultImage)}} className="me-4 btn btn-danger">Đóng</button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ModalMedicine;