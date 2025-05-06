import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  frm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      kullaniciAdi: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      sifre: ["", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      sifreTekrar: ["", Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  get component() {
    return this.frm.controls;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('sifre')?.value;
    const confirmPassword = group.get('sifreTekrar')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(data: User) {
    this.submitted = true;
    if (this.frm.invalid) return;
  }
}
