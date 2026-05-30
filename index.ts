import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";

const student: Student = {
    id: "STU-001",
    name: "Hana",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.7
};

console.log(student);