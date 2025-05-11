import { sql } from "../lib/db";

async function main() {
  try {
    console.log("Starting database population script...");
    
    // Clear existing data (optional - remove these lines if you want to keep existing data)
    await clearAllTables();
    
    // Add data in the correct order to maintain referential integrity
    await addClasses();
    await addFaculty();
    await addSubjects();
    await addStudents();
    await addFacultyAssignments();
    await addMarks();
    
    console.log("Database population completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
}

async function clearAllTables() {
  console.log("Clearing existing data...");
  await sql`DELETE FROM marks`;
  await sql`DELETE FROM faculty_assignments`;
  await sql`DELETE FROM students`;
  await sql`DELETE FROM subjects`;
  await sql`DELETE FROM faculty`;
  await sql`DELETE FROM classes`;
  console.log("All tables cleared.");
}

async function addClasses() {
  console.log("Adding classes...");
  
  const classesData = [
    { year: 1, section: 'A', semester: 1 },
    { year: 1, section: 'B', semester: 1 },
    { year: 2, section: 'A', semester: 3 },
    { year: 2, section: 'B', semester: 3 },
    { year: 3, section: 'A', semester: 5 },
    { year: 3, section: 'B', semester: 5 },
    { year: 4, section: 'A', semester: 7 },
    { year: 4, section: 'B', semester: 7 },
  ];
  
  for (const cls of classesData) {
    await sql`
      INSERT INTO classes (year, section, semester)
      VALUES (${cls.year}, ${cls.section}, ${cls.semester})
    `;
  }
  
  console.log(`Added ${classesData.length} classes.`);
}

async function addFaculty() {
  console.log("Adding faculty...");
  
  const facultyData = [
    { name: 'Dr. Rajesh Kumar', email: 'rajesh.kumar@ise.edu', phone: '9876543210', designation: 'Professor' },
    { name: 'Dr. Priya Singh', email: 'priya.singh@ise.edu', phone: '9876543211', designation: 'Associate Professor' },
    { name: 'Prof. Amit Sharma', email: 'amit.sharma@ise.edu', phone: '9876543212', designation: 'Assistant Professor' },
    { name: 'Dr. Deepa Verma', email: 'deepa.verma@ise.edu', phone: '9876543213', designation: 'Professor' },
    { name: 'Prof. Sunil Mehta', email: 'sunil.mehta@ise.edu', phone: '9876543214', designation: 'Assistant Professor' },
    { name: 'Dr. Neha Patel', email: 'neha.patel@ise.edu', phone: '9876543215', designation: 'Associate Professor' },
    { name: 'Prof. Rahul Gupta', email: 'rahul.gupta@ise.edu', phone: '9876543216', designation: 'Assistant Professor' },
    { name: 'Dr. Kavita Reddy', email: 'kavita.reddy@ise.edu', phone: '9876543217', designation: 'Professor' },
  ];
  
  for (const faculty of facultyData) {
    await sql`
      INSERT INTO faculty (name, email, phone, designation)
      VALUES (${faculty.name}, ${faculty.email}, ${faculty.phone}, ${faculty.designation})
    `;
  }
  
  console.log(`Added ${facultyData.length} faculty members.`);
}

async function addSubjects() {
  console.log("Adding subjects...");
  
  const subjectsData = [
    { code: '21CS35', name: 'Data Structures and Algorithms', credits: 4 },
    { code: '21CS36', name: 'Database Management Systems', credits: 4 },
    { code: '21CS37', name: 'Operating Systems', credits: 3 },
    { code: '21CS38', name: 'Computer Networks', credits: 4 },
    { code: '21CS51', name: 'Software Engineering', credits: 3 },
    { code: '21CS52', name: 'Artificial Intelligence', credits: 4 },
    { code: '21CS53', name: 'Web Technologies', credits: 3 },
    { code: '21CS54', name: 'Machine Learning', credits: 4 },
    { code: '21CS71', name: 'Cloud Computing', credits: 3 },
    { code: '21CS72', name: 'Big Data Analytics', credits: 4 },
    { code: '21CS73', name: 'Internet of Things', credits: 3 },
    { code: '21CS74', name: 'Blockchain Technology', credits: 3 },
  ];
  
  for (const subject of subjectsData) {
    await sql`
      INSERT INTO subjects (code, name, credits)
      VALUES (${subject.code}, ${subject.name}, ${subject.credits})
    `;
  }
  
  console.log(`Added ${subjectsData.length} subjects.`);
}

async function addStudents() {
  console.log("Adding students...");
  
  const studentsData = [
    { usn: '1BI21IS001', name: 'Aditya Sharma', year: 3, section: 'A', email: 'aditya.s@ise.edu', phone: '9182736450' },
    { usn: '1BI21IS002', name: 'Bhavya Reddy', year: 3, section: 'A', email: 'bhavya.r@ise.edu', phone: '9182736451' },
    { usn: '1BI21IS003', name: 'Chetan Patel', year: 3, section: 'A', email: 'chetan.p@ise.edu', phone: '9182736452' },
    { usn: '1BI21IS004', name: 'Divya Krishnan', year: 3, section: 'A', email: 'divya.k@ise.edu', phone: '9182736453' },
    { usn: '1BI21IS005', name: 'Esha Mehta', year: 3, section: 'A', email: 'esha.m@ise.edu', phone: '9182736454' },
    { usn: '1BI21IS025', name: 'Farhan Ali', year: 3, section: 'B', email: 'farhan.a@ise.edu', phone: '9182736455' },
    { usn: '1BI21IS026', name: 'Gauri Nair', year: 3, section: 'B', email: 'gauri.n@ise.edu', phone: '9182736456' },
    { usn: '1BI21IS027', name: 'Harish Kumar', year: 3, section: 'B', email: 'harish.k@ise.edu', phone: '9182736457' },
    { usn: '1BI21IS028', name: 'Ishita Verma', year: 3, section: 'B', email: 'ishita.v@ise.edu', phone: '9182736458' },
    { usn: '1BI21IS029', name: 'Jaideep Singh', year: 3, section: 'B', email: 'jaideep.s@ise.edu', phone: '9182736459' },
    { usn: '1BI20IS050', name: 'Kavya Gupta', year: 4, section: 'A', email: 'kavya.g@ise.edu', phone: '9182736460' },
    { usn: '1BI20IS051', name: 'Lokesh Rao', year: 4, section: 'A', email: 'lokesh.r@ise.edu', phone: '9182736461' },
    { usn: '1BI20IS052', name: 'Meera Desai', year: 4, section: 'A', email: 'meera.d@ise.edu', phone: '9182736462' },
    { usn: '1BI20IS075', name: 'Nikhil Joshi', year: 4, section: 'B', email: 'nikhil.j@ise.edu', phone: '9182736463' },
    { usn: '1BI20IS076', name: 'Oviya Sundaram', year: 4, section: 'B', email: 'oviya.s@ise.edu', phone: '9182736464' },
    { usn: '1BI22IS100', name: 'Prateek Sharma', year: 2, section: 'A', email: 'prateek.s@ise.edu', phone: '9182736465' },
    { usn: '1BI22IS101', name: 'Qureshi Ahmed', year: 2, section: 'A', email: 'qureshi.a@ise.edu', phone: '9182736466' },
    { usn: '1BI22IS125', name: 'Rashmi Patil', year: 2, section: 'B', email: 'rashmi.p@ise.edu', phone: '9182736467' },
    { usn: '1BI22IS126', name: 'Sanjay Hegde', year: 2, section: 'B', email: 'sanjay.h@ise.edu', phone: '9182736468' },
    { usn: '1BI23IS150', name: 'Tanvi Mishra', year: 1, section: 'A', email: 'tanvi.m@ise.edu', phone: '9182736469' },
    { usn: '1BI23IS175', name: 'Uday Nair', year: 1, section: 'B', email: 'uday.n@ise.edu', phone: '9182736470' },
  ];
  
  for (const student of studentsData) {
    await sql`
      INSERT INTO students (usn, name, year, section, email, phone)
      VALUES (${student.usn}, ${student.name}, ${student.year}, ${student.section}, ${student.email}, ${student.phone})
    `;
  }
  
  console.log(`Added ${studentsData.length} students.`);
}

async function addFacultyAssignments() {
  console.log("Adding faculty assignments...");
  
  // Get all faculty IDs
  const faculty = await sql`SELECT id FROM faculty`;
  
  // Get all class IDs
  const classes = await sql`SELECT id, year, section FROM classes`;
  
  // Get all subject codes
  const subjects = await sql`SELECT code FROM subjects`;
  
  const assignmentsData = [
    // 3rd year subjects (5th semester)
    { faculty_index: 0, class_filter: { year: 3, section: 'A' }, subject_index: 4 }, // Dr. Rajesh Kumar - Software Engineering
    { faculty_index: 1, class_filter: { year: 3, section: 'A' }, subject_index: 5 }, // Dr. Priya Singh - Artificial Intelligence
    { faculty_index: 2, class_filter: { year: 3, section: 'A' }, subject_index: 6 }, // Prof. Amit Sharma - Web Technologies
    { faculty_index: 0, class_filter: { year: 3, section: 'B' }, subject_index: 4 }, // Dr. Rajesh Kumar - Software Engineering
    { faculty_index: 1, class_filter: { year: 3, section: 'B' }, subject_index: 5 }, // Dr. Priya Singh - Artificial Intelligence
    { faculty_index: 3, class_filter: { year: 3, section: 'B' }, subject_index: 6 }, // Dr. Deepa Verma - Web Technologies
    
    // 2nd year subjects (3rd semester)
    { faculty_index: 4, class_filter: { year: 2, section: 'A' }, subject_index: 0 }, // Prof. Sunil Mehta - Data Structures
    { faculty_index: 5, class_filter: { year: 2, section: 'A' }, subject_index: 1 }, // Dr. Neha Patel - DBMS
    { faculty_index: 6, class_filter: { year: 2, section: 'A' }, subject_index: 2 }, // Prof. Rahul Gupta - OS
    { faculty_index: 4, class_filter: { year: 2, section: 'B' }, subject_index: 0 }, // Prof. Sunil Mehta - Data Structures
    { faculty_index: 5, class_filter: { year: 2, section: 'B' }, subject_index: 1 }, // Dr. Neha Patel - DBMS
    { faculty_index: 7, class_filter: { year: 2, section: 'B' }, subject_index: 2 }, // Dr. Kavita Reddy - OS
    
    // 4th year subjects (7th semester)
    { faculty_index: 3, class_filter: { year: 4, section: 'A' }, subject_index: 8 }, // Dr. Deepa Verma - Cloud Computing
    { faculty_index: 7, class_filter: { year: 4, section: 'A' }, subject_index: 9 }, // Dr. Kavita Reddy - Big Data
    { faculty_index: 2, class_filter: { year: 4, section: 'A' }, subject_index: 10 }, // Prof. Amit Sharma - IoT
    { faculty_index: 3, class_filter: { year: 4, section: 'B' }, subject_index: 8 }, // Dr. Deepa Verma - Cloud Computing
    { faculty_index: 7, class_filter: { year: 4, section: 'B' }, subject_index: 9 }, // Dr. Kavita Reddy - Big Data
    { faculty_index: 6, class_filter: { year: 4, section: 'B' }, subject_index: 10 }, // Prof. Rahul Gupta - IoT
  ];
  
  for (const assignment of assignmentsData) {
    // Find the matching class ID based on year and section
    const matchingClass = classes.find(
      cls => cls.year === assignment.class_filter.year && cls.section === assignment.class_filter.section
    );
    
    if (matchingClass && faculty[assignment.faculty_index] && subjects[assignment.subject_index]) {
      await sql`
        INSERT INTO faculty_assignments (faculty_id, class_id, subject_code)
        VALUES (${faculty[assignment.faculty_index].id}, ${matchingClass.id}, ${subjects[assignment.subject_index].code})
      `;
    }
  }
  
  console.log(`Added ${assignmentsData.length} faculty assignments.`);
}

async function addMarks() {
  console.log("Adding marks...");
  
  // Get all students
  const students = await sql`SELECT usn, year, section FROM students`;
  
  // Get all subjects
  const subjects = await sql`SELECT code FROM subjects`;
  
  const marksData = [];
  
  // Create marks for 3rd year students with 5th semester subjects
  const thirdYearStudents = students.filter(student => student.year === 3);
  const thirdYearSubjects = subjects.slice(4, 8); // Software Eng, AI, Web Tech, ML
  
  for (const student of thirdYearStudents) {
    for (const subject of thirdYearSubjects) {
      const internal_marks = Math.floor(Math.random() * 21) + 20; // Random marks between 20-40
      const external_marks = Math.floor(Math.random() * 31) + 30; // Random marks between 30-60
      marksData.push({
        usn: student.usn,
        subject_code: subject.code,
        internal_marks,
        external_marks,
        total_marks: internal_marks + external_marks
      });
    }
  }
  
  // Create marks for 2nd year students with 3rd semester subjects
  const secondYearStudents = students.filter(student => student.year === 2);
  const secondYearSubjects = subjects.slice(0, 4); // DS, DBMS, OS, CN
  
  for (const student of secondYearStudents) {
    for (const subject of secondYearSubjects) {
      const internal_marks = Math.floor(Math.random() * 21) + 20; // Random marks between 20-40
      const external_marks = Math.floor(Math.random() * 31) + 30; // Random marks between 30-60
      marksData.push({
        usn: student.usn,
        subject_code: subject.code,
        internal_marks,
        external_marks,
        total_marks: internal_marks + external_marks
      });
    }
  }
  
  // Create marks for 4th year students with 7th semester subjects
  const fourthYearStudents = students.filter(student => student.year === 4);
  const fourthYearSubjects = subjects.slice(8, 12); // Cloud, Big Data, IoT, Blockchain
  
  for (const student of fourthYearStudents) {
    for (const subject of fourthYearSubjects) {
      const internal_marks = Math.floor(Math.random() * 21) + 20; // Random marks between 20-40
      const external_marks = Math.floor(Math.random() * 31) + 30; // Random marks between 30-60
      marksData.push({
        usn: student.usn,
        subject_code: subject.code,
        internal_marks,
        external_marks,
        total_marks: internal_marks + external_marks
      });
    }
  }
  
  for (const mark of marksData) {
    await sql`
      INSERT INTO marks (usn, subject_code, internal_marks, external_marks, total_marks)
      VALUES (${mark.usn}, ${mark.subject_code}, ${mark.internal_marks}, ${mark.external_marks}, ${mark.total_marks})
    `;
  }
  
  console.log(`Added ${marksData.length} marks entries.`);
}

// Run the main function
main();
