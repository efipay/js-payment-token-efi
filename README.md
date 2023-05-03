# Script payment_token cartão de crédito | Efí


## O que é?

> Módulo Javascript que permite a criptografia dos dados do cartão do cartão a partir do browser do cliente para gerar o payment_token, identificar a bandeira do cartão e obter informações de parcelamento.

# Exemplo

[Clique aqui](https://efipay.github.io/frontend-payment-token-efi/) para ver um modelo prático que utiliza o módulo JavaScript.

___

## **Instalação**
Realize o [download da biblioca](https://raw.githubusercontent.com/efipay/frontend-payment-token-efi/main/lib/payment-token-efi.min.js) localizada em `/lib/payment-token-efi.min.js`, e posteriormente a importação do múdulo para seu projeto.
```javascript
<script type="module" src="./lib/payment-token-efi.min"></script>
```
___

## **Utilização**

Este script permitirá executar 3 funções, para **identificar a bandeira** a partir do número do cartão, para **buscar as informações de parcelamento** de acordo com as configurações de recebimento em sua conta, e para **gerar o payment_token e card_mask** de acordo com os dados do cartão. Abaixo você encontra mais detalhes sobre estas funções.

**Observação:**
	Para utilizar é necessário passar código **Identificador de Conta** (payee_code) como parâmetro para gerar o payment_token dos dados do cartão de crédito. Essa informação você pode obter em sua conta digital, no menu `API > Introdução > Identificador de Conta`. [Veja onde]().

<br>

* ### **Identificar a bandeira**
	> **Entrada:** número do cartão (string)

	```html
	<script type="module" src="./lib/payment-token-efi.min"></script>

	<script>
		window.onload = function () { // Permita a chamada da função somente após o carregamento da página
			try {
				EfiJs.CreditCard
					.debugger(false)
					.setCardNumber('4485785674290087')
					.verifyCardBrand()
					.then(brand => {
						console.log('Bandeira: ', brand);

						if (brand !== 'undefined') {
							// Exemplo: executar a função para gerar o payment_token com a bandeira identificada
						}
					}).catch(err => {
						console.log('Código: ', err.codigo);
						console.log('Nome: ', err.nome);
						console.log('Mensagem: ', err.mensagem);
					});
			} catch (error) {
				console.log('Código: ', error.codigo);
				console.log('Nome: ', error.nome);
				console.log('Mensagem: ', error.mensagem);
			}
		};
	</script>
	```
	> **Saída (string):** `"undefined"`, `"unsupported"`, `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"`. Em caso de erro, será retornado o objeto com os parâmetros `"codigo"`, `"nome"` e `"mensagem"`.

<br>

* ### **Buscar as informações de parcelamento**
	> **Entrada:** identificador de conta (string), ambiente (string), bandeira (string), valor (string ou integer)
	```html
	<script type="module" src="./lib/payment-token-efi.min"></script>

	<script>
		window.onload = function () { // Permita a chamada da função somente após o carregamento da página
			try {
				EfiJs.CreditCard
					.debugger(false)
					.setAccount('Identificador_de_conta_aqui')
					.setEnvironment('production') // 'production' or 'homologation'
					.setBrand('visa')
					.setTotal('28990')
					.getInstallments()
					.then(installments => {
						console.log('Parcelas', installments);
					}).catch(err => {
						console.log('Código: ', err.codigo);
						console.log('Nome: ', err.nome);
						console.log('Mensagem: ', err.mensagem);
					});
			} catch (error) {
				console.log('Código: ', error.codigo);
				console.log('Nome: ', error.nome);
				console.log('Mensagem: ', error.mensagem);
			}
		};
	</script>
	```
	> **Saída (object):** `{"rate": 0,"name": "brand","installments": [{"installment": 1,"has_interest": false,"value": 500,"currency": "5,00","interest_percentage": 0}]}`. Em caso de erro, será retornado o objeto com os parâmetros `"codigo"`, `"nome"` e `"mensagem"`.

<br>

* ### **Gerar o payment_token e card_mask**
	> **Entrada:** identificador de conta (string), ambiente (string), dados do cartão (object) {brand (string), number (string), cvv (string), expirationMonth (string), expirationYear (string), reuse (boolean)}
	```html
	<script type="module" src="./lib/payment-token-efi.min"></script>

	<script>
		window.onload = function () { // Permita a chamada da função somente após o carregamento da página
			try {
				EfiJs.CreditCard
					.debugger(false)
					.setAccount('Identificador_de_conta_aqui')
					.setEnvironment('production') // 'production' or 'homologation'
					.setCreditCardData({
						brand: 'visa',
						number: '4485785674290087',
						cvv: '123',
						expirationMonth: '05',
						expirationYear: '2029',
						reuse: false
					})
					.getPaymentToken()
					.then(data => {
						const payment_token = data.payment_token;
						const card_mask = data.card_mask;

						console.log('payment_token', payment_token);
						console.log('card_mask', card_mask);
					}).catch(err => {
						console.log('Código: ', err.codigo);
						console.log('Nome: ', err.nome);
						console.log('Mensagem: ', err.mensagem);
					});
			} catch (error) {
				console.log('Código: ', error.codigo);
				console.log('Nome: ', error.nome);
				console.log('Mensagem: ', error.mensagem);
			}
		};
	</script>
	```
	> **Saída (object):** `{payment_token: "8000bc8035b8328cd121c1dc9f593e48e7030622", card_mask: "XXXXXXXXXXXX1179"}`. Em caso de erro, será retornado o objeto com os parâmetros `"codigo"`, `"nome"` e `"mensagem"`.

<br>

---

## **Documentação Adicional**

[Acesse nossa documentação técnica](https://sejaefi.com.br/api/) para ver todas as informações da geração do payment_token e mais detalhes das APIs.

Se você ainda não tem uma conta digital da Efí, [abra a sua agora](https://sejaefi.com.br/)!

---

## **Comunidade e suporte**
Conecte-se a milhares de desenvolvedores, participe de discussões, tire dúvidas e integre suas operações às APIs Efí (API Pix, API Boletos e muito mais) com a ajuda da maior comunidade de integradores do Brasil. [Faça parte da comunidade Efí](https://comunidade.sejaefi.com.br/).

---

## **Licença**
[MIT](LICENSE)