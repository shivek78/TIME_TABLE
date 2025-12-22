const fs = require('fs');

const TOTAL_STUDENTS = 100;
const OUTPUT_FILE = 'students.csv';

const departments = [
  { name: 'Computer Science', courses: '"CSE101,CSE102"' },
  { name: 'Electrical Engineering', courses: '"EE201,EE202"' },
  { name: 'Mechanical Engineering', courses: '"ME201,ME202"' }
];

const firstNames = [
  'John','Jane','Michael','Emily','Daniel','Olivia','Ethan','Ava','Noah','Sophia',
  'Liam','Isabella','James','Mia','Benjamin','Charlotte','Lucas','Amelia','Henry','Evelyn'
];

const lastNames = [
  'Doe','Smith','Johnson','Williams','Brown','Anderson','Thomas','Moore','Taylor','Lee',
  'Martin','Clark','Walker','Hall','Allen','Young','King','Scott','Green','Baker'
];

let csv = `studentId,firstName,lastName,email,phone,dateOfBirth,gender,department,program,year,semester,division,batch,rollNumber,academicYear,admissionDate,street,city,state,zipCode,country,guardianName,guardianRelation,guardianPhone,guardianEmail,courses\n`;

for (let i = 1; i <= TOTAL_STUDENTS; i++) {
  const id = `STU${String(i).padStart(3, '0')}`;

  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
  const phone = `987654${3000 + i}`;

  const gender = i % 2 === 0 ? 'Female' : 'Male';

  const dept = departments[Math.floor((i - 1) / 34)];
  const year = i <= 50 ? 1 : 2;
  const semester = 1;

  const division = i <= 50 ? 'A' : 'B';
  const batch =
    i <= 25 ? 'A1' :
    i <= 50 ? 'A2' :
    i <= 75 ? 'B1' : 'B2';

  const rollNumber = i;

  csv += `${id},${firstName},${lastName},${email},${phone},2005-07-15,${gender},${dept.name},B.Tech,${year},${semester},${division},${batch},${rollNumber},2024-2025,2024-07-01,${i} Main St,Mumbai,Maharashtra,4000${String(i).padStart(2, '0')},India,${firstName} ${lastName},Parent,987654${4000 + i},guardian${i}@example.com,${dept.courses}\n`;
}

fs.writeFileSync(OUTPUT_FILE, csv);
console.log(`✅ ${TOTAL_STUDENTS} students CSV generated: ${OUTPUT_FILE}`);
