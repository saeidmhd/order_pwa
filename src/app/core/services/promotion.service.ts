import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/core/services/indexed-db/indexed-db.service';
import { Promotion, PromotionOtherFields } from 'src/app/core/models/bazara/bazara-DTOs/promotion';
import { InvoiceSummary } from 'src/app/core/models/bazara/bazara-DTOs/invoice-summary';
import { PromotionDetail, PromotionDetailOtherFields } from '../models/bazara/bazara-DTOs/promotion-detail';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  promotions!: Promotion[];

  constructor(private indexedDbService: IndexedDbService) {
    this.getActivePromotions();
  }

  async getActivePromotions(): Promise<Promotion[]> {
   this.promotions = await this.indexedDbService.getAllData<Promotion>("Promotion");
    const now = new Date();
    return this.promotions.filter(promo => {
      const otherFields: PromotionOtherFields = JSON.parse(promo.OtherFields);
      return otherFields.DateStart <= now.toISOString() && otherFields.DateEnd >= now.toISOString();
    });
  }

  async applyPromotion(invoiceSummary: InvoiceSummary): Promise<number> {
    let totalDiscount = 0;

    console.log(this.promotions);

    for (const promo of this.promotions) {
      const promotionDetails = await this.getPromotionDetails(promo.PromotionId);
      for (const detail of promotionDetails) {
        const detailOtherFields: PromotionDetailOtherFields = JSON.parse(detail.OtherFields);
        if (this.isEligibleForPromotion(invoiceSummary, promo, detailOtherFields)) {
          totalDiscount += this.calculatePromotion(invoiceSummary, detailOtherFields);
        }
      }
    }

    return totalDiscount;
  }

  private async getPromotionDetails(promotionId: number): Promise<PromotionDetail[]> {
    const allDetails = await this.indexedDbService.getAllData<PromotionDetail>("PromotionDetail");

    return allDetails.filter(detail => detail.PromotionId === promotionId);
  }

  private isEligibleForPromotion(invoiceSummary: InvoiceSummary, promotion: Promotion, detailOtherFields: PromotionDetailOtherFields): boolean {
    
    const promotionOtherFields: PromotionOtherFields = JSON.parse(promotion.OtherFields);

    switch (promotionOtherFields.AccordingTo) {
      case 0: // مبلغ کل فاکتور
        return invoiceSummary.TotalInvoiceAmount > detailOtherFields.ToPayment;
      case 1: // جمع اقلام فاکتور
        return invoiceSummary.TotalItemAmount > detailOtherFields.ToPayment;
      case 2: // جمع حجم اقلام
        return invoiceSummary.TotalItemVolume > detailOtherFields.ToPayment;
      case 3: // جمع وزن اقلام
        return invoiceSummary.TotalItemWeight > detailOtherFields.ToPayment;
      case 4: // جمع انواع اقلام فاکتور
        return invoiceSummary.TotalItemTypes > detailOtherFields.ToPayment;
      case 5: // مبلغ سطر
        return invoiceSummary.LineAmount > detailOtherFields.ToPayment;
      case 6: // مقدار سطر
        return invoiceSummary.LineQuantity > detailOtherFields.ToPayment;
      default:
        return false;
    }
  }

  private calculatePromotion(invoiceSummary: InvoiceSummary, detailOtherFields: PromotionDetailOtherFields): number {
    switch (detailOtherFields.HowToPromotion) {
      case 1: // تخفیف به مبلغ ثابت
        return detailOtherFields.MeghdarPromotion;
      case 2: // تخفیف درصدی
        return invoiceSummary.TotalInvoiceAmount * (detailOtherFields.MeghdarPromotion / 100);
      case 3: // تخفیف از سطوح
        return this.calculateTieredDiscount(invoiceSummary, detailOtherFields);
      case 4: // اشانتیون از همان کالا
        return this.calculateGiftSameItem(detailOtherFields);
      case 5: // اشانتیون از کالاهای دیگر
        return this.calculateGiftDifferentItem(detailOtherFields);
      default:
        return 0;
    }
  }

  private calculateTieredDiscount(invoiceSummary: InvoiceSummary, detailOtherFields: PromotionDetailOtherFields): number {
    // Implement tiered discount logic here
    return 0; // Placeholder
  }

  private calculateGiftSameItem( detailOtherFields: PromotionDetailOtherFields): number {
    // Implement gift same item logic here
    return 0; // Placeholder
  }

  private calculateGiftDifferentItem( detailOtherFields: PromotionDetailOtherFields): number {
    // Implement gift different item logic here
    return 0; // Placeholder
  }
}
