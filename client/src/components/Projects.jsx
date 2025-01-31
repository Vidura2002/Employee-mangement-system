import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { fetchDept, fetchProjects } from '../utils/employeeHelper'
import { ProjectButtons, projectColumns } from '../utils/projectHelper'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaFilter, FaGripVertical, FaPlusCircle } from 'react-icons/fa'
import axios from 'axios'
import Project from '../../../server/models/Project'

const Projects = () => {

  const [projects,setProjects] = useState([])
  const [data,setData] = useState([])
  const [departments,setDepartments] = useState([]);
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const [department,setDepartment] = useState("");
  const [status,setStatus] = useState("");
  const [filterprojects,setFilter] = useState([])

  useEffect(()=>{
    setLoading(true)
    const gettingProjects = async()=>{
      const getProjects = await fetchProjects()
     setProjects(getProjects)
     if(getProjects){
        const data = getProjects.map((project)=>(
          {
            title:project.title,
            department:project.department.dept_name,
            start_date: new Date(project.start_date).toDateString(),
            status: project.status,
            action:(<ProjectButtons id={project._id}/>)
          }
        ))
      setData(data)
      setFilter(data)
     }
    }

    const gettingDepartments = async() =>{
      const dept = await fetchDept();
      setDepartments(dept)
    }

    gettingProjects();
    gettingDepartments();
    if(departments && projects){
      setLoading(false)
    }
  },[])

  const createProject = () =>{
    navigate("/admin-dashboard/createproject")
  }

  const onChange = async(e) =>{
    let filteredData = data;

  if (department) {
    filteredData = filteredData.filter((project) => project.department === department);
  }

  if (status) {
    filteredData = filteredData.filter((project) => project.status === status);
  }
  else if(department && status){
    filteredData = filteredData.filter((project) => project.status === status && project.department === department);
  }

  setFilter(filteredData);
  }

  const customStyles = {
    tableWrapper: {
      style: {
        borderRadius: '10px', // Rounded corners for the table wrapper
        overflow: 'hidden', // Ensures content respects the border radius
      },
    },
    table: {
      style: {
        backgroundColor: '#1F2937', // Black background for the table
        borderRadius:'10px'
      },
    },
    headRow: {
      style: {
        backgroundColor: '#1F2937', // Black background for the header row
        color: 'white', // White text for header
      },
    },
    rows: {
      style: {
        backgroundColor: '#1F2937', // Black background for rows
        color: '#D1D5DB', // White text for rows
      },
      highlightOnHoverStyle: {
        backgroundColor: 'gray', // Gray background on hover
        color: 'white',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#1F2937', // Black background for the pagination
        color: 'white', // White text for pagination items
      }
    }
  };


  return (
    <>{loading ? <div>Loading.....</div> :
      <div className='bg-gray-700 h-full p-4'>
        <div className='text-center mb-5'>
          <h3 className='text-2xl font-bold text-white'>Our Projects</h3>
        </div>

        <div className='mb-4 flex flex-row justify-between'>
          <div className='flex flex-col'>
            <div className='flex flex-row gap-4'>
              <div className='bg-gray-500 shadow-md rounded-md'>
                <Box sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">department</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="department"
                      value={department}
                      onChange={(event)=>{setDepartment(event.target.value)}}
                    >
                      
                      {departments.map((item,index)=>(
                        <MenuItem key={index} value={item.dept_name}>{item.dept_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>

              <div className='bg-gray-500 shadow-md rounded-md'>
                <Box sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="department"
                      value={status}
                      onChange={(event)=>{setStatus(event.target.value)}}
                    >
                      <MenuItem value="ongoing">ongoing</MenuItem>
                      <MenuItem value="completed">completed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className='mt-3 flex item-center '>
              <Button variant="outlined" size='small' onClick={onChange} startIcon={<FaFilter/> }>Filter</Button>
            </div>
            
          </div>

          <div>
          <Button variant="contained" onClick={createProject} startIcon={<FaPlusCircle/> }> Create  New Project</Button>
          </div>
        </div>

        <DataTable
        columns={projectColumns}
        data={filterprojects}
        customStyles={customStyles}
        pagination
        />
      </div>
  }
    </>
  )
}

export default Projects
