import React from 'react';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const NFTCard: React.FC<NFTCardProps & { _id?: string }> = ({ id, _id, name, image, description }) => {
  const displayId = id || _id || "Unknown";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"; // Premium abstract fallback
  };

  return (
    <div className="card">
      <img 
        src={image} 
        alt={name} 
        className="nft-image" 
        onError={handleImageError}
      />
      <h3>{name}</h3>
      <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '0.5rem' }}>{description}</p>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--primary)' }}>
        Token ID: <span style={{ fontFamily: 'monospace' }}>{displayId.slice(-8)}</span>
      </div>
    </div>
  );
};

export default NFTCard;
