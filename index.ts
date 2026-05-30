import { Temporal } from "@js-temporal/polyfill";
import { Student } from "./models/student.model";

const student: Student = {
    id: "STU-001",
    name: "Hana",
    enrollmentDate: Temporal.Now.instant(),
    gpa: 3.7
};

console.log(student);



import { Student, isStudent } from "./models/student.model";

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

