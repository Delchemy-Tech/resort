// Clear cache script - run in browser console
console.log('🧹 Clearing all cache and storage...');

// Clear localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.clear();
  console.log('✅ localStorage cleared');
}

// Clear sessionStorage  
if (typeof sessionStorage !== 'undefined') {
  sessionStorage.clear();
  console.log('✅ sessionStorage cleared');
}

// Clear IndexedDB
if ('indexedDB' in window) {
  indexedDB.databases().then(databases => {
    databases.forEach(db => {
      if (db.name) {
        indexedDB.deleteDatabase(db.name);
        console.log(`✅ IndexedDB ${db.name} cleared`);
      }
    });
  });
}

// Clear Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => {
      registration.unregister();
      console.log('✅ Service Worker cleared');
    });
  });
}

console.log('🔄 Please reload the page after clearing cache');