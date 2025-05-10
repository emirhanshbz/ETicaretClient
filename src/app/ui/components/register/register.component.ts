import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {

  frm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      username: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      passwordConfirm: ["", Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  get component() {
    return this.frm.controls;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('passwordConfirm')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid) 
      return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded) 
      this.toastrService.message(result.message, "Kullanıcı kaydı başarılı." , {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopLeft
      });
    else
      this.toastrService.message(result.message, "Hata" , {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });

  }
}
