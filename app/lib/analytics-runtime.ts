/** Browser source served unchanged to App Router and legacy HTML by /analytics.js. */
export const analyticsRuntime = String.raw`(function () {
  var config = window.__BIF_ANALYTICS_CONFIG__ || {};
  var g = window;
  var queue = g.bifAnalyticsQueue = g.bifAnalyticsQueue || [];
  var validId = config.mode === 'gtm'
    ? /^GTM-[A-Z0-9]+$/.test(config.id || '')
    : /^G-[A-Z0-9]+$/.test(config.id || '');
  var blocked = g.doNotTrack === '1' || g.doNotTrack === 'yes' ||
    navigator.doNotTrack === '1' || navigator.doNotTrack === 'yes' ||
    navigator.globalPrivacyControl === true;

  if (!config.enabled || !validId || blocked) {
    queue.length = 0;
    g.bifAnalytics = { trackEvent: function () {} };
    return;
  }
  if (g.__BIF_ANALYTICS_RUNTIME_INITIALIZED__) return;
  g.__BIF_ANALYTICS_RUNTIME_INITIALIZED__ = true;

  var sensitive = /(?:^|[^a-z0-9])[\w.+-]+@[\w.-]+\.[a-z]{2,}(?:$|[^a-z0-9])/i;
  var phoneLike = /(?:\+?\d[\d ().-]{7,}\d)/;
  var allowedKeys = {
    lead_type: 50, form_source: 50, form_type: 50, form_id: 50,
    estimate_type: 40, pack: 30,
    source: 50, error_type: 50, method: 30, link_type: 30, destination: 180,
    file_extension: 12, video_category: 50, video_industry: 50,
    video_client: 50, page_path: 180
  };

  function safeToken(value, max) {
    if (typeof value !== 'string') return value;
    var text = value.trim();
    if (!text || sensitive.test(text) || phoneLike.test(text)) return undefined;
    if (!/^[\w .:/-]+$/.test(text)) return undefined;
    return text.slice(0, max);
  }

  function safePath(pathname) {
    return String(pathname || '/').split('/').map(function (part) {
      var decoded = part;
      try { decoded = decodeURIComponent(part); } catch (_) {}
      if (sensitive.test(decoded) || phoneLike.test(decoded)) return '[redacted]';
      return encodeURIComponent(decoded).replace(/%3A/gi, ':').replace(/%40/gi, '@');
    }).join('/') || '/';
  }

  function safeLocation(input, includeCampaign) {
    if (!input) return '';
    var url;
    try { url = new URL(input || location.href, location.origin); }
    catch (_) { url = new URL(location.origin); }
    var result = url.origin + safePath(url.pathname);
    if (includeCampaign) {
      var kept = [];
      url.searchParams.forEach(function (value, key) {
        if (!/^utm_(source|medium|campaign|term|content)$/i.test(key)) return;
        var safeValue = safeToken(value, 100);
        if (safeValue !== undefined) kept.push(encodeURIComponent(key.toLowerCase()) + '=' + encodeURIComponent(safeValue));
      });
      if (kept.length) result += '?' + kept.join('&');
    }
    return result;
  }

  var currentLocation = safeLocation(location.href, true);
  var currentReferrer = safeLocation(document.referrer, false);
  var lastPage = '';

  function cleanParams(params) {
    var clean = {};
    if (!params || typeof params !== 'object') return clean;
    Object.keys(params).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(allowedKeys, key)) return;
      var value = params[key];
      if (key === 'estimate_type' && ['generated', 'escalation', 'server_fallback', 'client_error_fallback'].indexOf(value) < 0) return;
      if (key === 'error_type' && ['submission_failed', 'estimate_request_failed', 'email_request_failed'].indexOf(value) < 0) return;
      if (key === 'pack' && [
        '1 Image $100', '5 Images $400', '10 Images $600', '20 Images $1100', '25 Images $1500'
      ].indexOf(value) < 0) return;
      if (key === 'form_source' && value === 'The Last $10 contact page') value = 'the_last_10_contact';
      if (typeof value === 'string' && key !== 'pack') value = safeToken(value, allowedKeys[key]);
      if (value === undefined || value === null || value === '') return;
      if (typeof value === 'number' && !isFinite(value)) return;
      if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') return;
      clean[key] = value;
    });
    return clean;
  }

  function emit(name, params) {
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(name)) return;
    var payload = cleanParams(params);
    payload.page_path = safePath(location.pathname);
    payload.page_location = currentLocation;
    payload.page_referrer = currentReferrer;
    if (config.mode === 'gtm') {
      g.dataLayer = g.dataLayer || [];
      g.dataLayer.push(Object.assign({ event: name }, payload));
    } else if (typeof g.gtag === 'function') {
      g.gtag('event', name, payload);
    }
  }

  g.bifAnalytics = { trackEvent: emit };
  if (config.mode === 'gtm') {
    g.dataLayer = g.dataLayer || [];
    g.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  } else {
    g.dataLayer = g.dataLayer || [];
    g.gtag = function () { g.dataLayer.push(arguments); };
    g.gtag('js', new Date());
    g.gtag('config', config.id, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      send_page_view: false,
      page_location: safeLocation(location.href, true),
      page_referrer: safeLocation(document.referrer, false)
    });
  }

  var pending = queue.splice(0, queue.length);
  pending.forEach(function (item) {
    if (item && typeof item.eventName === 'string') emit(item.eventName, item.params || {});
  });

  var script = document.createElement('script');
  script.async = true;
  script.src = config.mode === 'gtm'
    ? 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(config.id)
    : 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.id);
  (document.head || document.documentElement).appendChild(script);

  function pageView() {
    var page = safeLocation(location.href, true);
    if (page === lastPage) return;
    currentReferrer = lastPage ? currentLocation : safeLocation(document.referrer, false);
    currentLocation = page;
    lastPage = page;
    if (config.mode === 'ga') {
      var pageContext = {
        update: true,
        send_page_view: false,
        page_location: currentLocation,
        page_referrer: currentReferrer,
        page_path: safePath(location.pathname)
      };
      g.gtag('config', config.id, pageContext);
      g.gtag('event', 'page_view', {
        page_location: currentLocation,
        page_referrer: currentReferrer,
        page_path: safePath(location.pathname)
      });
    }
  }
  pageView();
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    if (typeof original !== 'function' || original.__bifWrapped) return;
    var wrapped = function () {
      var result = original.apply(this, arguments);
      pageView();
      return result;
    };
    wrapped.__bifWrapped = true;
    history[method] = wrapped;
  });
  addEventListener('popstate', pageView);

  function handleClick(event) {
    var target = event.target;
    if (!target || typeof target.closest !== 'function') return;
    var anchor = target.closest('a[href]');
    if (!anchor) return;
    var raw = anchor.getAttribute('href') || '';
    var lower = raw.toLowerCase();
    if (lower.indexOf('tel:') === 0) { emit('phone_click', { method: 'telephone' }); return; }
    if (lower.indexOf('mailto:') === 0) { emit('email_click', { method: 'email' }); return; }

    var url;
    try { url = new URL(raw, location.href); } catch (_) { return; }
    var pathname = safePath(url.pathname);
    var params = { destination: pathname };
    if (url.origin === location.origin && /^\/?estimate\/?$/i.test(url.pathname)) emit('quote_cta_click', params);
    if (url.origin === location.origin && /^\/case-studies\/[^/]+\/?$/i.test(url.pathname)) emit('case_study_click', params);
    if (/calendly\.com$|\.calendly\.com$|cal\.com$|\.cal\.com$|savvycal\.com$/i.test(url.hostname)) {
      emit('booking_outbound_click', { destination: url.hostname });
    }
    var match = url.pathname.match(/\.([a-z0-9]{2,6})$/i);
    if (match && /^(pdf|docx?|xlsx?|pptx?|zip|csv)$/i.test(match[1])) {
      emit('file_download', { file_extension: match[1].toLowerCase() });
    }
    if (/vimeo\.com$|youtube\.com$|youtu\.be$|player\.vimeo\.com$/i.test(url.hostname)) {
      emit('video_open', { destination: url.hostname });
    }
  }
  document.addEventListener('click', handleClick, true);
})();`;
