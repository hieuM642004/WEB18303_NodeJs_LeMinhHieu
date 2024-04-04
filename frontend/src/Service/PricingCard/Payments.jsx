import React, { useState, useEffect } from 'react';
import axios from '../../config/axiosConfig';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [language, setLanguage] = useState('vn'); // Default language is Vietnamese

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const requestData = {
        amount: Number(amount),
        bankCode,
        language
      };
  
      console.log('Request data:', requestData); 
  
      const response = await axios.post('/premium/create_payment_url', requestData);
     
      console.log(response);
    } catch (error) {
      console.error('Error creating payment URL:', error);
    }
  };
  

  useEffect(() => {
    // Set default values for bankCode and language
    setBankCode('VNPAYQR');
    setLanguage('vn');
  }, []);

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label htmlFor="amount">Số tiền</label>
        <input
          className="form-control"
          id="amount"
          type="number"
          placeholder="Số tiền"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Chọn Phương thức thanh toán:</label>
        <div className="controls">
          <label className="radio-inline">
            <input
              type="radio"
              name="bankCode"
              value="VNPAYQR"
              checked={bankCode === 'VNPAYQR'}
              onChange={() => setBankCode('VNPAYQR')}
            />
            Cổng thanh toán VNPAYQR
          </label>
          {/* Add other payment methods similarly */}
        </div>
      </div>
      <div className="form-group">
        <label>Ngôn ngữ</label>
        <div className="controls">
          <label className="radio-inline">
            <input
              type="radio"
              name="language"
              value="vn"
              checked={language === 'vn'}
              onChange={() => setLanguage('vn')}
            />
            Tiếng việt
          </label>
          <label className="radio-inline">
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => setLanguage('en')}
            />
            Tiếng anh
          </label>
        </div>
      </div>
      <button className="btn btn-default cursor-pointer" type="submit">
        Thanh toán
      </button>
    </form>
  );
}

export default PaymentForm;
