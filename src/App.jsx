import { useState } from 'react';
import { PreviewTabs } from './components/PreviewTabs';
import { ProfileForm } from './components/ProfileForm';
import { PostForm } from './components/PostForm';
import { ImageUpload } from './components/ImageUpload';
import { LinkCardForm } from './components/LinkCardForm';
import { FacebookPreview } from './components/previews/FacebookPreview';
import { TwitterPreview } from './components/previews/TwitterPreview';
import { LinkedInPreview } from './components/previews/LinkedInPreview';
import { InstagramPreview } from './components/previews/InstagramPreview';
import { DUMMY_DATA } from './data/dummyData';

const TABS = ['Facebook', 'X', 'LinkedIn', 'Instagram'];

const INITIAL_PROFILE = {
  name: '',
  handle: '',
  headline: '',
  photoUrl: '',
};

const INITIAL_LINK_CARD = {
  url: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
};

function App() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [postText, setPostText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkCard, setLinkCard] = useState(INITIAL_LINK_CARD);
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const fillTestData = () => {
    setProfile(DUMMY_DATA.profile);
    setPostText(DUMMY_DATA.postText);
    setImageUrl(DUMMY_DATA.imageUrl);
    setLinkCard(DUMMY_DATA.linkCard);
  };

  const previewProps = { profile, postText, imageUrl, linkCard };

  const renderPreview = () => {
    switch (activeTab) {
      case 'Facebook':
        return <FacebookPreview {...previewProps} />;
      case 'X':
        return <TwitterPreview {...previewProps} />;
      case 'LinkedIn':
        return <LinkedInPreview {...previewProps} />;
      case 'Instagram':
        return <InstagramPreview {...previewProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-abyss text-white bg-glow bg-grid">
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 border border-turtle text-turtle text-sm font-medium rounded-full">
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Social Media Post Previewer
            </h1>
            <p className="text-lg text-cloudy max-w-2xl mx-auto leading-relaxed">
              See exactly how your posts will look on Facebook, X, LinkedIn, and Instagram before you hit publish.
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={fillTestData}
              className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
            >
              Fill Test Data
            </button>
          </div>

          {/* Profile Form */}
          <ProfileForm profile={profile} setProfile={setProfile} />

          {/* Post Content */}
          <div className="card-gradient border border-metal/20 rounded-2xl p-6 mt-4">
            <h2 className="text-lg font-semibold text-white mb-4">Post Content</h2>
            <PostForm postText={postText} setPostText={setPostText} activeTab={activeTab} />
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>

          {/* Link Card */}
          <div className="mt-4">
            <LinkCardForm linkCard={linkCard} setLinkCard={setLinkCard} />
          </div>

          {/* Preview Tabs + Preview */}
          <div className="mt-10">
            <PreviewTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
            <div
              className="mt-6"
              role="tabpanel"
              id={`tabpanel-${activeTab.toLowerCase()}`}
              aria-labelledby={`tab-${activeTab.toLowerCase()}`}
            >
              <div key={activeTab} className="animate-fadeIn">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-metal/30 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-galactic">
            <p className="text-center sm:text-left">Free Social Media Post Previewer — Part of the DreamHost Social Media Tools collection</p>
            <div className="flex items-center gap-4">
              <a
                href="https://ogp.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure hover:text-white transition-colors"
              >
                Open Graph Protocol
              </a>
              <a
                href="https://www.dreamhost.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure hover:text-white transition-colors"
              >
                DreamHost
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
