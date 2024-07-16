import { Component } from "@angular/core";
import EfiPay from "../dist/payment-token-efi-esm.min.js";

@Component({
  selector: "app-root",
  template: `
    <div style="text-align:center">
      <button (click)="runEfiJsCode()" [disabled]="loading">
        {{ loading ? "Fetching..." : "Fetch Payment Token" }}
      </button>
      <div *ngIf="paymentToken && cardMask">
        Payment Token: {{ paymentToken }}<br />
        Card Mask: {{ cardMask }}
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  paymentToken: string = "";
  cardMask: string = "";
  loading: boolean = false;

  async runEfiJsCode() {
    this.loading = true;

    try {
      const result = await EfiPay.CreditCard.debugger(true, true)
        .setAccount("Identificador_de_conta_aqui")
        .setEnvironment("sandbox")  // 'production' or 'sandbox'
        .setCreditCardData({
          brand: "visa",
          number: "4485785674290087",
          cvv: "123",
          expirationMonth: "05",
          expirationYear: "2031",
          reuse: false,
        })
        .getPaymentToken();

      this.paymentToken = result.payment_token;
      this.cardMask = result.card_mask;
      console.log("payment_token", result.payment_token);
      console.log("card_mask", result.card_mask);
    } catch (err: any) {
      console.log(err);
      console.log("Código: ", err.code);
      console.log("Nome: ", err.error);
      console.log("Mensagem: ", err.error_description);
    } finally {
      this.loading = false;
    }
  }
}
