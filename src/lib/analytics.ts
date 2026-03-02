/**
 * Analytics utility for tracking custom events.
 * Uses Umami's event tracking API.
 * Gracefully degrades if analytics is not loaded.
 */

interface UmamiWindow extends Window {
  umami?: {
    track: (
      eventName: string,
      eventData?: Record<string, string | number>
    ) => void;
  };
}

/**
 * Track a custom event via Umami.
 * @param eventName - Name of the event (e.g., 'blog_post_read', 'external_link_click')
 * @param eventData - Optional data payload
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, string | number>
): void {
  const win = typeof window !== 'undefined' ? (window as UmamiWindow) : null;
  if (win?.umami) {
    win.umami.track(eventName, eventData);
  }
}
