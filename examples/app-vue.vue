<template>
  <div id="app">
    <button @click="runEfiJsCode" :disabled="loading">
      {{ loading ? 'Fetching...' : 'Fetch Payment Token' }}
    </button>
    <div v-if="paymentToken && cardMask">
      Payment Token: {{ paymentToken }}<br />
      Card Mask: {{ cardMask }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
  import EfiPay from '../dist/payment-token-efi-umd.min.js';

export default {
  name: 'App',
  setup() {
    const paymentToken = ref('');
    const cardMask = ref('');
    const loading = ref(false);

    const runEfiJsCode = async () => {
      loading.value = true;

      try {
        await EfiPay.CreditCard
          .setAccount('Identificador_de_conta_aqui')
          .setEnvironment('sandbox');  // 'production' or 'sandbox'

        const result = await EfiPay.CreditCard
          .setCreditCardData({
            brand: 'visa',
            number: '4485785674290087',
            cvv: '123',
            expirationMonth: '05',
            expirationYear: '2031',
            reuse: false
          })
          .getPaymentToken();

        paymentToken.value = result.payment_token;
        cardMask.value = result.card_mask;
        console.log('payment_token', result.payment_token);
        console.log('card_mask', result.card_mask);
      } catch (err) {
        console.error(err);
        console.log('Código: ', err.code);
        console.log('Nome: ', err.error);
        console.log('Mensagem: ', err.error_description);
      } finally {
        loading.value = false;
      }
    };

    return {
      paymentToken,
      cardMask,
      loading,
      runEfiJsCode,
    };
  },
};
</script>

<style scoped>
/* Adicione seu estilo aqui */
</style>