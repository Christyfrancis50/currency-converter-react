import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.rates[to]);
      });
  }, [amount, from, to])


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className="bg-white p-6 rounded-xl w-85.5 shadow">
        <h1 className='font-bold text-xl text-center mb-4'>
          Currency Converter
        </h1>

        <input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='w-full border p-2 rounded'
        />

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className='w-full border p-2 rounded'
        >
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className='w-full border p-2 rounded'
        >
          <option>USD</option>
          <option>INR</option>
          <option>EUR</option>
        </select>

        <p className='text-center text-lg font-bold text-green-600'>
          {result} {to}
        </p>
      </div>
    </div>
  );
}

export default App
