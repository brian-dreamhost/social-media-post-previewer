import { useRef, useState } from 'react';

export function ImageUpload({ imageUrl, setImageUrl }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="mt-4">
      <label className="block text-xs font-medium text-galactic mb-1">Image</label>
      {imageUrl ? (
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Post preview"
            className="w-full max-h-64 object-cover rounded-lg border border-metal/30"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-abyss/80 text-coral border border-metal/30 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-azure"
            aria-label="Remove image"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full border-2 border-dashed rounded-lg px-4 py-8 flex flex-col items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss ${
            isDragging
              ? 'border-azure bg-azure/10'
              : 'border-metal/30 hover:border-azure/50 bg-oblivion/50'
          }`}
        >
          <svg className="w-8 h-8 text-galactic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
          </svg>
          <span className="text-sm text-galactic">
            {isDragging ? 'Drop image here' : 'Click or drag an image to upload'}
          </span>
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="hidden"
        aria-label="Post image file input"
      />
    </div>
  );
}
