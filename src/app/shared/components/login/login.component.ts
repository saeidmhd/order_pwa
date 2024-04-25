import { Component, HostListener } from '@angular/core';

import { UtilityService } from '../../../core/services/common/utility.service';
import { AuthService } from '../../../core/services/authorizing/auth.service';
import { LoginBody } from 'src/app/core/models/bazara/bazara-DTOs/Login';


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

    //clear visitor data from local storage 
    this.authService.logoutFromMobileOrdering();

    let model: LoginBody = {
      userName: this.formData.username,
      password: this.formData.password
    };

    this.authService.loginToMobileOrdering(model).subscribe(res => {
    });
  }
}