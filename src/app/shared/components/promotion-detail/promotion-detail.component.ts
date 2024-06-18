import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PromotionDetail } from 'src/app/core/models/bazara/bazara-DTOs/promotion-detail';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';

@Component({
  selector: 'app-promotion-detail',
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.css']
})
export class PromotionDetailComponent implements OnInit {
  promotionDetail: PromotionDetail | null = null;
  isLoading = false;
  promotionId: number;

  constructor(
    private route: ActivatedRoute,
    private indexedDbService: IndexedDbService
  ) {
    this.promotionId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.fetchPromotionDetail();
  }

  fetchPromotionDetail(): void {
    this.isLoading = true;
    this.indexedDbService.getAllData<PromotionDetail>('PromotionDetail')
      .then((promotionDetails: PromotionDetail[]) => {
        this.promotionDetail = promotionDetails.find(detail => detail.PromotionId === this.promotionId) || null;
        console.log("promotionDetail: ", this.promotionDetail);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Failed to fetch promotion details: ', error);
        this.isLoading = false;
      });
  }

  getOtherField(detail: PromotionDetail, fieldName: string): string {
    const otherFields = JSON.parse(detail.OtherFields);
    return otherFields[fieldName] || 'تعیین نشده';
  }

  getOtherFieldAsNumber(detail: PromotionDetail, fieldName: string): number {
    const otherFields = JSON.parse(detail.OtherFields);
    return Number(otherFields[fieldName]) || 0;
  }

  getText(fieldName: string, value: any): string {
    switch (fieldName) {
      case 'HowToPromotion':
        switch (value) {
          case 1: return 'تخفیف به مبلغ ثابت';
          case 2: return 'تخفیف درصدی';
          case 3: return 'تخفیف از سطوح';
          case 4: return 'اشانتیون از همان کالا';
          case 5: return 'اشانتیون از کالاهای دیگر';
          default: return 'نامشخص';
        }
      case 'ToPayment':
        // Assuming ToPayment can have specific values that need to be translated
        switch (value) {
          case 'someCondition1': return 'شرط ۱';
          case 'someCondition2': return 'شرط ۲';
          // Add more cases as needed
          default: return value;
        }
      case 'IsCalcAdditive':
        return value ? 'محاسبه صعودی' : 'عدم محاسبه صعودی';
      // Add more field names and their translation logic as needed
      default:
        return value; // Default to the raw value if no specific translation is needed
    }
  }
}
