import React from 'react';

const DepartmentList = ({ departments, onReassign }) => {
  return (
    <div>
      {departments.map(department => (
        <div key={department._id}>
          <h2>{department.name}</h2>
          <ul>
            {department.employees.map(employee => (
              <li key={employee._id}>
                {employee.name} - {employee.email}
                <button onClick={() => onReassign(employee._id, department._id)}>Reassign</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
