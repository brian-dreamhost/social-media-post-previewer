import { useState } from 'react';
import { truncateWithEllipsis, highlightText } from '../../utils/formatters';
import { PLATFORM_LIMITS } from '../../utils/platformLimits';

const IG = PLATFORM_LIMITS.Instagram;

function HighlightedText({ text, linkColor }) {
  const segments = highlightText(text, linkColor);
  return segments.map((seg) =>
    seg.color ? (
      <span key={seg.key} style={{ color: seg.color }}>{seg.text}</span>
    ) : (
      <span key={seg.key}>{seg.text}</span>
    )
  );
}

export function InstagramPreview({ profile, postText, imageUrl }) {
  const [expanded, setExpanded] = useState(false);

  const handle = profile.handle?.replace('@', '') || 'username';

  const shouldTruncate = postText.length > IG.truncateAt && !expanded;
  const displayText = shouldTruncate
    ? truncateWithEllipsis(postText, IG.truncateAt, '')
    : postText;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
        <span className="text-sm text-galactic">Instagram Preview</span>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-[468px]" style={{ fontFamily: IG.fontStack }}>
          <div className="bg-black overflow-hidden border border-[#262626] rounded-sm">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                {profile.photoUrl ? (
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-black">
                    <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                ) : (
                  <div className="w-[30px] h-[30px] rounded-full bg-[#262626] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#a8a8a8]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-white font-semibold text-sm">{handle}</span>
              <svg className="w-4 h-4 text-white ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>

            {/* Image area — 1:1 square */}
            <div className="w-full aspect-square bg-[#262626] flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Post" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#a8a8a8]">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" strokeWidth="0.75" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <span className="text-sm">Upload an image for Instagram preview</span>
                </div>
              )}
            </div>

            {/* Action icons */}
            <div className="flex items-center justify-between px-3 py-2" aria-hidden="true">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
              </div>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
            </div>

            {/* Caption */}
            {postText && (
              <div className="px-3 pb-3 text-white text-sm leading-[18px]">
                <span className="font-semibold mr-1">{handle}</span>
                <HighlightedText text={displayText} linkColor={IG.linkColor} />
                {shouldTruncate && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-[#a8a8a8] ml-0.5 hover:text-white focus:outline-none focus:underline transition-colors"
                  >
                    ... more
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
