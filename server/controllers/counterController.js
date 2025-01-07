import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leaves.js";

const counter = async (req, res) => {
    try {
        const employee_count = await Employee.countDocuments();
        const dept_count = await Department.countDocuments();
        const female = await Employee.countDocuments({gender:"female"})
        const male = await Employee.countDocuments({gender:"male"})
        const apply = await Leave.countDocuments();
        const approve = await Leave.countDocuments({decision:"approved"})
        const pending = await Leave.countDocuments({decision:"pending"})
        const reject = await Leave.countDocuments({decision:"rejected"})

        // Fetch all required departments
        const it_dept = await Department.findOne({ dept_name: "IT " });
        const HR_dept = await Department.findOne({ dept_name: "HR" });
        const management_dept = await Department.findOne({ dept_name: "Management " });
        const iot_dept = await Department.findOne({ dept_name: "IoT" });
        const security_dept = await Department.findOne({ dept_name: "Security" });
        const civil_dept = await Department.findOne({ dept_name: "Civil" });
        const health_dept = await Department.findOne({ dept_name: "Health" });

        console.log(civil_dept);

        // Initialize counts to 0
        let it_count = 0,
            HR_count = 0,
            management_count = 0,
            iot_count = 0,
            security_count = 0,
            civil_count = 0,
            health_count = 0;

        // Count employees for each department if the department exists
        if (it_dept) it_count = await Employee.countDocuments({ department: it_dept._id });
        if (HR_dept) HR_count = await Employee.countDocuments({ department: HR_dept._id });
        if (management_dept) management_count = await Employee.countDocuments({ department: management_dept._id });
        if (iot_dept) iot_count = await Employee.countDocuments({ department: iot_dept._id });
        if (security_dept) security_count = await Employee.countDocuments({ department: security_dept._id });
        if (civil_dept) civil_count = await Employee.countDocuments({ department: civil_dept._id });
        if (health_dept) health_count = await Employee.countDocuments({ department: health_dept._id });

        console.log(civil_count);

        res.status(200).json({
            success: true,
            message: "Data count fetched successfully.",
            employee_count,
            dept_count,
            it_count,
            HR_count,
            management_count,
            iot_count,
            security_count,
            civil_count,
            health_count,
            male,
            female,
            apply,approve,pending,reject
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch data count." });
    }
};

export { counter };
