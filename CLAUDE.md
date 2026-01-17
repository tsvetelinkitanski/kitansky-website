# Kitansky Website - История на проекта

## Обща информация
- **Проект**: Уебсайт за строителен мениджмънт - Kitansky
- **URL**: https://kitansky.com
- **Технологии**: React 19, Vite, Tailwind CSS, Vercel
- **Езици**: Български (основен), Английски

## Последни промени (17.01.2026)

### Поправки на UI/текст
- **TrustStats кутийки**: Добавен `overflow-hidden`, `line-clamp-2` за текста да остава в кутийките
- **Текстови корекции**:
  - "Готови да започнем" → "Готови ли сте да започнем" (WhyKitanski.jsx)
  - "Готови да стартираме" → "Готови ли сте да стартираме" (HowWeWork.jsx)

### Поправки на бъгове
- **App.jsx:261**: querySelector логика - добавено `!== null`
- **React keys anti-pattern** - поправено във всички компоненти:
  - Services.jsx → `key={service.id}`
  - TrustStats.jsx → `key={stat.id}`
  - WhyKitanski.jsx → `key={reason.id}`
  - HowWeWork.jsx → `key={step.number}`
  - CostlyMistakes.jsx → `key={mistake.id}`
  - Testimonials.jsx → `key={testimonial.name}`
  - Projects.jsx media → `key={media.src}`

## История на комитите

### ebe7205 - Fix UI issues
- Премахнат дублиран телефонен номер от Hero
- Поправен text overflow в TrustStats

### 8ffabd8 - Fix conversion optimization issues
- Поправки по оптимизация за конверсии

### 602dc30 - Add conversion-optimized sections
- Добавени секции за по-добро генериране на leads

### f2436df - Add Google Analytics event tracking
- GA event tracking за конверсии

### a1d590a - Fix critical issues
- Memory leaks поправени
- Dark mode flash поправен
- React anti-patterns поправени

### 70241aa - Add comprehensive dark mode
- Пълен dark mode за всички компоненти

### ca4241c - Security & Accessibility
- Security headers
- GDPR withdraw consent
- Accessibility подобрения
- Web Vitals tracking

### 3866744 - SEO improvements
- Подобрени keywords и meta tags

### e0f9932 - Testimonials section
- Добавена секция с препоръки

### b1938d5 - reCAPTCHA
- Spam protection за контактната форма

## Структура на проекта

```
src/
├── components/
│   ├── Hero.jsx          - Главен банер
│   ├── TrustStats.jsx    - Статистики (опит, проекти, м²)
│   ├── Services.jsx      - Услуги
│   ├── Projects.jsx      - Портфолио с галерия
│   ├── WhyKitanski.jsx   - Защо да изберете нас
│   ├── HowWeWork.jsx     - Как работим (5 стъпки)
│   ├── CostlyMistakes.jsx - Скъпи грешки
│   ├── Testimonials.jsx  - Препоръки
│   ├── ContactForm.jsx   - Контактна форма
│   ├── CookieConsent.jsx - GDPR cookies
│   └── ErrorBoundary.jsx - Error handling
├── constants/
│   └── translations.js   - BG/EN преводи
└── App.jsx               - Главен компонент
```

## Известни проблеми (за бъдещо внимание)

1. **og-image.jpg** - липсва файл за social sharing
2. **Cookie consent reload** - прави page reload при промяна (лош UX)
3. **hreflang tags** - използва URL параметър вместо отделни URLs

## Деплоймънт

```bash
npm run build && vercel --prod
```

## Бележки

- Сайтът е responsive - работи на телефон и компютър
- Има lazy loading за компонентите
- EmailJS за контактната форма
- reCAPTCHA за spam protection
