import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmplooyeDashboard from "./pages/EmplooyeDashboard";
import Summary from "./components/Summary";
import Departments from "./components/Departments";
import AddDepartment from "./components/AddDepartment"
import EditDepartment from "./components/EditDepartment";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";
import EmployeeEdit from "./components/EmployeeEdit";
import LeaveList from "./components/LeaveList";
import LeaveRequest from "./components/LeaveRequest";
import Profile from "./components/Profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}>
            <Route index element={<Summary/>}></Route>
            <Route path="/admin-dashboard/departments" element={<Departments/>}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/departments/:id" element={<EditDepartment/>}></Route>
            <Route path="/admin-dashboard/employee" element={<EmployeeList/>}></Route>
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/admin-dashboard/employee/:id" element={<ViewEmployee/>}></Route>
            <Route path="/admin-dashboard/employee-edit/:id" element={<EmployeeEdit/>}></Route>
            <Route path="/admin-dashboard/leaves" element={<LeaveList/>}></Route>
          </Route>
          <Route path="/employee-dashboard" element={<EmplooyeDashboard/>}>
            <Route index element={<Profile/>}></Route>
            <Route path="/employee-dashboard/leaverequest" element={<LeaveRequest/>}></Route>
          
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
