import React, { useState } from 'react';
import './ContactUs.css';

const ContactPage = () => {
  const [contactData, setContactData] = useState({ Name: '', Mobile: '', Email: '', Company: '', Message: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const isValidEmail = (Email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email);
  const isValidMobile = (Mobile) => /^[6-9]\d{9}$/.test(Mobile);

  const validateField = (field, value) => {
    if (value.trim() === '') {
      return `${field} is Required.`;
    } else if (field === "Email" && !isValidEmail(value)) {
      return "Invalid Email.";
    } else if (field === "Mobile" && !isValidMobile(value)) {
      return "Invalid Mobile Number.";
    }
    return '';
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const Message = validateField(name, value);
    setErrorMsg(Message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: name === 'Mobile' ? value.replace(/\D/g, '') : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key in contactData) {
      if (contactData[key].trim() === '') {
        setErrorMsg(`${key} is Required.`);
        setSuccessMsg(false);
        return false;
      }
    }
    setSuccessMsg(true);
    return true;
  };

  return (
    <div id="contact">
      <div className="form">  
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color:'#5383d3', fontWeight:"bolder" }}>Contact Us</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!successMsg ? (
            <>
              { errorMsg && 
              <div id="errormessage" className={errorMsg ? 'show' : ''}>
                {errorMsg}
              </div>
              }
              <div className="form-group">
                <input name="Name" type="text" className="form-control" placeholder="Name" value={contactData.Name} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <input name="Mobile" type="text" maxLength={10} className="form-control" placeholder="Mobile" value={contactData.Mobile} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <input name="Company" type="text" className="form-control" placeholder="Company" value={contactData.Company} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <input name="Email" type="email" className="form-control" placeholder="Email" value={contactData.Email} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <textarea name="Message" className="form-control" placeholder="Message" value={contactData.Message} onChange={handleChange} onBlur={handleBlur} rows="3" />
              </div>
              <p className="text-right mb-0">
                <input type="Submit" className="btn btn-primary" value="Submit Now" />
              </p>
            </>
          ) : (
            <div className="show" id="sendmessage">
              Thank you for your message. We will contact you soon.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
