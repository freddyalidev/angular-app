import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'School Courses';
  form: FormGroup;
  formSubmitted: boolean = false;
  categories = [
    {
        name: "Math",
        subCategories: [
            {
                name: "Algebra",
                timeSlots:['08:00 AM', '11:00 AM']
            },
            {
                name: "Trignometry",
                timeSlots:['09:00 AM', '12:00 PM']
            },
            {
                name: "Calculas",
                timeSlots:['10:00 AM', '03:00 PM']
            },
        ]
    },
    {
        name: "Science",
        subCategories: [
            {
                name: "Physics",
                timeSlots:['10:00 AM', '03:00 PM']
            },
            {
                name: "Chemistry",
                timeSlots:['09:00 AM', '01:00 PM']
            },
            {
                name: "Biology",
                timeSlots:['08:00 AM', '10:00 AM']
            },
        ]
    },
    {
        name: "Art",
        subCategories: [
            {
                name: "Art History",
                timeSlots:['11:00 AM']
            },
            {
                name: "Painting",
                timeSlots:['02:00 PM']
            },
            {
                name: "Drawing",
                timeSlots:['08:00 AM', '05:00 AM']
            },
        ]
    },
    {
        name: "Language Arts",
        subCategories: [
            {
                name: "Literature",
                timeSlots:['08:30 AM', '11:45 AM']
            },
            {
                name: "Grammar",
                timeSlots:['08:00 AM', '09:00 AM', '10:00 AM','11:00 AM', '01:00 PM']
            },
            {
                name: "Writing",
                timeSlots:['8:00 AM', '11:00 AM']
            },
        ]
    }
  ]
  subCategories = [];
  timeSlot = [];

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]],
      student_id: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      subject: ['', Validators.compose([Validators.required])],
      course_topic: [{value: '', disabled: true}, Validators.compose([Validators.required])],
      timeslot: [{value: '', disabled: true}, Validators.compose([Validators.required])],
    });
  }

  fieldsOnChange(event?: any, type?: any){
    if(type && type == 'subject'){
      let subCat = this.categories.filter(item => item.name == event.target.value);
      this.subCategories = [...subCat[0].subCategories];
      this.form.get('course_topic').enable();
    }
    if(type && type == 'topic'){
      let course = this.subCategories.filter(item => item.name == event.target.value);
      this.form.get('timeslot').enable();
      this.timeSlot = [...course[0].timeSlots];

    }
  }

  submit(){
    this.formSubmitted = true;
  }

}
