'use client'
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { firmInfo } from '@/lib/firmInfo';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Kontakt - Advokatska kancelarija Sarajevo | Andrić Law';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Kontaktirajte advokatsku kancelariju Andrić Law u Sarajevu. Telefon, email, WhatsApp. Odgovaramo u roku od 24 sata. Besplatna inicijalna konsultacija.');
    }
  }, []);

  const phoneHref = `tel:${firmInfo.phone.replace(/[^0-9+]/g, '')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white drop-shadow-lg animate-hero">Kontaktirajte nas</h1>
          <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed animate-hero animation-delay-200">
            Rado ćemo odgovoriti na sva vaša pitanja i pomoći vam u rješavanju pravnih izazova
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-hero">
              <h2 className="text-3xl font-bold text-brand-900 mb-8">Kontakt informacije</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cta-600 p-3 rounded-lg shadow-soft">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-brand-900">Telefon</h3>
                    <a href={phoneHref} className="text-ink-900 hover:text-link-600 transition">
                      {firmInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cta-600 p-3 rounded-lg shadow-soft">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-brand-900">Email</h3>
                    <a href={`mailto:${firmInfo.email}`} className="text-ink-900 hover:text-link-600 transition">
                      {firmInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cta-600 p-3 rounded-lg shadow-soft">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-brand-900">Adresa</h3>
                    <p className="text-ink-900">{firmInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-cta-600 p-3 rounded-lg shadow-soft">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 text-brand-900">Radno vrijeme</h3>
                    <p className="text-ink-900">Ponedjeljak - Petak: 09:00 - 17:00</p>
                    <p className="text-ink-900">Subota: Po dogovoru</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 card p-6 bg-green-50 border-2 border-green-200 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-bold text-lg mb-2 text-green-800">WhatsApp</h3>
                <p className="text-ink-900 mb-4">Kontaktirajte nas brzo i jednostavno putem WhatsApp-a</p>
                <a
                  href={`https://wa.me/${firmInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition min-h-[48px] flex items-center justify-center"
                >
                  Pošalji WhatsApp poruku
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card p-8 animate-hero animation-delay-200">
              <h2 className="text-3xl font-bold text-brand-900 mb-8">Pošaljite nam poruku</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                  Hvala! Vaša poruka je uspješno poslana. Kontaktiraćemo vas uskoro.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-ink-900 font-semibold mb-2">
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-line-200 rounded-lg focus:ring-2 focus:ring-cta-600 focus:border-cta-600 transition text-ink-900"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-ink-900 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-line-200 rounded-lg focus:ring-2 focus:ring-cta-600 focus:border-cta-600 transition text-ink-900"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-ink-900 font-semibold mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-line-200 rounded-lg focus:ring-2 focus:ring-cta-600 focus:border-cta-600 transition text-ink-900"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-ink-900 font-semibold mb-2">
                    Poruka *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-line-200 rounded-lg focus:ring-2 focus:ring-cta-600 focus:border-cta-600 transition text-ink-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary min-h-[56px]"
                >
                  Pošalji poruku
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
