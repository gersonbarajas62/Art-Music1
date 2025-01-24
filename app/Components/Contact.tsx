"use client";

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for backend connection
    console.log('Form submitted:', formData);
  };

  return (
    <section
      style={{
        padding: '40px',
        backgroundColor: '#121212',
        color: '#fff',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Didn’t find what you were looking for?
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Contact us, and we’ll help you get it! We’re here to make your experience at <b>Artmusic</b> seamless.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #333',
              backgroundColor: '#1e1e1e',
              color: '#fff',
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
          Email Address
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #333',
              backgroundColor: '#1e1e1e',
              color: '#fff',
            }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '16px' }}>
          Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message here..."
            required
            rows={5}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #333',
              backgroundColor: '#1e1e1e',
              color: '#fff',
              resize: 'none',
            }}
          />
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input type="checkbox" required style={{ transform: 'scale(1.2)' }} />
          <label style={{ fontSize: '14px' }}>
            I hereby agree to the <a href="#" style={{ color: '#6c63ff', textDecoration: 'none' }}>Privacy Policy</a>.
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: '12px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#6c63ff',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Submit Form
        </button>
      </form>
    </section>
  );
};

export default Contact;
