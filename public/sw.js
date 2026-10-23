// The Monetag push-notification worker used to live here. Monetag was removed
// on 2026-10-24, so this replacement unregisters itself: browsers that
// installed the old worker fetch this file on their next visit, and it removes
// the push subscription and itself instead of delivering Monetag notifications.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.pushManager.getSubscription()
      .then((sub) => sub && sub.unsubscribe())
      .catch(() => {})
      .then(() => self.registration.unregister()),
  );
});
