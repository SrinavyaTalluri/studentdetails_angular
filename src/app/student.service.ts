import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  grade: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  students: Student[] = [
    { id: 1, name: 'John Doe', grade: 'A' },
    { id: 2, name: 'Jane Smith', grade: 'B' }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    const maxId = this.students.length > 0
      ? Math.max(...this.students.map(s => s.id))
      : 0;
    this.students.push({ ...student, id: maxId + 1 });
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index > -1) this.students[index] = student;
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }
}
