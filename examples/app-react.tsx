import React, { useState, useEffect } from "react"; // Added useEffect
import "./App.css";
import EfiPay from "../dist/payment-token-efi-esm.min.js";

const App: React.FC = () => {
  const [paymentToken, setPaymentToken] = useState<string>("");
  const [cardMask, setCardMask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Add checkScriptBlocking function and call it on component mount
  useEffect(() => {
    async function checkScriptBlocking() {
      const isBlocked = await EfiPay.CreditCard.isScriptBlocked();

      if (isBlocked) {
        console.log("O script de fingerprint está bloqueado.");
        alert("O script que gera o payment_token está bloqueado. Verifique seu navegador ou extensão. ");
      } else {
        console.log("O script de fingerprint não está bloqueado.");
      }
    }
    checkScriptBlocking();
  }, []); // Empty dependency array ensures it runs once on mount

  const runEfiJsCode = async () => {
    setLoading(true);

    try {
      const result = await EfiPay.CreditCard
        .setAccount("Identificador_de_conta_aqui")
        .setEnvironment("sandbox") // 'production' or 'sandbox'
        .setCreditCardData({
          brand: "visa",
          number: "4485785674290087",
          cvv: "123",
          expirationMonth: "05",
          expirationYear: "2031",
          holderName: "Gorbadoc Oldbuck",
          holderDocument: "94271564656",
          reuse: false,
        })
        .getPaymentToken();

      if ("payment_token" in result && "card_mask" in result) {
        setPaymentToken(result.payment_token);
        setCardMask(result.card_mask);
        console.log("payment_token", result.payment_token);
        console.log("card_mask", result.card_mask);
      }
    } catch (err: any) {
      console.log(err);
      console.log("Código: ", err.code);
      console.log("Nome: ", err.error);
      console.log("Mensagem: ", err.error_description);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={runEfiJsCode} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Payment Token"}
        </button>
        {paymentToken && cardMask && (
          <div>
            Payment Token: {paymentToken}
            <br />
            Card Mask: {cardMask}
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
