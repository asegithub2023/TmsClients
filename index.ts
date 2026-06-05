import { Temporal } from "@js-temporal/polyfill";
import { Student, isStudent } from "./models/student.model";
import { parseStudent } from "./models/student.model";
import { CourseStatus, describeCourse } from "./models/course.model"; 


import { ApiResponse, renderResponse } from "./models/api-response.model"; 
import { Course } from "./models/course.model"; 

const student: Student = {
id: "STU-001",
name: "Hana Tadesse",
enrollmentDate: Temporal.Now.instant(),
};

//student.id = "STU-999";// Cannot assign to b/c id is read only property
//console.log(student.gpa.toFixed(2));//student.gpa is optional.
console.log(student.gpa?.toFixed(2) ?? "Not yet graded");


function processStudent(raw: unknown) {
    if (isStudent(raw)) {
        const gpaDisplay =
            raw.gpa?.toFixed(2) ?? "Not yet graded";

        console.log(
            `Student ${raw.name} GPA: ${gpaDisplay}`
        );
    } else {
        console.error(
            "Invalid student data received"
        );
    }
}

processStudent({
    id: "STU-001",
    name: "Hana",
    gpa: 3.7
});

processStudent(42);

console.log(parseStudent({ id: "STU-001", name: "Hana" }));// Prints a valid Student object

parseStudent({ id: 42, name: "Test" });// Throws: TypeError: Expected id to be a string, received numbe



//session2
import { AssessmentItem, calculateGrade } from "./models/assessment.model"; 
 
const quiz: AssessmentItem = { 
  id: "QUIZ-001", 
  kind: "quiz", 
title: "SQL Basics", 
correctAnswers: 8, 
totalQuestions: 10, 
}; 
const lab: AssessmentItem = { 
id: "LAB-001", 
kind: "lab", 
title: "REST API Project", 
functionalityScore: 85, 
codeQualityScore: 90, 
}; 
console.log(`Quiz grade: ${calculateGrade(quiz)}%`); // 80 
console.log(`Lab grade: ${calculateGrade(lab)}%`); // 87 
// Verify readonly  try this line and check the compiler error: 
quiz.id = "QUIZ-999"; // ERROR: Cannot assign to 'id' because it is a read-only property 



const pending: EnrollmentStatus = { 
  status: "PENDING", 
  requestedAt: Temporal.Now.instant(), 
  studentId: "STU-001", 
  courseId: "CRS-101", 
}; 
console.log(describeEnrollment(pending)); // Awaiting approval since 2026-05-08T... 




const webDev: CourseStatus = { 
  status: "ACTIVE", 
  enrolledCount: 28, 
  startDate: Temporal.PlainDate.from("2026-09-01"), 
}; 
console.log(describeCourse(webDev)); // Should print something like: Active with 28 students since 2026-09-01 


 
const studentRes: ApiResponse<Student> = { 
  status: "success", 
  data: { 
    id: "STU-001", 
    name: "Dawit Bekele", 
    enrollmentDate: Temporal.Now.instant(), 
    gpa: 3.4, 
  }, 
  fetchedAt: Temporal.Now.instant(), 
}; 
 
console.log( 
  renderResponse(studentRes, (s) => `${s.name}  GPA: ${s.gpa ?? "N/A"}`), 
); 
 
// Now test with a different data type 
const courseListRes: ApiResponse<Course[]> = { 
  status: "success", 
  data: [ 
    { 
      id: "CRS-101", 
      title: "Web Development Fundamentals", 
      capacity: 30, 
      startDate: Temporal.PlainDate.from("2026-09-01"), 
    }, 
  ], 
  fetchedAt: Temporal.Now.instant(), 
}; 
console.log( 
renderResponse(courseListRes, (courses) => 
courses.map((c) => c.title).join(", "), 
), 
); 

