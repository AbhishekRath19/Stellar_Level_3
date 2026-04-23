import React from 'react';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ id, name, image, description }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="nft-image" />
      <h3>{name}</h3>
      <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '0.5rem' }}>{description}</p>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--primary)' }}>
        Token ID: #{id}
      </div>
    </div>
  );
};

export default NFTCard;
