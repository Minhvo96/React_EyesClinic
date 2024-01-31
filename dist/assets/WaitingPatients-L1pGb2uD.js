import{r as c,i as ae,o as ne,d as ie,u as le,j as e,k as ce,l as h,p as oe,v as de,w as $,m as g,S as y,t as re}from"./index-QqQ6tGiF.js";import{R as me}from"./react-paginate-czkzMCCC.js";const he=ce({fullName:h().required("Bạn cần phải cung cấp họ và tên"),age:oe().integer().min(1934,"Năm sinh phải từ 1934").max(2024,"Năm sinh pkhông vượt quá 2024").required("Bạn cần phải cung cấp năm sinh").typeError("Bạn cần phải cung cấp năm sinh"),address:h().required("Bạn cần phải cung cấp địa chỉ"),phoneNumber:h().required("Bạn cần phải cung cấp số điện thoại").matches(/^(0[0-9]{9})$/,"Số điện thoại không hợp lệ"),eyeCategory:h().required("Vui lòng chọn dịch vụ khám"),message:h()});function pe(){var B,S,w,E,D,L,A,I,R,O;const[x,u]=c.useState([]),[r,P]=c.useState(""),[F,H]=c.useState([]),[_,q]=c.useState(!1),[G,W]=c.useState(!0),[N,ge]=c.useState(["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"]),{register:o,handleSubmit:Y,formState:{errors:t},reset:p,setValue:xe}=ae({resolver:ne(he),mode:"onBlur",criteriaMode:"all"}),n=ie(),j=le(),z=async s=>{const a={fullName:s.fullName,phoneNumber:s.phoneNumber,address:s.address,role:"ROLE_CUSTOMER",password:null,age:s.age},i=await de.createUser(a),l=$().format("HH:mm"),d=$().format("YYYY-MM-DD"),m={idEyeCategory:String(s.eyeCategory),idCustomer:i,timeBooking:l,dateBooking:d,status:"WAITING"};console.log(m),await g.createBooking(m),p(),q(!0),document.getElementById("btn-submit").add,y.fire({position:"center",icon:"success",title:"Đặt lịch hẹn thành công !",showConfirmButton:!1,timer:3500})},U=async()=>{const s=await re.getAllEyeCategories();H(s)},V=()=>{const s=new Date,a=s.getFullYear(),i=s.getMonth()+1,l=s.getDate();P(`${a}-${i.toString().padStart(2,"0")}-${l.toString().padStart(2,"0")}`)},X=async()=>{const s={idEyeCategory:"",idCustomer:"",timeBooking:"",dateBooking:String(r),status:""},a=await g.getBookingByStatusWaitingOrExaminingAndDate(s);u(a),W(!1)},K=async s=>{const a={idEyeCategory:"",idCustomer:"",timeBooking:"",dateBooking:String(s.target.value),status:""},i=await g.getBookingByStatusWaitingOrExaminingAndDate(a);u(i)},J=(s,a)=>{s.target.value=="cancel"&&v(a,"CANCELLED")},Q=s=>{var a,i,l,d,m,T,M;((a=n==null?void 0:n.user)==null?void 0:a.roles)==="ROLE_DOCTOR"||((i=n==null?void 0:n.user)==null?void 0:i.roles)==="ROLE_ASSISTANT"||((l=n==null?void 0:n.user)==null?void 0:l.roles)==="ROLE_ADMIN"?(v(s,"EXAMINING"),(((d=n==null?void 0:n.user)==null?void 0:d.roles)==="ROLE_DOCTOR"||((m=n==null?void 0:n.user)==null?void 0:m.roles)==="ROLE_ADMIN")&&j(`/dashboard/doctor/${s}`),(((T=n==null?void 0:n.user)==null?void 0:T.roles)==="ROLE_ASSISTANT"||((M=n==null?void 0:n.user)==null?void 0:M.roles)==="ROLE_ADMIN")&&j(`/dashboard/assistant/${s}`)):j("/error-403")},v=async(s,a)=>{const i=await g.getBookingById(s);if(a=="CANCELLED"){const l={...i,status:a};y.fire({title:"Bạn chắc chắn muốn hủy lịch hẹn khám này chứ?",showCancelButton:!0,confirmButtonText:"Hủy",cancelButtonText:"Không"}).then(async d=>{d.isConfirmed&&(await b(l),y.fire("Hủy thành công!","","success"))})}if(a=="EXAMINING"){const l={...i,status:a};await b(l)}},b=async s=>{const a={idEyeCategory:String(s.eyeCategory.id),idCustomer:String(s.customer.id),timeBooking:s.timeBooking,dateBooking:s.dateBooking,status:s.status};await g.editBooking(a,s.id),u(i=>i.filter(l=>l.id!==s.id))},[Z,ee]=c.useState(0),f=5,se=s=>{ee(s.selected)},k=(Z+1)*f,C=k-f,te=x.sort((s,a)=>s.timeBooking.localeCompare(a.timeBooking)).slice(C,k);return c.useEffect(()=>{r&&X()},[r,_]),c.useEffect(()=>{V(),U()},[]),e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"container-fluid",children:[e.jsx("div",{className:"d-flex align-items-center justify-content-between",children:e.jsx("h5",{className:"card-title fw-semibold mb-4",children:"Danh sách chờ khám"})}),e.jsx("div",{className:"col-lg-12 d-flex align-items-around",style:{padding:0},children:e.jsx("div",{className:"card w-100",children:e.jsxs("div",{className:"card-body p-4",children:[e.jsxs("div",{className:"d-flex mb-5 align-items-center justify-content-between",children:[e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("h6",{className:"mr-3",children:"Chọn ngày: "}),e.jsx("div",{children:e.jsx("input",{type:"date",className:"form-control",defaultValue:r,onChange:K,min:r})})]}),e.jsx("div",{className:"mr-2",children:e.jsx("button",{className:"btn btn-outline-success",type:"button","data-toggle":"modal","data-target":"#createBookingModal",children:"Đặt lịch"})})]}),G?e.jsx("span",{className:"loader"}):x.length?e.jsx(e.Fragment,{children:e.jsxs("table",{className:"table text-nowrap mb-0 align-middle",children:[e.jsx("thead",{className:"thead-primary",children:e.jsxs("tr",{className:"text-center",children:[e.jsx("th",{children:"STT"}),e.jsx("th",{children:"Họ và tên"}),e.jsx("th",{children:"Số điện thoại"}),e.jsx("th",{children:"Ngày khám"}),e.jsx("th",{children:"Giờ khám"}),e.jsx("th",{children:"Trạng thái"}),e.jsx("th",{children:"Xem bệnh án"})]})}),e.jsx("tbody",{children:te.map((s,a)=>{const i=a+1+C;return e.jsxs("tr",{className:"text-center",children:[e.jsx("td",{children:i}),e.jsx("td",{children:s.customer.user.fullName}),e.jsx("td",{children:s.customer.user.phoneNumber}),e.jsx("td",{children:s.dateBooking}),e.jsx("td",{children:s.timeBooking}),e.jsx("td",{children:e.jsx("select",{className:`form-control text-center ${N.includes(s.timeBooking)?"text-danger":""}`,value:N.includes(s.timeBooking)?"true":"false",onChange:l=>J(l,s.id),children:N.includes(s.timeBooking)?e.jsxs(e.Fragment,{children:[e.jsx("option",{className:"text-black",value:"true",children:s.status=="WAITING"?"Chờ khám":"Đang khám"}),e.jsx("option",{className:"text-black",value:"cancel",children:"Hủy"})]}):e.jsxs(e.Fragment,{children:[e.jsx("option",{className:"text-black",value:"false",children:s.status=="WAITING"?"Không đặt trước":"Đang khám"}),e.jsx("option",{className:"text-black",value:"cancel",children:"Hủy"})]})})}),e.jsx("td",{children:e.jsx("div",{className:"d-flex align-items-center justify-content-center",children:e.jsx("button",{className:"btn btn-outline-success d-flex justify-content-center align-items-center",style:{width:"36px",height:"36px"},onClick:()=>Q(s.id),children:e.jsx("i",{className:"ti ti-report-medical",style:{fontSize:"18px"}})})})})]},s.id)})})]})}):e.jsx("div",{className:"m-4",children:e.jsxs("div",{className:"d-flex align-items-center justify-content-center gap-4",style:{flexDirection:"column"},children:[e.jsx("div",{children:e.jsx("i",{class:"fa-regular fa-calendar-xmark text-danger",style:{fontSize:"124px"}})}),e.jsx("span",{className:"fw-semibold",style:{fontSize:"32px"},children:"Danh sách hôm nay đang trống!"})]})})]})})}),e.jsx("div",{className:"pagination-container",style:{margin:0,display:"flex",justifyContent:"flex-end"},children:e.jsx(me,{pageCount:Math.ceil(x.length/f),pageRangeDisplayed:5,marginPagesDisplayed:2,onPageChange:se,containerClassName:"pagination",activeClassName:"active",previousLabel:"Previous",nextLabel:"Next",breakLabel:"..."})})]}),e.jsx("div",{className:"modal fade",id:"createBookingModal",tabIndex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-lg modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title font-weight-bold",id:"exampleModalLabel",children:"Đặt lịch tại quầy"}),e.jsx("button",{type:"button",className:"btn-close","data-dismiss":"modal","aria-label":"Close",onClick:()=>p()})]}),e.jsxs("form",{className:"appointment-form needs-validation",children:[e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6 has-validation",children:[e.jsx("label",{children:"Họ và tên"}),e.jsx("input",{type:"text",className:`form-control ${(B=t==null?void 0:t.fullName)!=null&&B.message?"is-invalid":""}`,...o("fullName")}),e.jsx("span",{className:"text-danger font-weight-bold invalid-feedback",children:(S=t==null?void 0:t.fullName)==null?void 0:S.message})]}),e.jsxs("div",{className:"col-md-6 has-validation",children:[e.jsx("label",{children:"Số điện thoại"}),e.jsx("input",{type:"text",className:`form-control ${(w=t==null?void 0:t.phoneNumber)!=null&&w.message?"is-invalid":""}`,...o("phoneNumber")}),e.jsx("span",{className:"text-danger font-weight-bold invalid-feedback",children:(E=t==null?void 0:t.phoneNumber)==null?void 0:E.message})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6 has-validation",children:[e.jsx("label",{children:"Năm sinh"}),e.jsx("input",{type:"number",className:`form-control ${(D=t==null?void 0:t.age)!=null&&D.message?"is-invalid":""}`,...o("age")}),e.jsx("span",{className:"text-danger font-weight-bold invalid-feedback",children:(L=t==null?void 0:t.age)==null?void 0:L.message})]}),e.jsxs("div",{className:"col-md-6 has-validation",children:[e.jsx("label",{children:"Địa chỉ"}),e.jsx("input",{type:"text",className:`form-control ${(A=t==null?void 0:t.address)!=null&&A.message?"is-invalid":""}`,...o("address")}),e.jsx("span",{className:"text-danger font-weight-bold invalid-feedback",children:(I=t==null?void 0:t.address)==null?void 0:I.message})]})]}),e.jsxs("div",{className:"row mb-3",children:[e.jsxs("div",{className:"col-md-6 has-validation",children:[e.jsx("label",{children:"Dịch vụ"}),e.jsxs("select",{type:"text",className:`form-control ${(R=t==null?void 0:t.eyeCategory)!=null&&R.message?"is-invalid":""}`,...o("eyeCategory"),children:[e.jsx("option",{value:"",style:{color:"black"},children:"--Chọn dịch vụ--"}),F.map(s=>e.jsxs("option",{value:s.id,style:{color:"black"},children:[s.nameCategory," "]},s.id))]}),e.jsx("span",{className:"text-danger font-weight-bold invalid-feedback",children:(O=t==null?void 0:t.eyeCategory)==null?void 0:O.message})]}),e.jsxs("div",{className:"col-md-6",children:[e.jsx("label",{children:"Ghi chú"}),e.jsx("input",{type:"text",className:"form-control",...o("message")})]})]})]})}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",id:"btn-submit",className:"btn btn-primary",onClick:Y(z),"data-dismiss":"modal",children:"Đặt lịch"}),e.jsx("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:()=>p(),children:"Đóng"})]})]})]})})})]})}export{pe as default};
