import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchDept } from '../utils/employeeHelper';
import { useAuth } from '../context/authContext';
import { LeaveButtons, Leavecolumns } from '../utils/leaveHelper';

const LeaveList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDept, setDept] = useState("");
    const [leaves, setLeaves] = useState([]);
    const [filterLeaves, setFilterLeaves] = useState([]);

    const { user } = useAuth();
    const admin_id = user._id;

    useEffect(() => {
        const gettingDept = async () => {
            try {
                const dept = await fetchDept();
                setDepartments(dept);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        const gettingLeaves = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${admin_id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.data.success) {
                    console.log("Fetched leaves:", response.data.leaves);

                    let sno = 0;
                    const data = response.data.leaves.map((leav) => ({
                        _id: leav._id,
                        sno: ++sno,
                        reason: leav.reason,
                        name: leav?.user_id?.name || "Unknown",
                        date: new Date(leav.leave_date).toDateString(),
                        department_id: leav?.user_id?.department_id || "",  // Ensure department filtering works
                        action: <LeaveButtons _id={leav._id} />
                    }));

                    setLeaves(data);
                    setFilterLeaves(data);
                }
            } catch (error) {
                console.error("Error fetching leaves:", error);
                alert(error?.response?.data?.error || "Failed to fetch leaves");
            }
            setLoading(false);
        };

        gettingLeaves();
        gettingDept();
    }, [admin_id]);

    const filterName = (e) => {
        const filterData = leaves.filter((leav) =>
            leav.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterLeaves(filterData);
    };

    useEffect(() => {
        if (selectedDept) {
            const filteredData = leaves.filter(leav => leav.department_id === selectedDept);
            setFilterLeaves(filteredData);
        } else {
            setFilterLeaves(leaves);
        }
    }, [selectedDept, leaves]);

    const customStyles = {
        tableWrapper: {
            style: {
                borderRadius: '10px',
                overflow: 'hidden',
            },
        },
        table: {
            style: {
                backgroundColor: '#1F2937',
                borderRadius: '10px',
            },
        },
        headRow: {
            style: {
                backgroundColor: '#1F2937',
                color: 'white',
            },
        },
        rows: {
            style: {
                backgroundColor: '#1F2937',
                color: '#D1D5DB',
            },
            highlightOnHoverStyle: {
                backgroundColor: 'gray',
                color: 'white',
            },
        },
        pagination: {
            style: {
                backgroundColor: '#1F2937',
                color: 'white',
            },
        },
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <h2 className="text-white text-2xl">Loading...</h2>
                </div>
            ) : (
                <div className='p-5 bg-gray-700 h-full'>
                    <div className='flex flex-row justify-center items-center'>
                        <h3 className='text-2xl font-bold text-white'>Employee Leaves</h3>
                    </div>

                    <div className='flex flex-row justify-between px-5 mt-3'>
                        <div>
                            <input
                                type='text'
                                placeholder='Search by name'
                                className='px-5 py-1 shadow rounded bg-gray-800 text-white'
                                onChange={filterName}
                            />
                        </div>
                        <div>
                            <select
                                className='px-5 py-1 shadow rounded bg-gray-800 text-gray-300'
                                value={selectedDept}
                                onChange={(event) => setDept(event.target.value)}
                            >
                                <option value="">Select department</option>
                                {departments.map((item, index) => (
                                    <option value={item._id} key={index}>{item.dept_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <DataTable
                            columns={Leavecolumns}
                            data={filterLeaves}
                            customStyles={customStyles}
                            pagination
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default LeaveList;
