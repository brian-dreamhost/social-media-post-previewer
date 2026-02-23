import { useState } from 'react';
import { truncateWithEllipsis, extractDomain, highlightText } from '../../utils/formatters';
import { PLATFORM_LIMITS } from '../../utils/platformLimits';

const LI = PLATFORM_LIMITS.LinkedIn;

function HighlightedText({ text, linkColor }) {
  const segments = highlightText(text, linkColor);
  return segments.map((seg) =>
    seg.color ? (
      <span key={seg.key} style={{ color: seg.color, fontWeight: 600 }}>{seg.text}</span>
    ) : (
      <span key={seg.key}>{seg.text}</span>
    )
  );
}

export function LinkedInPreview({ profile, postText, imageUrl, linkCard }) {
  const [expanded, setExpanded] = useState(false);

  const displayName = profile.name || 'Your Name';
  const headline = profile.headline || 'Your headline';
  const showImage = !!imageUrl;
  const showLinkCard = !showImage && linkCard.url;
  const domain = extractDomain(linkCard.url);

  const shouldTruncate = postText.length > LI.truncateAt && !expanded;
  const displayText = shouldTruncate
    ? truncateWithEllipsis(postText, LI.truncateAt, '')
    : postText;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        <span className="text-sm text-galactic">LinkedIn Preview</span>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-[500px]" style={{ fontFamily: LI.fontStack }}>
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Post header */}
            <div className="flex items-start gap-2 px-4 pt-3 pb-2">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                {profile.photoUrl ? (
                  <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[#000000E6] font-semibold text-sm leading-tight">{displayName}</div>
                <div className="text-[#00000099] text-xs leading-tight mt-0.5 line-clamp-1">{headline}</div>
                <div className="text-[#00000099] text-xs mt-0.5">now · <svg className="inline w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm4.6 7.4-1.5 1.5-2.1-.8-1 2.4H6l-1-2.4-2.1.8L1.4 7.4l2.1-.8L2.5 4.5H4.5l1 2.4 2.1-.8 1.5 1.5L7 9.2l1 2.4h2l1-2.4z" /></svg></div>
              </div>
            </div>

            {/* Post text */}
            {postText && (
              <div className="px-4 pb-2 text-[#000000E6] text-sm leading-[20px] whitespace-pre-wrap break-words">
                <HighlightedText text={displayText} linkColor={LI.linkColor} />
                {shouldTruncate && (
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-[#00000099] hover:text-[#0A66C2] hover:underline ml-0.5 font-normal focus:outline-none focus:underline"
                  >
                    ...see more
                  </button>
                )}
              </div>
            )}

            {/* Empty state */}
            {!postText && !showImage && !showLinkCard && (
              <div className="px-4 py-6 text-center text-gray-400 text-sm">
                Start typing in the Post Text field above to see your preview
              </div>
            )}

            {/* Image — edge to edge */}
            {showImage && (
              <div className="w-full">
                <img src={imageUrl} alt="Post" className="w-full object-cover" style={{ maxHeight: 500 }} onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}

            {/* Link card */}
            {showLinkCard && (
              <div className="border-t border-gray-200">
                {linkCard.ogImage && (
                  <div className="w-full aspect-[1.91/1] bg-gray-100 overflow-hidden">
                    <img src={linkCard.ogImage} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
                <div className="px-3 py-2 bg-[#f3f2ef]">
                  {linkCard.ogTitle && (
                    <div className="text-[#000000E6] font-semibold text-sm leading-tight line-clamp-2">{linkCard.ogTitle}</div>
                  )}
                  <div className="text-[#00000099] text-xs mt-0.5">{domain}</div>
                </div>
              </div>
            )}

            {/* Engagement bar */}
            <div className="px-4 py-1 border-t border-gray-200 flex items-center justify-around text-[#00000099] text-xs font-semibold">
              <button type="button" className="flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded px-2 sm:px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" /></svg>
                <span>Like</span>
              </button>
              <button type="button" className="flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded px-2 sm:px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>
                <span>Comment</span>
              </button>
              <button type="button" className="flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded px-2 sm:px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186Z" /></svg>
                <span>Repost</span>
              </button>
              <button type="button" className="flex flex-col items-center gap-0.5 hover:bg-gray-100 rounded px-2 sm:px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
