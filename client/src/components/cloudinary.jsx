// components/ImageUploader.jsx
import React, { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'singhblogs'); // your preset name
    data.append('cloud_name', 'dhs1a0enk');

    setLoading(true);

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dhs1a0enk/image/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      setImageUrl(json.secure_url);
      onUpload(json.secure_url); // pass URL to parent
    } catch (err) {
      console.error('Upload failed:', err);
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="uploaded" style={{ maxWidth: '200px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
}
