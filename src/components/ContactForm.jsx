import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = ({ translations, language }) => {
  const t = translations[language];
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(null);

  // NOTE: Auto-save removed for GDPR compliance - no storing PII without explicit consent

  // Sanitize input to prevent email injection attacks
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    // Remove newlines, carriage returns, and other control characters that could be used for injection
    return input.replace(/[\r\n\0]/g, '').trim();
  };

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

    // Rate limiting: 1 submission per 60 seconds
    if (lastSubmissionTime) {
      const timeSinceLastSubmission = Date.now() - lastSubmissionTime;
      const remainingTime = Math.ceil((60000 - timeSinceLastSubmission) / 1000);

      if (timeSinceLastSubmission < 60000) {
        setFormErrors({
          ...formErrors,
          submit: language === 'bg'
            ? `Моля изчакайте ${remainingTime} секунди преди да изпратите отново`
            : `Please wait ${remainingTime} seconds before submitting again`
        });
        return;
      }
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setFormErrors({
        ...formErrors,
        recaptcha: language === 'bg'
          ? 'Моля, потвърдете че не сте робот'
          : 'Please verify that you are not a robot'
      });
      return;
    }

    setFormStatus('sending');

    try {
      // Sanitize all inputs to prevent email injection attacks
      const templateParams = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone) || 'Not specified',
        message: sanitizeInput(formData.message),
        reply_to: sanitizeInput(formData.email),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // NOTE: Message history storage removed for GDPR compliance - no storing customer PII

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setRecaptchaToken(null);
      setLastSubmissionTime(Date.now()); // Record submission time for rate limiting
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }

      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('EmailJS Error:', error);
      }

      // Detailed error messages based on error type
      let errorMessage = '';

      if (error.text) {
        // EmailJS specific errors
        if (error.text.includes('Invalid') || error.status === 400) {
          errorMessage = language === 'bg'
            ? 'Невалидни данни във формата. Моля проверете полетата.'
            : 'Invalid form data. Please check your entries.';
        } else if (error.status === 403 || error.text.includes('forbidden')) {
          errorMessage = language === 'bg'
            ? 'Услугата е временно недостъпна. Опитайте по-късно.'
            : 'Service temporarily unavailable. Try again later.';
        } else if (error.status === 429 || error.text.includes('limit')) {
          errorMessage = language === 'bg'
            ? 'Твърде много опити. Моля изчакайте и опитайте отново.'
            : 'Too many requests. Please wait before trying again.';
        } else {
          errorMessage = language === 'bg'
            ? 'Грешка при изпращане. Моля опитайте отново.'
            : 'Failed to send message. Please try again.';
        }
      } else if (error.message === 'Network request failed' || !navigator.onLine) {
        errorMessage = language === 'bg'
          ? 'Няма интернет връзка. Проверете свързаността си.'
          : 'No internet connection. Check your connectivity.';
      } else {
        errorMessage = language === 'bg'
          ? 'Неочаквана грешка. Моля опитайте отново или се свържете директно.'
          : 'Unexpected error. Please try again or contact us directly.';
      }

      setFormErrors({
        ...formErrors,
        submit: errorMessage
      });
      setFormStatus('');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gradient-to-br from-stone-50 to-neutral-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text text-transparent">
          {t.contact.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
              <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text">
                {t.contact.connectTitle}
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200 hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-300 group">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 p-3 rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <Mail className="text-white" size={24} />
                  </div>
                  <a
                    href="mailto:kitanskitsvetelin@gmail.com"
                    className="text-lg font-medium"
                  >
                    kitanskitsvetelin@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200 group transition-colors duration-300">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 p-3 rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <Phone className="text-white" size={24} />
                  </div>
                  <a href="tel:+359878349453" className="text-lg font-medium">
                    +359 878 34 94 53
                  </a>
                </div>

                <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200 group transition-colors duration-300">
                  <div className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 p-3 rounded-2xl group-hover:scale-110 transition-all duration-300">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <span className="text-lg font-medium">
                    {language === 'bg'
                      ? 'София, България'
                      : 'Sofia, Bulgaria'}
                  </span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-stone-100 dark:border-slate-700 transition-colors duration-300">
                <p className="text-slate-700 dark:text-slate-200 mb-4 font-semibold transition-colors duration-300">
                  {t.contact.followMe}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/tsvetelin-kitanski-07819a183/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-br from-stone-600 to-neutral-700 dark:from-slate-700 dark:to-slate-600 hover:from-stone-700 hover:to-neutral-800 dark:hover:from-slate-600 dark:hover:to-slate-500 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border-2 border-stone-200 dark:border-slate-700 shadow-xl transition-colors duration-300">
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-stone-300 dark:to-neutral-300 bg-clip-text">
              {t.contact.sendTitle}
            </h3>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 transition-colors duration-300"
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
                  className={`w-full px-5 py-4 bg-stone-50/50 dark:bg-slate-700 border-2 ${formErrors.name ? 'border-red-500 dark:border-red-400' : 'border-stone-200 dark:border-slate-600'} rounded-2xl focus:ring-2 focus:ring-stone-500 dark:focus:ring-slate-400 focus:border-stone-500 dark:focus:border-slate-400 outline-none transition-all duration-300 text-slate-800 dark:text-white font-medium`}
                  placeholder={t.contact.namePlaceholder}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 transition-colors duration-300"
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
                  className={`w-full px-5 py-4 bg-stone-50/50 dark:bg-slate-700 border-2 ${formErrors.email ? 'border-red-500 dark:border-red-400' : 'border-stone-200 dark:border-slate-600'} rounded-2xl focus:ring-2 focus:ring-stone-500 dark:focus:ring-slate-400 focus:border-stone-500 dark:focus:border-slate-400 outline-none transition-all duration-300 text-slate-800 dark:text-white font-medium`}
                  placeholder={t.contact.emailPlaceholder}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 transition-colors duration-300"
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
                  className={`w-full px-5 py-4 bg-stone-50/50 dark:bg-slate-700 border-2 ${formErrors.phone ? 'border-red-500 dark:border-red-400' : 'border-stone-200 dark:border-slate-600'} rounded-2xl focus:ring-2 focus:ring-stone-500 dark:focus:ring-slate-400 focus:border-stone-500 dark:focus:border-slate-400 outline-none transition-all duration-300 text-slate-800 dark:text-white font-medium`}
                  placeholder={t.contact.phonePlaceholder}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 transition-colors duration-300"
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
                  className={`w-full px-5 py-4 bg-stone-50/50 dark:bg-slate-700 border-2 ${formErrors.message ? 'border-red-500 dark:border-red-400' : 'border-stone-200 dark:border-slate-600'} rounded-2xl focus:ring-2 focus:ring-stone-500 dark:focus:ring-slate-400 focus:border-stone-500 dark:focus:border-slate-400 outline-none transition-all duration-300 text-slate-800 dark:text-white font-medium resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.message}</p>
                )}
              </div>

              {/* reCAPTCHA with GDPR disclosure */}
              <div className="flex flex-col items-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 text-center max-w-md transition-colors duration-300">
                  {language === 'bg'
                    ? 'Тази форма е защитена от reCAPTCHA. Приложима е '
                    : 'This form is protected by reCAPTCHA. The Google '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 dark:text-stone-300 underline hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300"
                  >
                    {language === 'bg' ? 'Политиката за поверителност' : 'Privacy Policy'}
                  </a>
                  {language === 'bg' ? ' и ' : ' and '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-700 dark:text-stone-300 underline hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300"
                  >
                    {language === 'bg' ? 'Условията за ползване на Google' : 'Terms of Service'}
                  </a>
                  {language === 'bg' ? ' на Google.' : ' apply.'}
                </p>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    setRecaptchaToken(token);
                    if (formErrors.recaptcha) {
                      setFormErrors((prev) => ({ ...prev, recaptcha: '' }));
                    }
                  }}
                  onExpired={() => setRecaptchaToken(null)}
                  theme="light"
                />
                {formErrors.recaptcha && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.recaptcha}</p>
                )}
              </div>

              {formErrors.submit && (
                <div className="bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500 dark:border-orange-600 text-orange-700 dark:text-orange-300 px-6 py-4 rounded-2xl font-semibold text-center transition-colors duration-300">
                  ⏱ {formErrors.submit}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full px-10 py-5 bg-gradient-to-r from-stone-700 to-neutral-700 dark:from-slate-700 dark:to-slate-600 hover:from-stone-800 hover:to-neutral-800 dark:hover:from-slate-600 dark:hover:to-slate-500 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-stone-500/30 dark:shadow-slate-900/50 text-lg"
              >
                {formStatus === 'sending'
                  ? t.contact.sending
                  : `${t.contact.sendButton} →`}
              </button>

              {formStatus === 'success' && (
                <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 text-green-700 dark:text-green-300 px-6 py-4 rounded-2xl font-semibold transition-colors duration-300">
                  ✓ {t.contact.successMessage}
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
