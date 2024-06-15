import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from 'src/app/core/models/bazara/bazara-DTOs/promotion';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.css']
})
export class PromotionListComponent implements OnInit {
  promotions: Promotion[] = [];
  isLoading = false;
  searchText = '';

  constructor(private indexedDbService: IndexedDbService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.indexedDbService.getAllData<Promotion>("Promotion").then((promotions: Promotion[]) => {
      if (promotions.length > 0) {
        this.promotions = promotions;
        this.isLoading = false;
      }
    });
  }

  get filteredPromotions() {
    return this.promotions.filter(promotion =>
      this.getOtherField(promotion, 'NamePromotion').toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getOtherField(promotion: Promotion, fieldName: string): string {
    const otherFields = JSON.parse(promotion.OtherFields);
    return otherFields[fieldName] || 'تعیین نشده';
  }

  getOtherFieldAsNumber(promotion: Promotion, fieldName: string): number {
    const otherFields = JSON.parse(promotion.OtherFields);
    return Number(otherFields[fieldName]) || 0;
  }

  getOtherFieldAsBoolean(promotion: Promotion, fieldName: string): boolean {
    const otherFields = JSON.parse(promotion.OtherFields);
    return Boolean(otherFields[fieldName]);
  }

  getText(fieldName: string, value: any): string {
    switch (fieldName) {
      case 'LevelPromotion':
        switch (value) {
          case 0: return 'کالا و خدمات';
          case 1: return 'کالا';
          case 2: return 'خدمات';
          default: return '';
        }
      case 'AccordingTo':
        switch (value) {
          case 0: return 'مبلغ کل فاکتور';
          case 1: return 'جمع اقلام فاکتور';
          case 2: return 'جمع حجم اقلام';
          case 3: return 'جمع وزن اقلام';
          case 4: return 'جمع انواع اقلام فاکتور';
          case 5: return 'مبلغ سطر';
          case 6: return 'مقدار سطر';
          default: return '';
        }
      case 'IsAllCustomer':
        return value ? 'همه مشتریان' : 'مشتریان خاص';
      case 'IsAllGood':
        return value ? 'همه کالاها' : 'کالای خاص';
      case 'IsAllService':
        return value ? 'همه خدمات' : 'خدمات خاص';
      case 'IsAllAnbar':
        return value ? 'همه انبارها' : 'انبار خاص';
      case 'IsAllVisitor':
        return value ? 'همه ویزیتورها' : 'ویزیتورهای خاص';
      case 'TypeTasvieh':
        switch (value) {
          case 0: return 'تعیین نشده';
          case 1: return 'نقد';
          case 2: return 'چک';
          case 3: return 'نقد و چک';
          case 4: return 'نسیه';
          default: return '';
        }
      case 'IsCalcLinear':
        return value ? 'خطی' : 'پلکانی';
      default:
        return '';
    }
  }

  goToDetail(promotionId: number) {
    // Navigate to the detail page or handle the detail logic
  }
}
