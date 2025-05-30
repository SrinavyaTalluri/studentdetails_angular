import { Component } from '@angular/core';
import { StudentService, Student } from '../student.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  standalone: false
})
export class StudentComponent {
  students: Student[] = [];
  currentStudent: Student = { id: 0, name: '', grade: '' };
  isEdit = false;

  constructor(
    private service: StudentService,
    private auth: AuthService,
    private router: Router
  ) {
    this.students = this.service.getStudents();
  }

  addOrUpdate() {
    if (this.isEdit) {
      this.service.updateStudent(this.currentStudent);
    } else {
      this.service.addStudent(this.currentStudent);
    }
    this.resetForm();
    this.refresh();
  }

  edit(student: Student) {
    this.currentStudent = { ...student };
    this.isEdit = true;
  }

  delete(id: number) {
    this.service.deleteStudent(id);
    this.refresh();
  }

  resetForm() {
    this.currentStudent = { id: 0, name: '', grade: '' };
    this.isEdit = false;
  }

  refresh() {
    this.students = this.service.getStudents();
  }

  logout() {
    this.auth.logout(); // better practice: call logout() from AuthService
  }
}
