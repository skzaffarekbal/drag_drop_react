import React, { useState } from 'react';
import { studentsData } from '../DB/data';

// React component to render the students in a table with Tailwind CSS
function StudentTable() {
  const [students, setStudents] = useState(JSON.parse(JSON.stringify(studentsData)));
  const [draggedItem, setDraggedItem] = useState(null);
  const [newRank, setNewRank] = useState(null);

  const thClass = 'border px-4 py-2';
  const tdClass = 'border px-4 py-2 text-center';
  const tableClass = 'min-w-full bg-white border border-gray-200';

  const onDragStart = (e, index) => {
    // It run once when we start dragging
    let draggedData = students[index];
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', e.target);
    // e.dataTransfer.setDragImage(e.target, 20, 20);
    setDraggedItem(draggedData);
  };

  const onDragEnter = (index) => {
    // It run once when we dragging over a item
    setNewRank(index);
  };

  const onDragEnd = (index) => {
    // It run when we end dragging
    console.log('onDragEnd : ', index, newRank);
    if (index === newRank) {
      setDraggedItem(null);
      setNewRank(null);
      return;
    }

    let updatedStudents = students?.filter((item) => item.id !== draggedItem.id);
    updatedStudents.splice(newRank, 0, draggedItem);
    let newUpdatedStudents = updatedStudents.map((item, i) => ({ ...item, rank: i + 1 }));
    setStudents(newUpdatedStudents);
    setDraggedItem(null);
    setNewRank(null);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    // It runs multiple times when we're dragging over an item.
    console.log('Rank', index);
  };

  const PlaceHolder = () => (
    <tr>
      <td className={tdClass + ' bg-blue-50'} colSpan={6}>
        {/* &nbsp; */}Drop Here
      </td>
    </tr>
  );

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Student Information(Drag and Drop To Sort)</h2>
      <table className={tableClass}>
        <thead>
          <tr className='bg-gray-100'>
            <th className={thClass}>Rank</th>
            <th className={thClass}>ID</th>
            <th className={thClass}>Name</th>
            <th className={thClass}>Grade</th>
            <th className={thClass}>Percentage</th>
            <th className={thClass}>Age</th>
          </tr>
        </thead>
        <tbody>
          {newRank === 0 && draggedItem?.rank !== 1 ? <PlaceHolder /> : ''}
          {students.map((student, index) => (
            <>
              {newRank !== 0 &&
              draggedItem?.rank > newRank + 1 &&
              newRank === index &&
              index + 1 !== draggedItem?.rank ? (
                <PlaceHolder />
              ) : (
                ''
              )}
              <tr
                id={index}
                className={draggedItem?.rank === student.rank ? 'bg-gray-200' : ''}
                key={student.rank}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragEnd={() => onDragEnd(index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnter={() => onDragEnter(index)}
              >
                <td className={tdClass}>{student.rank}</td>
                <td className={tdClass}>{student.id}</td>
                <td className={tdClass}>{student.name}</td>
                <td className={tdClass}>{student.grade}</td>
                <td className={tdClass}>{student.percentage}%</td>
                <td className={tdClass}>{student.age}</td>
              </tr>
              {newRank !== 0 &&
              draggedItem?.rank < newRank + 1 &&
              newRank === index &&
              index + 1 !== draggedItem?.rank ? (
                <PlaceHolder />
              ) : (
                ''
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
