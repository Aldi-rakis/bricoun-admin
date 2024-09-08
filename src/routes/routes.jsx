//import react router dom
import { Routes, Route } from "react-router-dom";

//=======================================================================
//ADMIN
//=======================================================================

//import view Login
import Login from '../pages/Admin/Login.jsx';
import Dashboard from "../pages/Admin/dasboard/Index.jsx";
import UsersIndex from "../pages/Admin/users/Index.jsx";
import Jawaban from "../pages/Admin/users/Detailjawaban.jsx";

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/admin/login" */}
            <Route path="/" element={<Login />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/data" element={<UsersIndex />} />

            <Route path="/admin/jawaban/:user_id" element={<Jawaban />} />


        </Routes>
    )
}

export default RoutesIndex