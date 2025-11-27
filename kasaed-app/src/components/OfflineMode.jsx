import React from 'react';
import { useTranslation } from 'react-i18next';
import { offlineFAQ } from '../data/srhContent';
import './OfflineMode.css';

const OfflineMode = ({ onClose }) => {
  const { t, i18n } = useTranslation();

  // Map the offlineFAQ data to use translation keys
  const faqItems = offlineFAQ.map((item, index) => ({
    ...item,
    id: `faq${index + 1}`,
    question: t(`offline.faqContent.faq${index + 1}.question`),
    answer: t(`offline.faqContent.faq${index + 1}.answer`)
  }));

  return (
    <div className="offline-mode">
      <div className="offline-header">
        <h2>{t('offline.faq')}</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="offline-content">
        <div className="offline-banner">
          {t('offline.banner')}
        </div>
        
        <div className="offline-categories">
          <button className="category-btn active">{t('offline.faq')}</button>
          <button className="category-btn">{t('offline.hotlines')}</button>
          <button className="category-btn">{t('offline.contraception')}</button>
          <button className="category-btn">{t('offline.sti')}</button>
          <button className="category-btn">{t('offline.mentalHealth')}</button>
          <button className="category-btn">{t('offline.consent')}</button>
        </div>
        
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.id} className="faq-item">
              <h3 className="faq-question">{item.question}</h3>
              <p className="faq-answer">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfflineMode;