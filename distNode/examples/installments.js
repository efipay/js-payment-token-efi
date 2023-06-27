const EfiJs = require('payment-token-efi');

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