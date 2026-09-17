import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', brand: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    // ⚠️ IMPORTANT: Replace this key with your actual Web3Forms access key
    formData.append("access_key", "4dcd03a5-2036-468b-9521-94095f1b5e8b"); 
    formData.append("subject", "New Contact from thenightera Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setSent(true);
      } else {
        alert("Kuch error aaya hai email bhejne me. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.875rem 1rem',
    border: '1px solid var(--border)', borderRadius: '12px',
    background: '#f5f5f7', fontSize: '0.9375rem', color: 'var(--ink)',
    fontFamily: 'Outfit, sans-serif', outline: 'none',
    transition: 'border-color 0.2s',
  };

  const InstagramIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );

  const contactCards = [
    { icon: <Mail size={32} color="#0066cc" strokeWidth={1.5} />, label: "Email Us", href: "https://mail.google.com/mail/?view=cm&fs=1&to=officialnightera@gmail.com" },
    { icon: <MessageCircle size={32} color="#0066cc" strokeWidth={1.5} />, label: "WhatsApp", href: "https://wa.me/918251000525" },
    { icon: <InstagramIcon />, label: "Instagram", href: "https://instagram.com/thenightera" }
  ];

  return (
    <div style={{ minHeight: 'calc(100dvh - 60px)', background: '#f5f5f7' }}>
      <SEOHead
        title="Contact thenightera — Marketing Agency in Indore, MP"
        description="Get in touch with thenightera — the best marketing agency in Indore. Book a free 30-minute consultation. Email, WhatsApp, or fill our form. We respond within 24 hours."
        path="/contact"
        keywords="contact marketing agency indore, book marketing consultation indore, marketing company phone indore, best marketing agency contact"
      />
      {/* Header */}
      <div style={{ padding: '5rem 0 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2.5rem' }}>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2.5rem,5vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: '#1d1d1f' }}>
            Contact our team.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#86868b', marginTop: '1.5rem', lineHeight: 1.6 }}>
            Ready to build something real? Choose how you want to connect, or drop us a message below and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 2.5rem 6rem' }}>
        
        {/* Apple Style Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {contactCards.map((card, idx) => (
            <motion.a 
              key={idx}
              href={card.href}
              target="_blank"
              rel="noreferrer"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                padding: '2.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                border: '1px solid #E5E5EA'
              }}
            >
              {card.icon}
              <span style={{ color: '#0066cc', fontSize: '0.95rem', fontWeight: 500 }}>
                {card.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Bottom — Form */}
        <div style={{ background: '#ffffff', padding: '3rem', borderRadius: '24px', border: '1px solid #E5E5EA', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1d1d1f', marginBottom: '2rem', textAlign: 'center' }}>Send us a message</h2>
          {sent ? (
            <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11l5 5L18 6" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Message sent!</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>We will be back within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '0.5rem' }}>Name</label>
                  <input name="name" required value={form.name} onChange={handle} placeholder="Your name" style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handle} placeholder="you@brand.com" style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '0.5rem' }}>Brand / Company</label>
                <input name="brand" value={form.brand} onChange={handle} placeholder="Your brand name" style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 500, color: '#1d1d1f', display: 'block', marginBottom: '0.5rem' }}>What do you need?</label>
                <textarea name="message" required value={form.message} onChange={handle} placeholder="Tell us about your goals..." rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px', background: '#f5f5f7' }}
                  onFocus={(e) => e.target.style.borderColor = '#1d1d1f'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <button type="submit" disabled={loading} style={{
                alignSelf: 'center',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem',
                background: loading ? '#86868b' : '#1d1d1f', color: 'white',
                fontWeight: 600, fontSize: '0.95rem',
                padding: '1rem 2.5rem', borderRadius: '999px',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Outfit, sans-serif',
                transition: 'background 0.2s',
                marginTop: '1rem',
                width: '100%',
                maxWidth: '300px'
              }}
                onMouseEnter={(e) => { if(!loading) e.currentTarget.style.background = '#333' }}
                onMouseLeave={(e) => { if(!loading) e.currentTarget.style.background = '#1d1d1f' }}
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
