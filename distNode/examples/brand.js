const EfiJs = require('payment-token-efi');

try {
	EfiJs.CreditCard
		.setCardNumber('4485785674290087') // visa
		.verifyCardBrand()
		.then(brand => {
			console.log('Bandeira: ', brand);
			if (!['undefined', 'unsupported'].includes(brand)) {
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