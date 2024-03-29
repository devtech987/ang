import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {

  public update_employee_form = this.fb.group({
    firstname:[''],
    lastname:[''],
    email:[''],
    username:[''],
    address:[''],
    experience:[''],
    employeetype:[''],
    status:[''],
    password:[''],
    confirmpassword:[''],
    date:[''],
  });
  image = '';
  public selectedFile:any = null;
  public id:any = '';
  public showdate:boolean = false;
  public is_notice:any = 'no';
  // snack bar start
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;
  //end
  constructor(private fb:FormBuilder,
     private api:AdminService,
     private router:Router,
     private _snackBar: MatSnackBar) { }
   
  ngOnInit(): void {
    this.api.getEmployee().subscribe((val:any)=>{
      this.update_employee_form.patchValue({
       firstname:val.success.firstname,
       lastname:val.success.lastname,
       email:val.success.email,
       username:val.success.username,
       address:val.success.address,
       experience:val.success.experience,
       employeetype:val.success.employeetype,
       status:val.success.status,
       date:val.success.date,
     });
     this.is_notice = val.success.is_notice;
     this.image = val.success.photo;
     this.id = val.success.id;
     console.log('gvh',val);
     console.log('gvh',this.image);
    },
    err=>{
      console.log('dkd',err);
          if(err.status=='401'){
            this.router.navigate(['/auth/login']);
          }
    });
  }

  update(){
    const date = this.update_employee_form.value.date;
    const d = new Date(date);
    const data = d.getFullYear()+"-"+ ("0"+(d.getMonth()+1)).slice(-2) +"-"+("0" + d.getDate()).slice(-2);

    const paylode = new FormData();
    if(this.selectedFile.name!==null){
      paylode.append("photo",this.selectedFile, this.selectedFile.name);
    }
    paylode.append("firstname",this.update_employee_form.value.firstname);
    paylode.append("lastname",this.update_employee_form.value.lastname);
    paylode.append("email",this.update_employee_form.value.email);
    paylode.append("username",this.update_employee_form.value.username);
    paylode.append("address",this.update_employee_form.value.address);
    paylode.append("experience",this.update_employee_form.value.experience);
    paylode.append("employeetype",this.update_employee_form.value.employeetype);
    paylode.append("status",this.update_employee_form.value.status);
    paylode.append("date",data);
    paylode.append("is_notice",this.is_notice);

    this.api.UpdateEmployee(this.id,paylode).subscribe((data:any)=>{
      console.log(data);
      alert(data.msg);
      this._snackBar.open(data.msg,'',
        {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        setTimeout(() => {
        }, 2000);

      this.router.navigate(['/profile']);
    },
    err=>{
      console.log('dkd',err);
          if(err.status=='401'){
            this.router.navigate(['/auth/login']);
          }
    });

  }

  onFileSelected(e:any){
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile);
  }

  isnotice(e:any){
    console.log(e.target.checked);
    this.showdate = e.target.checked;
    if(this.showdate==true){
        this.is_notice = 'yes';
    }
    if(this.showdate==false){
      this.is_notice = 'no';
  }
    console.log(this.is_notice);
}
}
