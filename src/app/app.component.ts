import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './Service/master.service';
import {  ITask, Task } from './model/task';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Task_test } from './model/Task_test';
import { FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  taskObj: Task = new Task();
  taskList: ITask[] = [];

test_array:Array<Task_test>=[];

  masterService = inject(MasterService);
  formBuilder = inject(FormBuilder);

  
  ngOnInit(): void {
    // this.valdation();
    this.taskObj = new Task();
    this.loadAllTask();

  }

  loadAllTask() {
    this.masterService.getAllTaskList().subscribe((res) => {

      console.log("DATATA SER 11"+res.data);
      console.log("DATATA SER "+JSON.stringify(res.data));

      // this.test_array=res.data;
      this.taskList =res;
    })
  }

  selectedTags: string = '';

  selectTag(tagName: string) {
    // Add the selected tag name to the textarea, separated by commas
    if (this.selectedTags !== '') {
      this.selectedTags += ', ';
    }
    this.selectedTags += tagName;
  }


  addTask() {
    const tagsArray = this.selectedTags.split(',').map(tag => tag.trim());
    // Join the tags array into a single string separated by commas
    const tagsString = tagsArray.join(', ');
    // Assign the concatenated string to taskObj.tags
    this.taskObj.tags = tagsString;
    this.taskObj.isCompeleted=false;
    // Send the request to add a new task
    this.masterService.addNewTask(this.taskObj).subscribe((res) => {
      // alert(JSON.stringify(res.id))
        if (res.id) {
            alert('Task Created Successfully');
            this.loadAllTask();
            this.taskObj = new Task(); // Reset taskObj after successful creation
        }else{
          alert('Task Not Created Successfully');
        }
    }, error => {
        alert('Api Call Error');
    });
}


  updateTask() {
    this.masterService.updateTask(this.taskObj).subscribe((res) => {
      if (res) {
        alert('Task Updated Successfully');
        this.loadAllTask();
        this.taskObj = new Task();
      }else{
        alert('Task Not Updated Successfully');
      }
    }, error => {
      alert('Api Call Error');
    })
  }

  onEdit(item: Task) {
    // alert(item)
    // alert(JSON.stringify(item.dueDate))
    // alert(JSON.parse(item))
    
    this.taskObj = item;
    // this.taskObj.dueDate=item.dueDate;
    setTimeout(() => {
      const dat = new Date(this.taskObj.dueDate);
      const year = dat.getFullYear();
      const month = ('0' + (dat.getMonth() + 1)).slice(-2);
      const day = ('0' + dat.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;

      const textDateInput = document.getElementById('textDate') as HTMLInputElement;
      if (textDateInput) {
        textDateInput.value = formattedDate;
      } else {
        console.error("Input field with id 'textDate' not found.");
      }
    }, 1000);
  }

  onDelete(item: Task) {
    const isConfirm = confirm("Are you Want to Delete")
    if (isConfirm) {
      this.masterService.deleteTask(item).subscribe((res) => {
        if (res) {
          alert('Task Deleted Successfully');
          this.loadAllTask();
        }else{
          alert('Task Not Deleted Successfully');
        }
      }, error => {
        alert('Api Call Error');
      })
    }
  }

  showCompleted(rs:boolean){
    this.taskList = this.taskList.filter((a) => a.isCompeleted);
  }

  showAll(){
    this.loadAllTask();
  }

  onSubmit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  form: FormGroup = new FormGroup({
    taskName: new FormControl(''),
    taskDescription: new FormControl(''),
    dueDate: new FormControl('')
  });
  submitted = false;


  valdation(){


    this.form = this.formBuilder.group(
      {
        taskName: ['', Validators.required],
        taskDescription: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(255),
          ],
        ],
        dueDate: ['',Validators.required]
      },
     
    );


  }

}
