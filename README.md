# Script payment_token cartão de crédito | Efí


## O que é?

Este módulo JavaScript permite a criptografia dos dados do cartão diretamente no navegador do cliente, gerando o payment_token, identificando a bandeira do cartão e obtendo informações de parcelamento.

Com essa biblioteca é possível implementar uma solução segura e eficiente para manipulação de dados de cartão de crédito em seus projetos. Além disso, a criptografia dos dados diretamente no navegador do cliente pode aumentar a segurança da transação e proteger as informações do cartão contra interceptações maliciosas.

# Exemplo
Para ilustrar a utilização deste módulo em um contexto prático, você pode conferir um exemplo no seguinte link: <a href='https://efipay.github.io/script-payment-token-efi/' target ='_blank'>Clique aqui</a>.

___

## **Instalação**
Realize o <a href='https://raw.githubusercontent.com/efipay/script-payment-token-efi/main/dist/payment-token-efi.min.js' target ='_blank'>download da biblioca</a> localizada em `/dist/payment-token-efi.min.js`, ou importação através do link do CDN.

**Importação local**
```javascript
<script type="module" src="./dist/payment-token-efi.min"></script>
```

**Importação por CDN**
```javascript
<script type="module" src="https://cdn.jsdelivr.net/gh/efipay/script-payment-token-efi/dist/payment-token-efi.min.js"></script>
```

___

## **Utilização**

Este script oferece três funções para manipulação de dados de cartão de crédito. A primeira função permite <ins>**identificar a bandeira**</ins> do cartão a partir do seu número. A segunda função <ins>**busca informações de parcelamento**</ins> de acordo com as configurações de recebimento em sua conta. Por fim, a terceira função <ins>**gera o token de pagamento (payment_token) e a máscara do cartão (card_mask)**</ins> com base nos dados do cartão.

Para utilizar esse script, é necessário passar o código Identificador de Conta (payee_code) como parâmetro para gerar o payment_token dos dados do cartão de crédito. Você pode obter essa informação em sua conta digital, no menu `API > Introdução > Identificador de Conta`. <a href='https://s3.amazonaws.com/gerencianet-pub-prod-1/printscreen/2023/03/08/matheus.rodrigues/24fa15-dda30019-a643-409e-8813-c7cc68adcc40.png' target='_blank'>Veja onde encontrá-la</a>. Certifique-se de ter essa informação disponível ao utilizar as funções do script.

<br>

* ### **Identificar a bandeira**
	> **Entrada:** número do cartão (string)

	```html
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

<a href='https://sejaefi.com.br/api/' target='_blank'>Acesse nossa documentação técnica</a> para ver todas as informações da geração do payment_token e mais detalhes das APIs.

Se você ainda não tem uma conta digital da Efí, <a href='https://sejaefi.com.br/' target='_blank'>abra a sua agora</a>!

---

## **Comunidade e suporte**
Conecte-se a milhares de desenvolvedores, participe de discussões, tire dúvidas e integre suas operações às APIs Efí (API Pix, API Boletos e muito mais) com a ajuda da maior comunidade de integradores do Brasil. <a href='https://comunidade.sejaefi.com.br/' target='_blank'>Faça parte da comunidade Efí.

---

## **Licença**
[MIT](LICENSE)