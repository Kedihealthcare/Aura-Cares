const admin = require('firebase-admin');
const fs = require('fs');

// 1. INITIALIZE FIREBASE
// Service Account Key is in the scripts/ folder
const serviceAccount = require('./scripts/serviceaccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log(`Initialized Firebase Admin for project: ${serviceAccount.project_id}`);

const db = admin.firestore();

// 2. LOAD YOUR DATA
let rawData = fs.readFileSync('./app.json', 'utf8');
// Strip BOM if present
if (rawData.charCodeAt(0) === 0xFEFF) {
  rawData = rawData.slice(1);
}
const data = JSON.parse(rawData);
// Extract FAQs from all products in the catalog
const faqs = [];
if (data.product_catalog && Array.isArray(data.product_catalog)) {
  data.product_catalog.forEach(product => {
    if (product.faqs && Array.isArray(product.faqs)) {
      product.faqs.forEach(faq => {
        faqs.push({
          ...faq,
          productId: product.id,
          productName: product.name
        });
      });
    }
  });
}

/**
 * UPLOADS DATA IN BATCHES 
 * This is the only way to safely add 1,000+ or 1 million records to Firestore
 */
async function uploadFaqs() {
  const collectionRef = db.collection('faqs');
  let batch = db.batch();
  let count = 0;

  console.log(`Starting upload of ${faqs.length} documents...`);

  for (const faq of faqs) {
    // Generate a unique ID or use the one provided
    const docId = faq.id || `faq_${Math.random().toString(36).substr(2, 9)}`;
    const docRef = collectionRef.doc(docId);
    
    batch.set(docRef, {
      ...faq,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      searchQuery: (faq.q || "").toLowerCase() // Optimized for "what can i use for" queries
    });

    count++;

    // Firestore batch limit is 500 operations
    if (count % 500 === 0) {
      await batch.commit();
      console.log(`Committed ${count} documents...`);
      batch = db.batch();
    }
  }

  // Commit the final batch
  if (count % 500 !== 0) {
    await batch.commit();
  }

  console.log(`Successfully uploaded ${count} FAQs to Firestore.`);
}

uploadFaqs().catch(console.error);
