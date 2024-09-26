import React, { useState } from 'react';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from './LzL-25-de-1.jpg';
import image2 from './LzL-25-de-2.jpg';
import image3 from './LzL-25-de-3.jpg';
import image4 from './LzL-25-de-4.jpg';


  const images = [image1, image2, image3, image4]; // Array mit Bildern

const App = () => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Zustand für das Modal
  const [modalImage, setModalImage] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const [formData, setFormData] = useState({
    anrede: '',
    vorname: '',
    nachname: '',
    strasse: '',
    strassennr: '',
    plz: '',
    ort: '',
    email: '',
  });

  const faqs = [
    {
      question: "Wer steckt hinter diesem Projekt?",
      answer: "Dieses Projekt wird von Alex, einem gläubigen Christen aus Winterthur, ins Leben gerufen. Es ist keine Organisation oder Kirche beteiligt – einfach eine persönliche Initiative."
    },
    {
      question: "Gibt es versteckte Kosten?",
      answer: "Keine Sorge, es gibt absolut keine versteckten Kosten. Der Kalender ist völlig kostenlos."
    },
    {
      question: "Wie lange dauert der Versand?",
      answer: "Da der Versand kostenlos ist, kann es zwischen 2 Tagen und einer Woche dauern, bis der Kalender bei dir ankommt."
    },
    {
      question: "Kann ich jemanden kontaktieren?",  
      answer: "Ja, sehr gerne! Du kannst uns jederzeit über die E-Mail glaubenskalender@gmail.com erreichen."
    }
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }
    
    // Formspree API Endpoint
    const response = await fetch('https://formspree.io/f/mgvwgwyz', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsOrdered(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hey, schön dass du da bist!</h1>
      </header>

      {isOrdered ? (
        <div className="success-message">
          <p>Danke für deine Bestellung! Der Kalender wird bald zu dir geschickt.</p>
        </div>
      ) : (
        <div className="order-form">
  <h2>
    Jetzt kostenlos einen <span className="highlighted-text" onClick={() => window.scrollTo({ top: document.getElementById('info').offsetTop, behavior: 'smooth' })}>Licht zum Leben</span> Kalender 2025 bestellen
  </h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Anrede</label>
      <select name="anrede" value={formData.anrede} onChange={handleChange} required>
        <option value="">Bitte wählen</option>
        <option value="Herr">Herr</option>
        <option value="Frau">Frau</option>
      </select>
    </div>

    <div className="form-group">
      <label>Vorname</label>
      <input type="text" name="vorname" value={formData.vorname} onChange={handleChange} required />
    </div>

    <div className="form-group">
      <label>Nachname</label>
      <input type="text" name="nachname" value={formData.nachname} onChange={handleChange} required />
    </div>

    <div className="form-group">

    <div className="address-group-2">
      <div className="address-field-str1">
        <label>Straße</label>
        <input type="text" name="strasse" value={formData.strasse} onChange={handleChange} required />
      </div>
      <div className="address-field-nr">
        <label>Nr.</label>
        <input type="text" name="strassennr" value={formData.strassennr} onChange={handleChange} required />
      </div>
    </div>
    </div>

    <div className="address-plz-group">
      <div className="address-plz-field">
        <label>PLZ</label>
        <input
    type="number"
    name="plz"
    value={formData.plz}
    onChange={handleChange}
    required
    min="0" // Optional: stellt sicher, dass nur positive Zahlen eingegeben werden können
  />  
      </div>
      <div className="address-ort-field">
        <label>Ort</label>
        <input type="text" name="ort" value={formData.ort} onChange={handleChange} required />
      </div>
    </div>

    <div className="form-group">
      <label>E-Mail (optional)</label>
      <input type="email"  name="email" value={formData.email} onChange={handleChange} required />
    </div>

    <button className="order-button" type="submit">Kostenlos Bestellen</button>
  </form>
</div>

      )}

<div id="info" className="description-box">
        <h3>Zum "Licht zum Leben"-Kalender 2025</h3>
        <p>
          Monatlicher Denkanstoss aus der Bibel. Dieser Monatskalender enthält jeden Monat neben dem erstklassigen Bild einen Bibelvers verbunden mit einer kurzen evangelistischen oder ermunternden Botschaft. Dazu kommt eine praktische Terminspalte, in die alles wichtige eingetragen werden kann (Geburtstag, Zahnarztbesuch usw.).
        </p>

        {/* Slider für die Bilder */}
        <div className="slider-container">
          <button className="slider-button" onClick={prevImage}>
            &#10094; {/* Pfeil nach links */}
          </button>
          <div className="slider-image-container">
            <img
              src={images[currentIndex]}
              alt={`Kalender Bild ${currentIndex + 1}`}
              className="slider-image"
              onClick={() => openModal(images[currentIndex])} // Bild anklickbar
            />
          </div>
          <button className="slider-button" onClick={nextImage}>
            &#10095; {/* Pfeil nach rechts */}
          </button>
        </div>
        <p className="slider-instructions">Klicke auf die Bilder für Detailansicht</p>

        {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Vergrößert" />
        </div>
      )}
      </div>

      <div className="faq-box">
      <h2>Häufig gestellte Fragen</h2>
      <div className="faq-container">
  {faqs.map((faq, index) => (
    <div key={index} className="faq-item">
      <h4 className="faq-question">{faq.question}</h4>
      <p className="faq-answer">{faq.answer}</p>
    </div>
  ))}
</div>
    </div>
      
    </div>
  );
};

export default App;
