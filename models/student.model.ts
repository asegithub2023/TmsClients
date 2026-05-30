export interface Student {
    readonly id: string;
    name: string;
    enrollmentDate: Temporal.Instant;
    gpa?: number;
}