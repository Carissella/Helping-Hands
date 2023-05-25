import React, { useState } from 'react';

const School = () => {
  const [students, setStudents] = useState([]);

  const handleAddStudent = () => {
    const newStudent = prompt('Enter student name:');
    if (newStudent) {
      setStudents([...students, newStudent]);
    }
  };

  return (
    <div>
      <h2>School</h2>
      <button onClick={handleAddStudent}>Add Student</button>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
};

export default School;
