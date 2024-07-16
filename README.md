<h1>Script payment_token cartão de crédito | Efí</h1>

Esta biblioteca JavaScript permite a criptografia dos dados do cartão diretamente no navegador do cliente, gerando o payment_token, identificando a bandeira do cartão e obtendo informações de parcelamento.

Com essa biblioteca é possível implementar uma solução segura e eficiente para manipulação de dados de cartão de crédito em seus projetos. Além disso, a criptografia dos dados diretamente no navegador do cliente aumenta a segurança da transação e protege as informações do cartão contra interceptações maliciosas.

**Ir para:**

- [**Demonstração**](#demonstração)
- [**Instalação**](#instalação)
  - [**Web**](#web-browser)
  - [**Gerenciador de pacote**](#gerenciador-de-pacote-npm-ou-yarn))
  	- [**UMD**](#universal-module-definition-umd)
  	- [**ES Modules**](#ecmascript-modules-esm)
  	- [**CommonJS**](#commonjs-cjs)
  - [**Tipagens TypeScript**](#tipagens-typescript)
- [**Utilização**](#utilização)
- [**Criação da cobrança**](#criação-da-cobrança)
- [**Documentação Adicional**](#documentação-adicional)
- [**Comunidade e suporte**](#comunidade-e-suporte)
- [**Licença**](#licença)

---

## **Demonstração**

Para ilustrar a utilização desta biblioteca em um contexto prático, você pode conferir uma demonstração no seguinte link: <a href='https://efipay.github.io/js-payment-token-efi/' target ='_blank'>Clique aqui</a>.

![Demonstração geerando um payment_token](https://sejaefi.link/rygrqiv3DR)

---

## **Instalação**

Abaixo, fornecemos algumas opções de instalação da biblioteca para atender a projetos web que utilizam JavaScript puro ou frameworks modernos.

### **Web (Browser)**

Realize o <a href='https://raw.githubusercontent.com/efipay/js-payment-token-efi/main/dist/payment-token-efi-umd.min.js' target ='_blank'>download da biblioteca</a> localizada em `/dist/payment-token-efi-umd.min.js`, ou utilize a importação através do link do CDN.

Para uso diretamente em navegadores, a biblioteca será disponibilizada globalmente como `EfiPay`:

- **Importação local**
  ```html
  <script src="./dist/payment-token-efi-umd.min.js"></script>
  ```

### **Gerenciador de pacote (NPM ou Yarn)**

Se você estiver utilizando um gerenciador de pacotes como npm ou yarn, instale a biblioteca diretamente:

```sh
npm install payment-token-efi
// ou
yarn add payment-token-efi
```

Após a instalação, você pode importar a biblioteca conforme o ambiente que estiver utilizando:

#### **Universal Module Definition (UMD)**

Para ambientes que suportam Universal Module Definition:

```javascript
import EfiPay from "payment-token-efi";
```

#### **ECMAScript Modules (ESM)**

Para ambientes que suportam ES Modules:

```javascript
import EfiPay from "payment-token-efi";
```

#### **CommonJS (CJS)**

Para ambientes que utilizam o padrão CommonJS:

```javascript
const EfiPay = require("payment-token-efi");
```
_**Obs**: Esta biblioteca não é compatível no backend em Node.js_

### **Tipagens TypeScript**

Se você estiver utilizando TypeScript, você pode instalar as tipagens para a biblioteca:

```sh
npm install @types/payment-token-efi
// ou
yarn add @types/payment-token-efi
```

---

## **Utilização**

Este script oferece três funções para manipulação de dados de cartão de crédito. A primeira função permite <ins>**identificar a bandeira**</ins> do cartão a partir do seu número. A segunda função <ins>**busca informações de parcelamento**</ins> de acordo com as configurações de recebimento em sua conta. Por fim, a terceira função <ins>**gera o token de pagamento (payment_token) e a máscara do cartão (card_mask)**</ins> com base nos dados do cartão.

Para utilizar esse script, é necessário passar o código Identificador de Conta (payee_code) como parâmetro para gerar o payment_token dos dados do cartão de crédito. Você pode obter essa informação em sua conta digital, no menu `API > Introdução > Identificador de Conta`. <a href='https://s3.amazonaws.com/gerencianet-pub-prod-1/printscreen/2023/03/08/matheus.rodrigues/24fa15-dda30019-a643-409e-8813-c7cc68adcc40.png' target='_blank'>Veja onde encontrá-la</a>. Certifique-se de ter essa informação disponível ao utilizar as funções do script.

<br>

- ### **Identificar a bandeira**

  - **Dados de entrada:**

	| Parâmetro/Método | Descrição                   | Tipo    | Obrigatório |
	| ---------------- | --------------------------- | ------- | ----------- |
	| setCardNumber    | Número do cartão de crédito | string  | Sim         |
	| debugger         | Depurador de código         | boolean | Não         |

  - **Exemplo:**

    ```js
    async function identificarBandeira() {
      try {
        const efi = EfiPay.CreditCard;
        const bandeira = await efi
          .setCardNumber("4485785674290087")
          .verifyCardBrand();

        console.log("Bandeira: ", resultBandeira);
      } catch (error) {
        console.log("Código: ", error.code);
        console.log("Nome: ", error.error);
        console.log("Mensagem: ", error.error_description);
      }
    }
    ```

  - **Dados de saída:**

	| Parâmetro | Descrição                                                                                                       | Tipo   |
	| --------- | --------------------------------------------------------------------------------------------------------------- | ------ |
	| brand     | Brandeira do cartão. `"undefined"`, `"unsupported"`, `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"` | string |

<br>

- ### **Buscar as informações de parcelamento**

  - **Dados de entrada:**

	| Parâmetro/Método | Descrição                                                                     | Tipo    | Obrigatório |
	| ---------------- | ----------------------------------------------------------------------------- | ------- | ----------- |
	| setAccount       | Identificador de conta                                                        | string  | Sim         |
	| setEnvironment   | Ambiente. `"production"` ou `"sandbox"`                                       | string  | Sim         |
	| setBrand         | Bandeira do cartão `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"` | string  | Sim         |
	| setTotal         | Valor total                                                                   | Integer | Sim         |
	| debugger         | Depurador de código                                                           | boolean | Não         |

  - **Exemplo:**

    ```js
    async function listarParcelas() {
      try {
        const efi = EfiPay.CreditCard;
        const parcelas = await efi
          .setAccount("Identificador_de_conta_aqui")
          .setEnvironment("production") // 'production' or 'sandbox'
          .setBrand("visa")
          .setTotal(28990)
          .getInstallments()
          .console.log("Parcelas", installments);
      } catch (error) {
        console.log("Código: ", error.code);
        console.log("Nome: ", error.error);
        console.log("Mensagem: ", error.error_description);
      }
    }
    ```

  - **Dados de saída:**

	| Parâmetro    | Descrição                                                                                                                                                                | Tipo   |
	| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
	| installments | Array com as parcelas. `{"rate": 0,"name": "brand","installments": [{"installment": 1,"has_interest": false,"value": 500,"currency": "5,00","interest_percentage": 0}]}` | object |

<br>

- ### **Gerar o payment_token e card_mask**

  - **Dados de entrada:**

	| Parâmetro/Método  | Descrição                                                        | Tipo    | Obrigatório |
	| ----------------- | ---------------------------------------------------------------- | ------- | ----------- |
	| setAccount        | Identificador de conta                                           | string  | Sim         |
	| setEnvironment    | Ambiente. `"production"` ou `"sandbox"`                          | string  | Sim         |
	| setCreditCardData | Dados do cartão de crédito                                       | object  | Sim         |
	| -                 | brand `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"` | string  | Sim         |
	| -                 | number                                                           | string  | Sim         |
	| -                 | cvv                                                              | string  | Sim         |
	| -                 | expirationMonth `'MM'`                                           | string  | Sim         |
	| -                 | expirationYear `'YYYY'`                                          | string  | Sim         |
	| -                 | reuse                                                            | boolean | Não         |
	| debugger          | Depurador de código                                              | boolean | Não         |

  - **Exemplo:**

    ```js
    async function gerarPaymentToken() {
      try {
        const efi = EfiPay.CreditCard;
        const paymentTokenData = await efi
          .setAccount("Identificador_de_conta_aqui")
          .setEnvironment("production") // 'production' or 'sandbox'
          .setCreditCardData({
            brand: "visa",
            number: "4485785674290087",
            cvv: "123",
            expirationMonth: "05",
            expirationYear: "2029",
            reuse: false,
          })
          .getPaymentToken();

        const payment_token = paymentTokenData.payment_token;
        const card_mask = paymentTokenData.card_mask;

        console.log("payment_token", payment_token);
        console.log("card_mask", card_mask);
      } catch (error) {
        console.log("Código: ", error.code);
        console.log("Nome: ", error.error);
        console.log("Mensagem: ", error.error_description);
      }
    }
    ```

  - **Dados de saída:**

	| Parâmetro     | Descrição                                            | Tipo   |
	| ------------- | ---------------------------------------------------- | ------ |
	| payment_token | Token de pagamento que representa o cartão utilizado | string |
	| card_mask     | Máscara do cartão utilizado                          | string |

* ### **Ativar debbuger**

  O debugger pode ser ativado para depurar e encontrar possível falhas.

  ```js
  EfiPay.CreditCard.debugger(true);
  ```

* ### **Dados de saída em caso de falha**

  Em caso de erro, será retornado no try/catch o objeto com os parâmetros descritos abaixo.

  | Parâmetro         | Descrição                            | Tipo   |
  | ----------------- | ------------------------------------ | ------ |
  | code              | Código de erro para identificação.   | string |
  | error             | Nome do erro.                        | string |
  | error_description | Mensagem detalhando o erro ocorrido. | string |

<br>

---

## **Criação da cobrança**

Após a obtenção do payment_token será possível emitir a cobrança de cartão de crétito. [Acesse nossa documentação técnica](https://dev.efipay.com.br/docs/api-cobrancas/cartao#cria%C3%A7%C3%A3o-de-cobran%C3%A7a-por-cart%C3%A3o-de-cr%C3%A9dito-em-one-step-um-passo) para mais detalhes.

---

## **Documentação Adicional**

<a href='https://dev.efipay.com.br/' target='_blank'>Acesse nossa documentação técnica</a> para ver todas as informações das APIs Efí Pay.

Se você ainda não tem uma conta digital da Efí, <a href='https://sejaefi.com.br/' target='_blank'>abra a sua agora</a>!

---

## **Comunidade e suporte**

<a href="https://comunidade.sejaefi.com.br/"><img src="https://efipay.github.io/comunidade-discord-efi/assets/img/thumb-repository.png"></a>

Conecte-se a milhares de desenvolvedores, participe de discussões, tire dúvidas e integre suas operações às APIs Efí (API Pix, API Boletos e muito mais) com a ajuda da maior comunidade de integradores do Brasil. <a href='https://comunidade.sejaefi.com.br/' target='_blank'>Faça parte da comunidade Efí.

---

## **Licença**

[MIT](LICENSE)
