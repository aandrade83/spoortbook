(function () {
  var script = document.currentScript || (function () {
    var s = document.getElementsByTagName('script');
    return s[s.length - 1];
  })();

  var targetId = script.getAttribute('data-target') || 'ccs-embed';
  var height   = script.getAttribute('data-height') || '100vh';
  var site     = script.getAttribute('data-site')   || '';
  var origin   = new URL(script.src).origin;
  var iframeSrc = origin + '/?embed=1' + (site ? '&site=' + encodeURIComponent(site) : '');

  var container = document.getElementById(targetId);
  if (!container) {
    container = document.createElement('div');
    container.id = targetId;
    script.parentNode.insertBefore(container, script);
  }

  var iframe = document.createElement('iframe');
  iframe.src = iframeSrc;
  iframe.style.cssText = 'width:100%;border:0;display:block;height:' + height + ';';
  iframe.setAttribute('allow', 'payment *; fullscreen *');
  iframe.setAttribute('title', 'Cigar City Sports');
  container.appendChild(iframe);

  window.addEventListener('message', function (e) {
    if (e.source !== iframe.contentWindow) return;
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'ccs:open-external') {
      window.open(origin + (e.data.path || '/'), '_blank', 'noopener,noreferrer');
    }
  });

  window.CCS = {
    reload:  function () { iframe.src = iframeSrc; },
    destroy: function () { if (iframe.parentNode) iframe.parentNode.removeChild(iframe); },
  };
})();
