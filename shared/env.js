/** returns true if we are running in "production" env */
const isProduction =
  process !== 'undefined' && process.env.NODE_ENV === 'production';

/** returns true if we are not running in "production" env */
const isDevelopment = !isProduction && process.env.NODE_ENV !== 'test';

/** Detect Detect Node.js */
const isServer = typeof window === 'undefined';

/** Detect Browser Environment */
const isClient = !isServer;

/** True if run inside a webworker environment */
const isWebWorker =
  typeof self === 'object' &&
  self.constructor &&
  self.constructor.name === 'DedicatedWorkerGlobalScope';

/** Returns navigator.userAgent string or '' if it's not defined */
const userAgent =
  typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string'
    ? navigator['userAgent']
    : '';

/** Detect React Native */
const isReactNative =
  typeof navigator === 'object' && navigator['product'] === 'ReactNative';

/** Detects Electron apps */
const isElectron = userAgent.indexOf('Electron/') >= 0;

/** Detects Internet Explorer */
const isIE =
  (isClient && userAgent.indexOf('MSIE ') >= 0) ||
  userAgent.indexOf('Trident/') >= 0;

/** Detects Universal Windows Platform apps */
const isUWP = userAgent.indexOf('MSAppHost/') >= 0;

/** Returns true if we are running in Safari */
const isSafari =
  isClient && userAgent.includes('Safari') && !userAgent.includes('Chrome');

/** Returns true if we are running in Chrome */
const isChrome =
  isClient &&
  userAgent.includes('Chrome') &&
  window['chrome'] !== undefined &&
  window.chrome.app;

/** This method checks whether cookie is enabled within current browser */
const areCookiesEnabled = !(
  typeof navigator === 'undefined' || !navigator.cookieEnabled
);

module.exports = {
  userAgent,
  isProduction,
  isDevelopment,
  isServer,
  isClient,
  isWebWorker,
  isElectron,
  isIE,
  isSafari,
  isUWP,
  isChrome,
  isReactNative,
  areCookiesEnabled
};
