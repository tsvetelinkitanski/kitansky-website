import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm = ({ translations, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateEmail = (email) => {
    const parts = email.split('@');
    if (parts.length !== 2) return false;

    const [username, domain] = parts;

    if (!/[a-zA-Z]/.test(username)) return false;

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = language === 'bg' ? 'Моля въведете име' : 'Please enter your name';
    } else if (!/[a-zA-Zа-яА-Я]/.test(formData.name)) {
      errors.name = language === 'bg' ? 'Името трябва да съдържа поне една буква' : 'Name must contain at least one letter';
    }

    if (!formData.email.trim()) {
      errors.email = language === 'bg' ? 'Моля въведете email' : 'Please enter your email';
    } else if (!validateEmail(formData.email)) {
      errors.email = language === 'bg' ? 'Невалиден email адрес' : 'Invalid email address';
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
      const digitsOnly = formData.phone.replace(/\D/g, '');

      if (digitsOnly.length < 5) {
        errors.phone = language === 'bg' ? 'Телефонният номер трябва да съдържа поне 5 цифри' : 'Phone number must contain at least 5 digits';
      } else if (digitsOnly.length > 15) {
        errors.phone = language === 'bg' ? 'Телефонният номер е твърде дълъг' : 'Phone number is too long';
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = language === 'bg' ? 'Невалиден формат на телефонен номер' : 'Invalid phone number format';
      }
    }

    if (!formData.message.trim()) {
      errors.message = language === 'bg' ? 'Моля въведете съобщение' : 'Please enter a message';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const sanitizedValue = value.replace(/[^0-9+\s\-()]/g, '');
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus('sending');

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not specified',
        message: formData.message,
        reply_to: formData.email,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-50"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text text-transparent">
          {t.contact.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white p-10 rounded-3xl border-2 border-stone-200 shadow-xl">
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text">
                {t.contact.connectTitle}
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-700 hover:text-stone-700 transition-colors group">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Mail className="text-white" size={24} />
                  </div>
                  <a
                    href="mailto:kitanskitsvetelin@gmail.com"
                    className="text-lg font-medium"
                  >
                    kitanskitsvetelin@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4 text-slate-700 group">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={24} />
                  </div>
                  <a href="tel:+359878349453" className="text-lg font-medium">
                    +359 878 34 94 53
                  </a>
                </div>

                <div className="flex items-center gap-4 text-slate-700 group">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <span className="text-lg font-medium">
                    {language === 'bg'
                      ? 'София, България'
                      : 'Sofia, Bulgaria'}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-stone-100">
                <p className="text-slate-700 mb-4 font-semibold">
                  {t.contact.followMe}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/tsvetelin-kitanski-07819a183/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-stone-600 to-neutral-700 hover:from-stone-700 hover:to-neutral-800 p-4 rounded-2xl transition-all transform hover:scale-110 shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-3xl border-2 border-stone-200 shadow-xl">
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 bg-clip-text">
              {t.contact.sendTitle}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  {t.contact.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-label={t.contact.name}
                  aria-required="true"
                  className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.name ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                  placeholder={t.contact.namePlaceholder}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  {t.contact.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  aria-label={t.contact.email}
                  aria-required="true"
                  className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.email ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                  placeholder={t.contact.emailPlaceholder}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  {t.contact.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  inputMode="numeric"
                  aria-label={t.contact.phone}
                  className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.phone ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium`}
                  placeholder={t.contact.phonePlaceholder}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  {t.contact.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  aria-label={t.contact.message}
                  aria-required="true"
                  className={`w-full px-5 py-4 bg-stone-50/50 border-2 ${formErrors.message ? 'border-red-500' : 'border-stone-200'} rounded-2xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 outline-none transition-all text-slate-800 font-medium resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 hover:from-stone-800 hover:to-neutral-800 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-stone-500/30 text-lg"
              >
                {formStatus === 'sending'
                  ? t.contact.sending
                  : `${t.contact.sendButton} →`}
              </button>

              {formStatus === 'success' && (
                <div className="bg-green-100 border-2 border-green-500 text-green-700 px-6 py-4 rounded-2xl font-semibold">
                  ✓ {t.contact.successMessage}
                </div>
              )}

              {formStatus === 'error' && (
                <div className="bg-red-100 border-2 border-red-500 text-red-700 px-6 py-4 rounded-2xl font-semibold">
                  ✗ {t.contact.errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
