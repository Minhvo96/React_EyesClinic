import{r,_ as d,R as o,j as e}from"./index-QqQ6tGiF.js";import{c as n}from"./customerService-ggkU0tCO.js";const m=r.lazy(()=>d(()=>import("./index-QqQ6tGiF.js").then(a=>a.y),__vite__mapDeps([0,1]))),u=r.lazy(()=>d(()=>import("./index-QqQ6tGiF.js").then(a=>a.H),__vite__mapDeps([0,1])));function x({children:a}){const[c,i]=r.useState([]),l=async t=>{if(t.target.value===""){const s=await n.getAllCustomers();i(s)}else{const s=await n.searchCustomer(t.target.value);i(s)}},p=o.Children.map(a,t=>o.cloneElement(t,{patientList:c}));return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"page-wrapper",id:"main-wrapper","data-layout":"vertical","data-navbarbg":"skin6","data-sidebartype":"full","data-sidebar-position":"fixed","data-header-position":"fixed",children:[e.jsx(m,{}),e.jsxs("div",{className:"body-wrapper",children:[e.jsx(u,{search:l}),p]})]})})}export{x as default};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-QqQ6tGiF.js","assets/index-Vz_mdcMv.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
