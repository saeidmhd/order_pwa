import { Component } from '@angular/core';
import { UtilityService } from 'src/app/core/services/common/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // Use styleUrls instead of styleUrl
})
export class FooterComponent {
  constructor(public utilityService: UtilityService) {}
}