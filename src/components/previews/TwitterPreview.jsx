import { highlightText, extractDomain } from '../../utils/formatters';
import { PLATFORM_LIMITS } from '../../utils/platformLimits';

const TW = PLATFORM_LIMITS.X;

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

export function TwitterPreview({ profile, postText, imageUrl, linkCard }) {
  const displayName = profile.name || 'Your Name';
  const handle = profile.handle ? (profile.handle.startsWith('@') ? profile.handle : `@${profile.handle}`) : '@username';
  const showImage = !!imageUrl;
  const showLinkCard = !showImage && linkCard.url;
  const domain = extractDomain(linkCard.url);

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm text-galactic">X (Twitter) Preview</span>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-[500px]" style={{ fontFamily: TW.fontStack }}>
          <div className="bg-black rounded-xl overflow-hidden border border-[#2f3336]">
            <div className="px-4 pt-3 pb-3">
              {/* Header */}
              <div className="flex gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#2f3336] overflow-hidden shrink-0 flex items-center justify-center">
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  ) : (
                    <svg className="w-5 h-5 text-[#71767b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[#e7e9ea] font-bold text-[15px] truncate">{displayName}</span>
                    <span className="text-[#71767b] text-[15px] truncate">{handle}</span>
                    <span className="text-[#71767b] text-[15px]">·</span>
                    <span className="text-[#71767b] text-[15px]">now</span>
                  </div>

                  {/* Post text */}
                  {postText && (
                    <div className="text-[#e7e9ea] text-[15px] leading-5 whitespace-pre-wrap break-words mt-0.5">
                      <HighlightedText text={postText} linkColor={TW.linkColor} />
                    </div>
                  )}

                  {/* Empty state */}
                  {!postText && !showImage && !showLinkCard && (
                    <div className="mt-2 text-[#71767b] text-[15px]">
                      Start typing in the Post Text field above to see your preview
                    </div>
                  )}

                  {/* Image */}
                  {showImage && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-[#2f3336]">
                      <img src={imageUrl} alt="Post" className="w-full object-cover" style={{ aspectRatio: '16/9' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}

                  {/* Link card */}
                  {showLinkCard && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-[#2f3336]">
                      {linkCard.ogImage && (
                        <div className="aspect-[1.91/1] bg-[#2f3336] overflow-hidden">
                          <img src={linkCard.ogImage} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                        </div>
                      )}
                      <div className="px-3 py-2 bg-black">
                        <div className="text-[#71767b] text-[13px] truncate">{domain}</div>
                        {linkCard.ogTitle && (
                          <div className="text-[#e7e9ea] text-[15px] leading-tight truncate">{linkCard.ogTitle}</div>
                        )}
                        {linkCard.ogDescription && (
                          <div className="text-[#71767b] text-[13px] line-clamp-2 mt-0.5">{linkCard.ogDescription}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Engagement bar */}
                  <div className="flex items-center justify-between mt-3 max-w-[425px] text-[#71767b]">
                    <button type="button" className="flex items-center gap-1 group hover:text-[#1d9bf0] transition-colors p-1.5 -ml-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1d9bf0]">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
                    </button>
                    <button type="button" className="flex items-center gap-1 group hover:text-[#00ba7c] transition-colors p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00ba7c]">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" /></svg>
                    </button>
                    <button type="button" className="flex items-center gap-1 group hover:text-[#f91880] transition-colors p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f91880]">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    </button>
                    <button type="button" className="flex items-center gap-1 group hover:text-[#1d9bf0] transition-colors p-1.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1d9bf0]">
                      <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
