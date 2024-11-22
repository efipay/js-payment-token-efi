"use client";
import { useState } from 'react';
import EfiPay from '../dist/payment-token-efi-umd.min.js';

const App = () => {
  const [paymentToken, setPaymentToken] = useState('');
  const [cardMask, setCardMask] = useState('');
  const [loading, setLoading] = useState(false);

  const runEfiJsCode = async () => {
    setLoading(true);

    try {
      const result = await EfiPay.CreditCard
        .setAccount('Identificador_de_conta_aqui')
        .setEnvironment('sandbox')  // 'production' or 'sandbox'
        .setCreditCardData({
          brand: 'visa',
          number: '4485785674290087',
          cvv: '123',
          expirationMonth: '05',
          expirationYear: '2031',
          reuse: false
        })
        .getPaymentToken();

      setPaymentToken(result.payment_token);
      setCardMask(result.card_mask);
      console.log('payment_token', result.payment_token);
      console.log('card_mask', result.card_mask);
    } catch (err) {
      console.log(err);
      console.log('Código: ', err.code);
      console.log('Nome: ', err.error);
      console.log('Mensagem: ', err.error_description);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={runEfiJsCode} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Payment Token'}
      </button>
      {paymentToken && cardMask && (
        <div>
          Payment Token: {paymentToken}<br />
          Card Mask: {cardMask}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <App />
    </div>
  );
}