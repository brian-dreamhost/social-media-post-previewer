import { PLATFORM_LIMITS } from '../utils/platformLimits';

export function CharacterCount({ text, platform }) {
  const limit = PLATFORM_LIMITS[platform]?.charLimit || 280;
  const count = text.length;
  const ratio = count / limit;

  let colorClass = 'text-turtle';
  let barColor = 'bg-turtle';
  if (ratio >= 1) {
    colorClass = 'text-coral';
    barColor = 'bg-coral';
  } else if (ratio >= 0.9) {
    colorClass = 'text-tangerine';
    barColor = 'bg-tangerine';
  }

  const widthPercent = Math.min(ratio * 100, 100);

  return (
    <div className="mt-2">
      <div className="h-1 w-full bg-metal/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-200 ${barColor}`}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
      <div className={`text-xs mt-1 text-right font-medium ${colorClass}`}>
        {count} / {limit.toLocaleString()}
      </div>
    </div>
  );
}
