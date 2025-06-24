import React, { useRef } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";

const PaymentScreen = () => {
  const webViewRef = useRef(null); // Referência ao WebView

  // HTML do WebView em Base64
  const webViewHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://cdn.jsdelivr.net/npm/payment-token-efi/dist/payment-token-efi-umd.min.js"></script>
    </head>
    <body>
      <script>
        async function checkScriptBlocking() {
          const isBlocked = await EfiPay.CreditCard.isScriptBlocked();
          if (isBlocked) {
            console.log("O script de fingerprint está bloqueado.");
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                error: {
                  code: "script_blocked",
                  name: "erro_script_bloqueado",
                  message:
                    "O script que gera o payment_token está bloqueado. Verifique seu navegador ou extensão.",
                },
              })
            );
          } else {
            console.log("O script de fingerprint não está bloqueado.");
          }
        }

        checkScriptBlocking();

        async function generateToken(data) {
          try {
            const result = await EfiPay.CreditCard
              .setAccount("Identificador_de_conta_aqui")
              .setEnvironment("production") // 'production' ou 'sandbox'
              .setCreditCardData(data)
              .getPaymentToken();

            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                payment_token: result.payment_token,
                card_mask: result.card_mask,
              })
            );
          } catch (error) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                error: {
                  code: error.code,
                  name: error.error,
                  message: error.error_description,
                },
              })
            );
          }
        }
      </script>
    </body>
    </html>
  `;

  const encodedHtml = `data:text/html;base64,${Buffer.from(webViewHtml).toString("base64")}`;

  // Dados dinâmicos a serem enviados para o WebView
  const sendPaymentDataToWebView = () => {
    const cardData = {
      brand: 'visa',
      number: '4485785674290087',
      cvv: '123',
      expirationMonth: '05',
      expirationYear: '2031',
      holderName: "Gorbadoc Oldbuck",
      holderDocument: "94271564656",
      reuse: false
    };

    const script = `
      (function() {
        const data = ${JSON.stringify(cardData)};
        generateToken(data);
      })();
    `;

    webViewRef.current.injectJavaScript(script);
  };

  const handleWebViewMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.payment_token) {
      console.log("Token de Pagamento:", data.payment_token);
      alert(`Token Gerado: ${data.payment_token}`);
    } else if (data.error) {
      console.error("Erro:", data.error);
      alert(`Erro: ${data.error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Efí Bank Payment Token Cartão</Text>
      <Button title="Enviar Dados para o WebView" onPress={sendPaymentDataToWebView} />
      <WebView
        ref={webViewRef}
        source={{ uri: encodedHtml }}
        onMessage={handleWebViewMessage}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  webview: {
    flex: 1,
    marginTop: 10,
  },
});

export default PaymentScreen;
