import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_DEPARTMENTS } from '../utils/queries';
import { REASSIGN_EMPLOYEE } from '../utils/mutations';
import DepartmentList from '../components/DepartmentList';

const Manager = () => {
  const { loading, error, data } = useQuery(GET_ALL_DEPARTMENTS);
  const [reassignEmployee] = useMutation(REASSIGN_EMPLOYEE);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (data) {
      setDepartments(data.getAllDepartments);
    }
  }, [data]);

  const handleReassign = async (employeeId, currentDepartmentId) => {
    const newDepartmentId = prompt('Enter new department ID:');
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
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <DepartmentList departments={departments} onReassign={handleReassign} />;
};

export default Manager;
