const fs = require('fs');

const TOTAL_TEACHERS = 100; // 🔁 change if needed
const OUTPUT_FILE = 'teachers.csv';

const departments = [
  {
    name: 'Computer Science',
    subjects: [
      'Data Structures',
      'Algorithms',
      'Operating Systems',
      'Database Systems',
      'Web Development'
    ]
  },
  {
    name: 'Electrical Engineering',
    subjects: [
      'Circuit Theory',
      'Digital Electronics',
      'Power Systems',
      'Control Systems'
    ]
  },
  {
    name: 'Mechanical Engineering',
    subjects: [
      'Thermodynamics',
      'Fluid Mechanics',
      'Manufacturing Processes',
      'Machine Design'
    ]
  },
  {
    name: 'Mathematics',
    subjects: [
      'Calculus',
      'Linear Algebra',
      'Statistics',
      'Discrete Mathematics'
    ]
  }
];

const designations = [
  { title: 'Professor', priority: 'high', maxHours: 20 },
  { title: 'Associate Professor', priority: 'high', maxHours: 18 },
  { title: 'Assistant Professor', priority: 'medium', maxHours: 20 },
  { title: 'Lecturer', priority: 'medium', maxHours: 18 }
];

const qualifications = {
  Professor: 'Ph.D.',
  'Associate Professor': 'Ph.D.',
  'Assistant Professor': 'M.Tech',
  Lecturer: 'M.Tech'
};

const firstNames = [
  'John','Sarah','Michael','Emily','Robert','David','Laura','James',
  'Linda','Daniel','Sophia','Mark','Olivia','Thomas','Emma'
];

const lastNames = [
  'Smith','Johnson','Brown','Davis','Wilson','Taylor','Anderson',
  'Thomas','Moore','Martin','Lee','Walker','Hall','Allen'
];

let csv = `id,name,email,phone,department,designation,qualification,experience,subjects,maxHoursPerWeek,priority,status\n`;

for (let i = 1; i <= TOTAL_TEACHERS; i++) {
  const id = `T${String(i).padStart(3, '0')}`;

  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const name = `Dr. ${firstName} ${lastName}`;

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
  const phone = `987654${3000 + i}`;

  const dept = departments[i % departments.length];
  const designationObj = designations[i % designations.length];

  const experienceYears =
    designationObj.title === 'Professor' ? '15 years' :
    designationObj.title === 'Associate Professor' ? '10 years' :
    designationObj.title === 'Assistant Professor' ? '5 years' :
    '3 years';

  const qualification = `${qualifications[designationObj.title]} in ${dept.name}`;

  const subjects = `"${dept.subjects.slice(0, 2).join(',')}"`;

  csv += `${id},${name},${email},${phone},${dept.name},${designationObj.title},${qualification},${experienceYears},${subjects},${designationObj.maxHours},${designationObj.priority},active\n`;
}

fs.writeFileSync(OUTPUT_FILE, csv);
console.log(`✅ ${TOTAL_TEACHERS} teachers CSV generated: ${OUTPUT_FILE}`);
