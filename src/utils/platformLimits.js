export const PLATFORM_LIMITS = {
  Facebook: {
    charLimit: 63206,
    truncateAt: 480,
    linkColor: '#0064D1',
    imageAspect: '1.91 / 1',
    fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  X: {
    charLimit: 280,
    truncateAt: null, // hard limit, no "see more"
    linkColor: '#1d9bf0',
    imageAspect: '16 / 9',
    fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  LinkedIn: {
    charLimit: 3000,
    truncateAt: 210,
    linkColor: '#0A66C2',
    imageAspect: '1.91 / 1',
    fontStack: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif',
  },
  Instagram: {
    charLimit: 2200,
    truncateAt: 125,
    linkColor: '#00376B',
    imageAspect: '1 / 1',
    fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
};
