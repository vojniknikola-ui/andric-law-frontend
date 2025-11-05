import React from 'react';

interface StructuredDataProps {
  data: unknown;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
