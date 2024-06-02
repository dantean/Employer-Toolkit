import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DEPARTMENTS } from '../utils/queries';
import { REASSIGN_EMPLOYEE, DELETE_EMPLOYEE } from '../utils/mutations';
import DepartmentList from '../components/DepartmentList';

const Manager = () => {
  const { loading, error, data } = useQuery(GET_ALL_DEPARTMENTS);
  const [reassignEmployee] = useMutation(REASSIGN_EMPLOYEE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (data) {
      setDepartments(data.getAllDepartments);
    }
  }, [data]);

  const handleReassign = async (employeeId, currentDepartmentId, newDepartmentId) => {
    if (newDepartmentId && newDepartmentId !== currentDepartmentId) {
      try {
        await reassignEmployee({ variables: { employeeId, newDepartmentId } });
        const updatedDepartments = departments.map(department => {
          if (department._id === currentDepartmentId) {
            return {
              ...department,
              employees: department.employees.filter(emp => emp._id !== employeeId),
            };
          } else if (department._id === newDepartmentId) {
            return {
              ...department,
              employees: [...department.employees, { _id: employeeId }],
            };
          }
          return department;
        });
        setDepartments(updatedDepartments);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (employeeId, departmentId) => {
    try {
      await deleteEmployee({ variables: { employeeId } });
      const updatedDepartments = departments.map(department => {
        if (department._id === departmentId) {
          return {
            ...department,
            employees: department.employees.filter(emp => emp._id !== employeeId),
          };
        }
        return department;
      });
      setDepartments(updatedDepartments);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <DepartmentList departments={departments} onReassign={handleReassign} onDelete={handleDelete} />;
};

export default Manager;
