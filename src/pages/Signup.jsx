import React, { useState } from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Sign Up</h2>
      <form style={{ maxWidth: '300px', margin: 'auto' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} style={{ width: '100%', padding: '8px' }} />
        </label>
        <label style={{ display: 'block', marginBottom: '20px' }}>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '8px' }} />
        </label>
        <button
          type="button"
          style={{
            padding: '10px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </form>
      <div>
      <h2>Google Sign In</h2>
        
      </div>
    </div>
  );
};

export default SignUp;
