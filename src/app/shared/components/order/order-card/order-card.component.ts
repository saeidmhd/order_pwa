import { Component, Input } from '@angular/core';
import { OrdersReports } from 'src/app/core/models/pages/OrdersReports';

@Component({
  selector: 'app-order-card',
  standalone: false,
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  @Input() orderReports!: OrdersReports;
}