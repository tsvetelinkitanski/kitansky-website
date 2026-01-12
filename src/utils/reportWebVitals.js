/**
 * Web Vitals Reporting
 * Tracks Core Web Vitals metrics and sends them to Google Analytics
 *
 * Metrics tracked:
 * - CLS: Cumulative Layout Shift
 * - FCP: First Contentful Paint
 * - LCP: Largest Contentful Paint
 * - TTFB: Time to First Byte
 * - INP: Interaction to Next Paint (replaces deprecated FID)
 */

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

function sendToGoogleAnalytics({ name, delta, value, id, rating }) {
  // Only send if Google Analytics is loaded
  if (window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
      metric_id: id,
      metric_value: value,
      metric_delta: delta,
      metric_rating: rating,
    });
  }
}

function reportWebVitals() {
  // Track all Core Web Vitals
  onCLS(sendToGoogleAnalytics);
  onFCP(sendToGoogleAnalytics);
  onLCP(sendToGoogleAnalytics);
  onTTFB(sendToGoogleAnalytics);
  onINP(sendToGoogleAnalytics);
}

export default reportWebVitals;
