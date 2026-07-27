document.addEventListener('DOMContentLoaded', function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1. 질병 탭 데이터
     ========================================================= */
  var tabData = [
    {
      name: '무릎 인공관절',
      checks: [
        '쪼그려 앉는 작업을 오래 하셨다',
        '무거운 물건을 자주 옮기셨다',
        '계단·사다리를 반복해 오르내리셨다',
        '무릎에 부담이 큰 업무를 수년간 반복했다'
      ],
      criteria: '무릎 연골이 닳는 일을 오래 하셨다면 퇴행성 관절염(연골이 닳는 병)도 산재가 될 수 있습니다. 인공관절 수술을 받으셨다면 인정 가능성이 더 높아집니다.',
      caseText: '25년간 건설 현장에서 일하신 분, 무릎 인공관절 수술 후 1억 4,578만 원 인정.'
    },
    {
      name: '허리디스크·협착증',
      checks: [
        '무거운 짐을 자주 드셨다',
        '허리를 굽혔다 폈다 반복하는 작업을 하셨다',
        '진동이 심한 장비를 다루셨다',
        '오래 서서 일하셨다'
      ],
      criteria: '허리에 힘이 실리는 일을 오래 하셨다면 디스크(추간판탈출증)나 척추관협착증(신경 통로가 좁아지는 병)도 산재로 볼 수 있습니다.',
      caseText: '18년간 물류 상하차 일을 하신 분, 허리디스크로 5,287만 원 인정.'
    },
    {
      name: '소음성 난청',
      checks: [
        '시끄러운 기계 옆에서 일하셨다',
        '귀마개 없이 오래 근무하셨다',
        '대화가 잘 안 들리기 시작했다',
        '이명(귀울림)이 있다'
      ],
      criteria: '아주 시끄러운 곳(85데시벨 이상)에서 오래 일하셨다면 귀가 나빠진 것도 산재로 인정될 수 있습니다. 퇴직 후에도 신청할 수 있습니다.',
      caseText: '30년간 공장에서 일하신 분, 소음성 난청으로 9,354만 원 인정.'
    }
  ];

  var checkIconSvg = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:3px" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg>';

  var tabButtons = document.querySelectorAll('.tab-btn');
  var tabName = document.getElementById('tabName');
  var tabChecks = document.getElementById('tabChecks');
  var tabCriteria = document.getElementById('tabCriteria');
  var tabCase = document.getElementById('tabCase');
  var activeTab = 0;

  function renderTab(i) {
    activeTab = i;
    var t = tabData[i];
    tabName.textContent = t.name;
    tabCriteria.textContent = t.criteria;
    tabCase.textContent = t.caseText;
    tabChecks.innerHTML = t.checks.map(function (c) {
      return '<li>' + checkIconSvg + '<span>' + c + '</span></li>';
    }).join('');
    tabButtons.forEach(function (btn) {
      var on = +btn.dataset.tab === i;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { renderTab(+btn.dataset.tab); });
  });
  document.getElementById('tabPrev').addEventListener('click', function () {
    renderTab((activeTab + tabData.length - 1) % tabData.length);
  });
  document.getElementById('tabNext').addEventListener('click', function () {
    renderTab((activeTab + 1) % tabData.length);
  });
  document.querySelectorAll('[data-open-tab]').forEach(function (el) {
    el.addEventListener('click', function () { renderTab(+el.dataset.openTab); });
  });
  renderTab(0);

  /* =========================================================
     2. FAQ 아코디언
     ========================================================= */
  var faqData = [
    { q: '비용이 정말 하나도 안 드나요?', a: '상담비·착수금·경비 모두 받지 않습니다. 산재로 인정돼 보상금을 받으셨을 때만 약정한 수임료가 발생하는 성공보수제입니다.' },
    { q: '산재 인정이 안 되면 어떻게 되나요?', a: '인정되지 않으면 수임료를 받지 않습니다. 미리 낸 돈이 없으니 고객이 부담하실 비용도 없습니다.' },
    { q: '이미 퇴사했는데도 신청할 수 있나요?', a: '네, 퇴직하신 뒤에도 신청할 수 있습니다. 특히 소음성 난청은 퇴직 후 신청하는 경우가 많습니다. 먼저 전화로 확인해 보세요.' },
    { q: '회사에 불이익이 가지 않을까요?', a: '산재보상은 근로복지공단을 통해 진행되며 회사가 직접 돈을 내는 것이 아닙니다. 신청했다는 이유로 불이익을 주는 것은 법으로 금지돼 있습니다.' },
    { q: '수십 년 전에 일한 것도 인정되나요?', a: '오래 전 근무도 근무 이력과 병의 관련성이 확인되면 인정될 수 있습니다. 기록을 찾는 일은 승도가 맡습니다.' },
    { q: '상담부터 지급까지 얼마나 걸리나요?', a: '사안에 따라 다르지만 보통 자료 준비와 공단 심사를 거쳐 몇 달 정도 걸립니다. 진행 상황은 그때그때 알려드립니다.' }
  ];

  var faqList = document.getElementById('faqList');
  faqList.innerHTML = faqData.map(function (f, i) {
    return '' +
      '<div class="faq-item" data-faq="' + i + '">' +
      '  <button class="faq-question" aria-expanded="false">' +
      '    <span>' + f.q + '</span>' +
      '    <span class="faq-sign" aria-hidden="true">+</span>' +
      '  </button>' +
      '  <div class="faq-answer">' + f.a + '</div>' +
      '</div>';
  }).join('');

  faqList.addEventListener('click', function (e) {
    var btn = e.target.closest('.faq-question');
    if (!btn) return;
    var item = btn.closest('.faq-item');
    var isOpen = item.classList.contains('is-open');
    faqList.querySelectorAll('.faq-item').forEach(function (el) {
      el.classList.remove('is-open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-sign').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('is-open');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-sign').textContent = '\u2212';
    }
  });

  /* =========================================================
     3. 스크롤 reveal
     ========================================================= */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduce) {
    revealItems.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = +el.dataset.delay || 0;
          setTimeout(function () { el.classList.add('is-visible'); }, delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* =========================================================
     4. 숫자 카운트업
     ========================================================= */
  function fmt(v, type) {
    v = Math.round(v);
    if (type === 'eok') return v + '억 원';
    if (type === 'man') {
      if (v >= 10000) return Math.floor(v / 10000) + '억 ' + (v % 10000).toLocaleString() + '만 원';
      return v.toLocaleString() + '만 원';
    }
    return v.toLocaleString();
  }

  var countEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
  function startCount(el) {
    var target = +el.dataset.count;
    var type = el.dataset.format || 'num';
    if (reduce) { el.textContent = fmt(target, type); return; }
    var dur = 1400;
    var t0 = performance.now();
    function tick(t) {
      var p = Math.min(1, (t - t0) / dur);
      p = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * p, type);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (reduce) {
    countEls.forEach(function (el) { el.textContent = fmt(+el.dataset.count, el.dataset.format); });
  } else {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { startCount(entry.target); io2.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function (el) { io2.observe(el); });
  }

  /* =========================================================
     5. 스크롤 이벤트: 헤더 그림자 / 하단 고정바 / 타임라인 진행바
     ========================================================= */
  var header = document.getElementById('siteHeader');
  var sticky = document.getElementById('stickyCta');
  var fill = document.getElementById('timelineFill');
  var track = document.querySelector('.timeline-track');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 4);
    if (sticky) sticky.classList.toggle('is-visible', y > 300);
    if (track && fill) {
      var r = track.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.65 - r.top) / (r.height + vh * 0.35)));
      fill.style.transform = 'scaleX(' + p + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* =========================================================
     6. 맨 위로
     ========================================================= */
  var toTopBtn = document.getElementById('toTopBtn');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
