// 极简、确定可用的 landing 语言切换脚本
(function () {
  var STORAGE_KEY = 'landing-lang';
  var downloadUrl = typeof window !== 'undefined' && window.DOWNLOAD_URL ? window.DOWNLOAD_URL : '#';

  function applyDownloadUrl() {
    document.querySelectorAll('.download-link').forEach(function (a) {
      if (a.getAttribute('href') !== downloadUrl) a.setAttribute('href', downloadUrl);
    });
  }

  function setLang(l) {
    var isZh = l === 'zh';

    document.querySelectorAll('[data-zh]').forEach(function (el) {
      el.classList.toggle('hidden', !isZh);
    });
    document.querySelectorAll('[data-en]').forEach(function (el) {
      el.classList.toggle('hidden', isZh);
    });

    var zhBtnFooter = document.getElementById('btn-lang-zh-footer');
    var enBtnFooter = document.getElementById('btn-lang-en-footer');
    if (zhBtnFooter) zhBtnFooter.classList.toggle('active', isZh);
    if (enBtnFooter) enBtnFooter.classList.toggle('active', !isZh);

    document.documentElement.lang = isZh ? 'zh-CN' : 'en';

    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch (e) {
      // ignore
    }
  }

  function initLang() {
    var initial = 'zh';
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') {
        initial = stored;
      } else if (navigator.language && navigator.language.toLowerCase().startsWith('zh')) {
        initial = 'zh';
      } else {
        initial = 'en';
      }
    } catch (e) {
      // ignore
    }
    setLang(initial);
  }

  function bindEvents() {
    var toggle = document.getElementById('footer-lang-toggle');
    var menu = document.getElementById('footer-lang-menu');
    var zhBtnFooter = document.getElementById('btn-lang-zh-footer');
    var enBtnFooter = document.getElementById('btn-lang-en-footer');

    if (toggle && menu) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      document.addEventListener('click', function () {
        menu.classList.remove('open');
      });
    }

    if (zhBtnFooter) {
      zhBtnFooter.addEventListener('click', function () {
        setLang('zh');
      });
    }
    if (enBtnFooter) {
      enBtnFooter.addEventListener('click', function () {
        setLang('en');
      });
    }
  }

  // DOM 加载完再绑定，避免元素还没渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initLang();
      bindEvents();
      applyDownloadUrl();
    });
  } else {
    initLang();
    bindEvents();
    applyDownloadUrl();
  }
})();

