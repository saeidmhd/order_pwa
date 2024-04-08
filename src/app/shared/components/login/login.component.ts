import { Component, HostListener } from '@angular/core';

import { UtilityService } from '../../services/common/utility.service';
import { IBazaraLoginDTO } from '../../models/login-model/IBazaraLoginDTO';
import { AuthService } from '../../services/authorizing/auth.service';

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

  constructor(private utilityService: UtilityService, private authService: AuthService) {
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

    this.authService.loginToMobileOrdering(model).subscribe();

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