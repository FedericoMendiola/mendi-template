import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

const sampleFormData = {
  businessName: "Ristorante Da Marco",
  category: "Cucina Tipica Romana",
  city: "Roma",
  address: "Via delle Fratte 45, Roma",
  phone: "+39 06 9876543",
  whatsapp: "393400000000",
  email: "info@damarco-roma.it",
  preferredColor: "#b91c1c",
  servicesRaw: "Primi piatti della tradizione romana (carbonara, amatriciana, gricia). Secondi di carne scelta. Dolci della casa fatti ogni giorno.",
  aboutRaw: "Trattoria a conduzione familiare aperta dal 1985 nel cuore di Roma. Ingredienti a km zero e ricette tramandate da tre generazioni.",
  googleReviewsRaw: "Valutazione media 4.8 su 5 con 210 recensioni. Clienti entusiasti per la carbonara e l'atmosfera accogliente."
};

async function generateSiteConfig(formData) {
  const prompt = `
Sei un esperto copywriter e web designer. Trasforma i seguenti dati grezzi forniti da un cliente per la creazione del suo sito web nel formato JSON esattamente strutturato come indicato.

Dati Cliente:
${JSON.stringify(formData, null, 2)}

Restituisci ESCLUSIVAMENTE un oggetto JSON valido, senza blocchi di codice markdown (non includere \`\`\`json) e senza alcun testo prima o dopo.

Struttura JSON richiesta:
{
  "businessName": "string",
  "tagline": "string (breve e d'impatto)",
  "category": "string",
  "city": "string",
  "phone": "string",
  "whatsapp": "string",
  "email": "string",
  "address": "string",
  "colors": {
    "primary": "HEX Color derivato da preferredColor o idoneo al settore",
    "secondary": "HEX Color scuro per testo/sfondi (es. #0f172a)",
    "accent": "HEX Color d'impatto per WhatsApp (es. #16a34a)"
  },
  "hero": {
    "title": "string (Titolo persuasivo orientato alla conversione)",
    "subtitle": "string (Sottotitolo chiaro)",
    "ctaPrimaryText": "Chiama Ora",
    "ctaSecondaryText": "Invia un WhatsApp",
    "backgroundImageUrl": "URL immagine di copertina Unsplash idonea al settore"
  },
  "services": [
    { "title": "string", "description": "string", "icon": "check" },
    { "title": "string", "description": "string", "icon": "check" },
    { "title": "string", "description": "string", "icon": "check" }
  ],
  "about": {
    "title": "string",
    "description": "string",
    "imageUrl": "URL immagine Unsplash idonea al settore",
    "points": ["string", "string", "string"]
  },
  "testimonials": [
    { "author": "Cliente Google", "comment": "string", "rating": 5 },
    { "author": "Cliente Google", "comment": "string", "rating": 5 }
  ],
  "googleRating": {
    "score": 4.8,
    "reviewsCount": 210
  }
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const jsonContent = response.choices[0].message.content.trim();
    const parsedData = JSON.parse(jsonContent);

    const outputPath = path.resolve("./src/data/site-data.json");
    fs.writeFileSync(outputPath, JSON.stringify(parsedData, null, 2), "utf-8");
    console.log("✅ File src/data/site-data.json generato con successo a costo ZERO!");
  } catch (error) {
    console.error("❌ Errore durante la generazione del JSON:", error);
  }
}

generateSiteConfig(sampleFormData);