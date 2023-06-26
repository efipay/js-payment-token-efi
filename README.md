<h1>Script payment_token cartão de crédito | Efí</h1>

Este módulo JavaScript permite a criptografia dos dados do cartão diretamente no navegador do cliente, gerando o payment_token, identificando a bandeira do cartão e obtendo informações de parcelamento.

Com essa biblioteca é possível implementar uma solução segura e eficiente para manipulação de dados de cartão de crédito em seus projetos. Além disso, a criptografia dos dados diretamente no navegador do cliente aumenta a segurança da transação e protege as informações do cartão contra interceptações maliciosas.

Ir para:
- [**Exemplo**](#exemplo)
- [**Instalação**](#instalação)
	- [**Web**](#web)
	- [**Node**](#node)
- [**Utilização**](#utilização)
- [**Criação da cobrança**](#criação-da-cobrança)
- [**Documentação Adicional**](#documentação-adicional)
- [**Comunidade e suporte**](#comunidade-e-suporte)
- [**Licença**](#licença)

___

## **Exemplo**
Para ilustrar a utilização deste módulo em um contexto prático, você pode conferir um exemplo no seguinte link: <a href='https://efipay.github.io/js-payment-token-efi/' target ='_blank'>Clique aqui</a>.

___

## **Instalação**
Abaixo, fornecemos algumas opções de instalação da biblioteca para atender a projetos web que utilizam JavaScript puro ou tecnologias como o Node.js. A seguir, apresentamos mais detalhes.

### **Web**
Realize o <a href='https://raw.githubusercontent.com/efipay/js-payment-token-efi/main/dist/payment-token-efi.min.js' target ='_blank'>download da biblioca</a> localizada em `/dist/payment-token-efi.min.js`, ou importação através do link do CDN.

- **Importação local**
	```javascript
	<script src="./dist/payment-token-efi.min"></script>
	```

- **Importação por CDN**
	```javascript
	<script src="https://cdn.jsdelivr.net/gh/efipay/js-payment-token-efi/dist/payment-token-efi.min.js"></script>
	```

### **Node**
Nesse cenário, você tem duas opções para instalar a biblioteca. 

- **Importação local**
  
	Fazer o <a href='https://raw.githubusercontent.com/efipay/js-payment-token-efi/main/distNode/payment-token-efi.js' target ='_blank'>download do arquivo</a> `/distNode/payment-token-efi.js` e adicioná-lo localmente.

	```js
	const EfiJs = require('./distNode/payment-token-efi');
	```


- **Importação por NPM**
	A segunda opção é utilizar o gerenciador de pacotes NPM e instalar a biblioteca com o seguinte comando:

	```cmd
	npm i payment-token-efi	
	// ou
	yarn add payment-token-efi	
	```

	Após a instalação da biblioteca, basta importá-la em seu projeto.

	```js
	const EfiJs = require('payment-token-efi');
	```

**Observação**

É importante ressaltar que também é necessário instalar a seguinte biblioteca para a virtualização do DOM.
```cmd
npm install jsdom --save
// ou
yarn add jsdom
```

___

## **Utilização**

Este script oferece três funções para manipulação de dados de cartão de crédito. A primeira função permite <ins>**identificar a bandeira**</ins> do cartão a partir do seu número. A segunda função <ins>**busca informações de parcelamento**</ins> de acordo com as configurações de recebimento em sua conta. Por fim, a terceira função <ins>**gera o token de pagamento (payment_token) e a máscara do cartão (card_mask)**</ins> com base nos dados do cartão.

Para utilizar esse script, é necessário passar o código Identificador de Conta (payee_code) como parâmetro para gerar o payment_token dos dados do cartão de crédito. Você pode obter essa informação em sua conta digital, no menu `API > Introdução > Identificador de Conta`. <a href='https://s3.amazonaws.com/gerencianet-pub-prod-1/printscreen/2023/03/08/matheus.rodrigues/24fa15-dda30019-a643-409e-8813-c7cc68adcc40.png' target='_blank'>Veja onde encontrá-la</a>. Certifique-se de ter essa informação disponível ao utilizar as funções do script.

<br>

* ### **Identificar a bandeira**
	* **Dados de entrada:**

		| Parâmetro/Método  | Descrição                            | Tipo     | Obrigatório |
		|-------------------|--------------------------------------|----------|-------------|
		| setCardNumber     | Número do cartão de crédito          | string   | Sim         |
		| debugger          | Depurador de código                  | boolean  | Não         |

		```js
		try {
			EfiJs.CreditCard
				.setCardNumber('4485785674290087')
				.verifyCardBrand()
				.then(brand => {
					console.log('Bandeira: ', brand);
					if (brand !== 'undefined') {
						// Exemplo: executar a função para gerar o payment_token com a bandeira identificada
					}
				}).catch(err => {
					console.log('Código: ', err.code);
					console.log('Nome: ', err.error);
					console.log('Mensagem: ', err.error_description);
				});
		} catch (error) {
			console.log('Código: ', error.code);
			console.log('Nome: ', error.error);
			console.log('Mensagem: ', error.error_description);
		}
		```

	* **Dados de saída:**

		| Parâmetro  | Descrição                         | Tipo     |
		|------------|-----------------------------------|----------|
		| brand      | Brandeira do cartão. `"undefined"`, `"unsupported"`, `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"`           | string   |



<br>

* ### **Buscar as informações de parcelamento**

	* **Dados de entrada:**

		| Parâmetro/Método  | Descrição                               | Tipo     | Obrigatório |
		|---------------|---------------------------------------------|----------|-------------|
		| setAccount | Identificador de conta                         | string   | Sim         |
		| setEnvironment | Ambiente. `"production"` ou `"homologation"`   | string   | Sim     |
		| setBrand | Bandeira do cartão `"visa"`, `"mastercard"`, `"amex"`, `"elo"`, `"hipercard"`  | string   | Sim  |
		| setTotal | Valor total                                     | Integer   | Sim         |
		| debugger | Depurador de código                             | boolean   | Não         |

		```js
		try {
			EfiJs.CreditCard
				.setAccount('Identificador_de_conta_aqui')
				.setEnvironment('production') // 'production' or 'homologation'
				.setBrand('visa')
				.setTotal(28990)
				.getInstallments()
				.then(installments => {
					console.log('Parcelas', installments);
				}).catch(err => {
					console.log('Código: ', err.code);
					console.log('Nome: ', err.error);
					console.log('Mensagem: ', err.error_description);
				});
		} catch (error) {
			console.log('Código: ', error.code);
			console.log('Nome: ', error.error);
			console.log('Mensagem: ', error.error_description);
		}
		```

	* **Dados de saída:**

		| Parâmetro  | Descrição                         | Tipo     |
		|------------|-----------------------------------|----------|
		| installments | Array com as parcelas. `{"rate": 0,"name": "brand","installments": [{"installment": 1,"has_interest": false,"value": 500,"currency": "5,00","interest_percentage": 0}]}` | object   |

<br>

* ### **Gerar o payment_token e card_mask**
	
	* **Dados de entrada:**

		| Parâmetro/Método  | Descrição                                      | Tipo     | Obrigatório |
		|-------------------|------------------------------------------------|----------|-------------|
		| setAccount        | Identificador de conta                         | string   | Sim         |
		| setEnvironment    | Ambiente. `"production"` ou `"homologation"`   | string   | Sim         |
		| setCreditCardData | Dados do cartão de crédito                     | object   | Sim         |
		|         -         | brand                                          | string   | Sim         |
		|         -         | number                                         | string   | Sim         |
		|         -         | cvv                                            | string   | Sim         |
		|         -         | expirationMonth 'MM'                           | string   | Sim         |
		|         -         | expirationYear  'YYYY'                         | string   | Sim         |
		|         -         | reuse                                          | boolean  | Não         |
		| debugger          | Depurador de código                            | boolean  | Não         |

		```js
		try {
			EfiJs.CreditCard
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
					console.log('Código: ', err.code);
					console.log('Nome: ', err.error);
					console.log('Mensagem: ', err.error_description);
				});
		} catch (error) {
			console.log('Código: ', error.code);
			console.log('Nome: ', error.error);
			console.log('Mensagem: ', error.error_description);
		}
		```

	* **Dados de saída:**

		| Parâmetro      | Descrição                                                    | Tipo     |
		|----------------|--------------------------------------------------------------|----------|
		| payment_token  | Token de pagamento que representa o cartão utilizado         | string   |
		| card_mask      | Máscara do cartão utilizado                                  | string   |


- ### **Ativar debbuger**
	O debugger pode ser ativado para depurar e encontrar possível falhas.
	```js
	EfiJs.CreditCard.debugger(true);
	```
	

- ### **Dados de saída em caso de falha**
  	Em caso de erro, será retornado o objeto com os parâmetros descritos abaixo.

  	| Parâmetro | Descrição                                         | Tipo     |
  	|-----------|---------------------------------------------------|----------|
  	| code     | Código de erro para identificação.                 | string   |
  	| error | Nome do erro.                                         | string   |
  	| error_description | Mensagem detalhando o erro ocorrido.      | string   |


<br>

---

## **Criação da cobrança**

Após a obtenção do payment_token será possível emitir a cobrança de cartão de crétito. [Acesse nossa documentação técnica](https://dev.gerencianet.com.br/docs/pagamento-com-cartao#2-criar-cobran%C3%A7a-por-cart%C3%A3o-de-cr%C3%A9dito) para mais detalhes.

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
