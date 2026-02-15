'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faChevronDown, faDownload, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface Document {
  name: string;
  size: string;
  date: string;
}

interface Category {
  title: string;
  icon: IconDefinition;
  documents: Document[];
}

interface DocumentAccordionProps {
  categories: Category[];
}

export default function DocumentAccordion({ categories }: DocumentAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="accordion">
      {categories.map((category, index) => (
        <div key={index} className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
          <div className="accordion-header" onClick={() => toggleAccordion(index)}>
            <span>
              <FontAwesomeIcon icon={category.icon} style={{ marginRight: '10px', color: 'var(--primary-color)' }} />
              {category.title}
            </span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          <div className="accordion-content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
            <div className="documents-list">
              {category.documents.map((doc, docIndex) => (
                <div key={docIndex} className="document-item">
                  <div className="document-icon">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </div>
                  <div className="document-info">
                    <div className="document-name">{doc.name}</div>
                    <div className="document-meta">PDF • {doc.size} • Обновлено: {doc.date}</div>
                  </div>
                  <a href="#" className="document-download">
                    <FontAwesomeIcon icon={faDownload} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
