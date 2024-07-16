declare module "payment-token-efi" {
  export namespace EfiJs {
    namespace CreditCard {
      function setEnvironment(environment: "production" | "sandbox"): typeof CreditCard;
      function setCardNumber(cardNumber: string): typeof CreditCard;
      function verifyCardBrand(): Promise<string>;
      function setAccount(accountIdentifier: string): typeof CreditCard;
      function setBrand(brand: string): typeof CreditCard;
      function setTotal(total: number): typeof CreditCard;
      function getInstallments(): Promise<InstallmentsResponse | ErrorResponse>;
      function setCreditCardData(data: CreditCardData): typeof CreditCard;
      function getPaymentToken(): Promise<PaymentTokenResponse | ErrorResponse>;

      interface Installment {
        installment: number;
        has_interest: boolean;
        value: number;
        currency: string;
        interest_percentage: number;
      }

      interface InstallmentsResponse {
        rate: number;
        name: string;
        installments: Installment[];
      }

      interface ErrorResponse {
        code: string;
        error: string;
        error_description: string;
      }

      interface CreditCardData {
        brand: string;
        number: string;
        cvv: string;
        expirationMonth: string;
        expirationYear: string;
        reuse: boolean;
      }

      interface PaymentTokenResponse {
        payment_token: string;
        card_mask: string;
      }
    }
  }
}
