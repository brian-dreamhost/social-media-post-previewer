import { CharacterCount } from './CharacterCount';

export function PostForm({ postText, setPostText, activeTab }) {
  return (
    <div>
      <label htmlFor="post-text" className="block text-xs font-medium text-galactic mb-1">Post Text</label>
      <textarea
        id="post-text"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="What's on your mind? Type your post here..."
        rows={5}
        className="w-full bg-oblivion border border-metal/30 rounded-lg px-3 py-2 text-sm text-white placeholder-galactic resize-y focus:outline-none focus:ring-2 focus:ring-azure focus:border-azure transition-colors"
      />
      <CharacterCount text={postText} platform={activeTab} />
    </div>
  );
}
