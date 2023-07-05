const EfiJs = require('payment-token-efi');

try {
	EfiJs.CreditCard
		.setAccount('Identificador_de_conta_aqui')
		.setEnvironment('sandbox') // 'production' or 'sandbox'
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
			if (err.code) {
				console.log('Código: ', err.code);
				console.log('Nome: ', err.error);
				console.log('Mensagem: ', err.error_description);
			} else {
				console.log(err);
			}
		});
} catch (error) {
	if (error.code) {
		console.log('Código: ', error.code);
		console.log('Nome: ', error.error);
		console.log('Mensagem: ', error.error_description);
	} else {
		console.log(err);
	}
}