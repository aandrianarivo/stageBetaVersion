// service-worker.js

self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: '/path/to/icon.png', // Remplacez par le chemin de votre icône
    };
  
    event.waitUntil(
      self.registration.showNotification('Titre de la notification', options)
    );
  });
  