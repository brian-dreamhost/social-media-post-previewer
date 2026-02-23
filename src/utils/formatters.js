/**
 * Truncate text and append ellipsis suffix.
 */
export function truncateWithEllipsis(text, maxLength, suffix = '...') {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + suffix;
}

/**
 * Extract domain from a URL string.
 */
export function extractDomain(url) {
  if (!url) return '';
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

/**
 * Ensure a handle string starts with @.
 */
export function ensureAtPrefix(handle) {
  if (!handle) return '';
  return handle.startsWith('@') ? handle : `@${handle}`;
}

/**
 * Parse text into segments of plain text, hashtags, and mentions.
 * Returns an array of { type: 'text' | 'hashtag' | 'mention', value: string }.
 */
export function parseTextSegments(text) {
  if (!text) return [];
  const regex = /([@#][\w]+)/g;
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }
    const value = match[1];
    const type = value.startsWith('#') ? 'hashtag' : 'mention';
    segments.push({ type, value });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return segments;
}

/**
 * Render text with highlighted hashtags and mentions.
 * Returns an array of React elements (spans).
 */
export function highlightText(text, linkColor) {
  const segments = parseTextSegments(text);
  return segments.map((seg, i) => {
    if (seg.type === 'hashtag' || seg.type === 'mention') {
      return { key: i, text: seg.value, color: linkColor, bold: false };
    }
    return { key: i, text: seg.value, color: null, bold: false };
  });
}
