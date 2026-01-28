'use client';

import { Button } from '@once-ui-system/core';
import { cv } from '@/resources';
import styles from '@/components/about/about.module.scss';

export default function CV() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cv.filePath;
    link.download = 'cv-oscar-garcia.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Mon CV</h1>
        <Button onClick={handleDownload} variant="primary">
          Télécharger
        </Button>
      </div>
      
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <embed
          src={cv.filePath}
          type="application/pdf"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0.5rem',
          }}
          title="CV PDF Viewer"
        />
      </div>
    </div>
  );
}
