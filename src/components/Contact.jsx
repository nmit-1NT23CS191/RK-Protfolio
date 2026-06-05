import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Quick Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStatus('sending');

    // ── Web3Forms: free email routing, no backend needed ──
    // Get your free access key at https://web3forms.com (enter msravikiran11@gmail.com)
    // Then set VITE_WEB3FORMS_KEY=your_key in a .env file at project root.
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '1b8c8e7a-b9cb-4c94-9c2a-placeholder';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          from_name: 'RK Portfolio',
          botcheck: '',
        }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00E5FF', '#8B5CF6', '#00FF88'],
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Failed to send message. Please email directly at msravikiran11@gmail.com');
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto z-20">
      {/* Title */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-wide uppercase text-white">
          Get In <span className="text-gradient-cyan-violet">Touch</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyber-cyan to-cyber-violet mt-4 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Contact Coordinates */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 flex flex-col justify-between"
        >
          <div className="glass-card p-8 rounded-2xl border border-white/5 h-full flex flex-col justify-between gap-12">
            <div>
              <h3 className="font-display font-bold text-xl text-white mb-6">
                Contact Information
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Feel free to reach out for internship inquiries, project collaborations, or tech discussions. I will get back to you as soon as possible.
              </p>

              {/* Detail Items */}
              <div className="space-y-6">
                <a
                  href="tel:+918073149200"
                  className="flex items-center gap-4 text-gray-300 hover:text-cyber-cyan transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyber-cyan group-hover:scale-105 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Phone</p>
                    <p className="text-sm font-semibold">+91 8073149200</p>
                  </div>
                </a>

                <a
                  href="mailto:msravikiran11@gmail.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-cyber-violet transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyber-violet group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500">Email</p>
                    <p className="text-sm font-semibold">msravikiran11@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-6 border-t border-white/5">
              <h4 className="text-xs uppercase font-bold text-gray-500 mb-4">Connect on Socials</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/nmit-1NT23CS191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyber-cyan hover:border-cyber-cyan/50 hover:bg-cyber-cyan/10 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/ravikiran-m-s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyber-violet hover:border-cyber-violet/50 hover:bg-cyber-violet/10 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7"
        >
          <div className="glass-card p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <h3 className="font-display font-bold text-xl text-white mb-6">
              Send Message
            </h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-cyber-green/10 border border-cyber-green flex items-center justify-center text-cyber-green shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Transmission Successful</h4>
                <p className="text-gray-400 text-sm max-w-sm">
                  Thank you! Your message has been sent. I will respond to your inquiry shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertTriangle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Name <span className="text-cyber-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Email <span className="text-cyber-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Internship opportunity"
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Message <span className="text-cyber-cyan">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Ravikiran, I would like to discuss..."
                    required
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-lg font-medium text-black bg-gradient-to-r from-cyber-cyan to-cyber-green hover:shadow-[0_0_20px_rgba(0,229,255,0.35)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none group"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      Encrypting & Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
