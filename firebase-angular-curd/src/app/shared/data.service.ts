import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { student } from 'src/model/students';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs:AngularFirestore
  ) { }

  // add students
  addStudent(student:student){
    student.id = this.afs.createId();
    return this.afs.collection('/Students').add(student);
  }

  // get students
  getStudents(){
    return this.afs.collection('/Students').snapshotChanges();
  }

  // delete student
  deleteStudent(student:student){
    return this.afs.doc('/Students/'+student.id).delete();
  }

  // update student
  updateStudent(student:student){
    this.deleteStudent(student);
    this.addStudent(student);
  }
  
}
