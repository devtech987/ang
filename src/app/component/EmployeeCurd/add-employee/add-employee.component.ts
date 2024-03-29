import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public add_employee_form = this.fb.group({
    firstname:[''],
    lastname:[''],
    email:[''],
    username:[''],
    address:[''],
    experience:[''],
    joining_date:[''],
    employeetype:[''],
    status:[''],
    password:[''],
    confirmpassword:[''],
  })
  selectedFile:any = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;
  constructor(private fb:FormBuilder,
     public apiservice:AdminService,
      public router: Router,
      private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    }

  submit(){
    const paylode = new FormData();
    
    paylode.append("photo",this.selectedFile, this.selectedFile.name);
    paylode.append("firstname",this.add_employee_form.value.firstname);
    paylode.append("lastname",this.add_employee_form.value.lastname);
    paylode.append("email",this.add_employee_form.value.email);
    paylode.append("username",this.add_employee_form.value.username);
    paylode.append("address",this.add_employee_form.value.address);
    paylode.append("experience",this.add_employee_form.value.experience);
    paylode.append("joining_date",this.add_employee_form.value.joining_date);
    paylode.append("employeetype",this.add_employee_form.value.employeetype);
    paylode.append("status",this.add_employee_form.value.status);
    paylode.append("password",this.add_employee_form.value.password);
    paylode.append("confirmpassword",this.add_employee_form.value.confirmpassword);
    this.apiservice.addemployee(paylode).subscribe((data:any)=>{
      console.log('mkm',data);
      this._snackBar.open(data.success,'',
        {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        setTimeout(() => {
        }, 2000);
      this.apiservice.gettotalempcount().subscribe((data:any)=>{
          this.apiservice.totalemployee.next(data.employee);
          this.router.navigate(['/employee/viewemployee']); 
       },
       err=>{
          console.log('dkd',err);
          if(err.status=='401'){
            this.router.navigate(['/auth/login']);
          }
       });
    });
    
  }
}
