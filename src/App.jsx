import { useEffect, useState } from "react";
import { currencyToCountry } from "./currencyToCountry";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [currencies, setCurrencies] = useState([]);

  // Fetch all currencies
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(Object.keys(data));
      });
  }, []);

  // Convert currency
  useEffect(() => {
    if (!amount) return;

    fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResult(data.rates[to]);
      });
  }, [amount, from, to]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow">

        <h1 className="font-bold text-xl text-center mb-4">
          Currency Converter
        </h1>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <div className="flex items-center gap-2 mb-3">
          <Flag code={from} />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Flag code={to} />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <p className="text-center text-lg font-bold text-green-600">
          {result} {to}
        </p>

      </div>
    </div>
  );
}

function Flag({ code }) {
  const countryCode = currencyToCountry[code];

  if (!countryCode) {
    return (
      <div className="w-6 h-4 bg-gray-200 text-xs flex items-center justify-center">
        ?
      </div>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      alt={code}
      className="w-6 h-4"
    />
  );
}

export default App;
