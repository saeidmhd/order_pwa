import { Component, HostListener } from '@angular/core';

import { LoginService } from '../../../core/services/login.service';
import { UtilityService } from '../../services/common/utility.service';
import { BazaraService } from '../../services/bazara/bazara.service';
import { IBazaraLoginDTO } from '../../models/login-model/IBazaraLoginDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData: { username: string, password: string } = { username: '', password: '' };
  loginError: string = '';
  isLoading: boolean = false;
  isKeyboardOpen = false;

  constructor(private loginService: LoginService,
    private utilityService: UtilityService,
    private bazaraService: BazaraService) {
    this.utilityService.showMenuFooter.next(false);
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustLayout();
  }

  adjustLayout() {
    // Adjust your layout based on whether the keyboard is open
    if (this.isKeyboardOpen) {
      // The keyboard is open
    } else {
      // The keyboard is closed
    }
  }

  onFocus() {
    this.isKeyboardOpen = true;
    this.adjustLayout();
  }

  onBlur() {
    this.isKeyboardOpen = false;
    this.adjustLayout();
  }

  onSubmit() {
    this.isLoading = true; // Show loading indicator
    this.loginError = ''; // Clear any previous error message

    let model: IBazaraLoginDTO = {
      userName: this.formData.username,
      password: this.formData.password
    };
    this.bazaraService.bazaraLogin(model).subscribe(res => {
      console.log(res, 'result login chie');

    });

    // Mr Mohamadi's Code
    // this.loginService.login(username, password).subscribe({
    //   next: (response) => {
    //     this.isLoading = false; // Hide loading indicator on success
    //   },
    //   error: (error) => {
    //     this.loginError = 'Login failed. Please check your credentials.';
    //     this.isLoading = false; // Hide loading indicator on error
    //   }
    // });
  }
}