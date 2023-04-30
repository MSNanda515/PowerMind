import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{
  public registerForm!: FormGroup;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      threshold: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      capacity: new FormControl('', [Validators.required, Validators.min(0)]),
      dischargeCurrent: new FormControl('', [Validators.required, Validators.min(0)]),
      dischargeVoltage: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  public onSubmit() {
    this.authenticationService.register(
        this.registerForm.get('threshold')!.value,
        this.registerForm.get('capacity')!.value,
        this.registerForm!.get('dischargeCurrent')!.value,
        this.registerForm!.get('dischargeCurrent')!.value
    );
  }
}
