import { Component, HostListener } from '@angular/core';
import { LoginService } from '../login.service';

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

  constructor(private loginService: LoginService) {}

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
    const { username, password } = this.formData;

    this.isLoading = true; // Show loading indicator
    this.loginError = ''; // Clear any previous error message

    this.loginService.login(username, password).subscribe({
      next: (response) => {
        // Handle successful response here
        console.log(response);
        this.isLoading = false; // Hide loading indicator on success
      },
      error: (error) => {
        // Handle error, e.g., display an error message
        console.log(error)
        this.loginError = 'Login failed. Please check your credentials.';
        this.isLoading = false; // Hide loading indicator on error
      }
    });    
  }
}
