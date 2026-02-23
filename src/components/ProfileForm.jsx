import { useRef } from 'react';

export function ProfileForm({ profile, setProfile }) {
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) return;
    const url = URL.createObjectURL(file);
    setProfile((prev) => {
      if (prev.photoUrl) URL.revokeObjectURL(prev.photoUrl);
      return { ...prev, photoUrl: url };
    });
  };

  const removePhoto = () => {
    if (profile.photoUrl) URL.revokeObjectURL(profile.photoUrl);
    setProfile((prev) => ({ ...prev, photoUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const update = (field) => (e) =>
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Profile Info</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Photo upload */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-16 h-16 rounded-full bg-metal/20 border border-metal/30 flex items-center justify-center overflow-hidden hover:border-azure/50 transition-colors focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss"
            aria-label="Upload profile photo"
          >
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-6 h-6 text-galactic" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
              </svg>
            )}
          </button>
          {profile.photoUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="text-xs text-coral hover:text-coral/80 transition-colors focus:outline-none focus:underline"
            >
              Remove
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            aria-label="Profile photo file input"
          />
        </div>

        {/* Text fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="profile-name" className="block text-xs font-medium text-galactic mb-1">Display Name</label>
            <input
              id="profile-name"
              type="text"
              value={profile.name}
              onChange={update('name')}
              placeholder="Your Name"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <div>
            <label htmlFor="profile-handle" className="block text-xs font-medium text-galactic mb-1">Handle</label>
            <input
              id="profile-handle"
              type="text"
              value={profile.handle}
              onChange={update('handle')}
              placeholder="@username"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="profile-headline" className="block text-xs font-medium text-galactic mb-1">Headline / Bio</label>
            <input
              id="profile-headline"
              type="text"
              value={profile.headline}
              onChange={update('headline')}
              placeholder="Short bio or headline"
              className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
