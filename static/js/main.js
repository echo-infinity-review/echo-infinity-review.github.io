/* Echo-Infinity Project Page — main JS
 * Handles:
 *   1. Render showcase rows from window.SHOWCASE_ORDER + window.PROMPTS + YOUTUBE_VIDEOS
 *   2. Render qualitative comparison grid from window.COMPARE
 *   3. Showcase 3D scroll roll-out + horizontal auto-scroll + main-content pull-up
 *   4. Lazy-load + concurrent-load queue + play/pause IntersectionObservers
 *   5. Prompt modal (regular + multi-prompt) + YouTube embedded modal
 *   6. 60s multi-prompt show/hide
 *   7. Dark mode toggle, scroll-to-top, fade-in, count-up
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // ========================================================================
    // Helpers
    // ========================================================================
    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

    const ROW_LABELS = {
        '24h':  { len: '24 h',  sub: 'YouTube' },
        '1h':   { len: '1 h',   sub: 'YouTube' },
        '240s': { len: '240 s', sub: 'single-prompt' },
        '30s':  { len: '30 s',  sub: 'single-prompt' },
        '60s':  { len: '60 s',  sub: 'multi-prompt' },
        '5s':   { len: '5 s',   sub: 'single-prompt' },
    };
    const ROW_ORDER = ['24h', '1h', '240s', '30s', '60s', '5s'];

    // ========================================================================
    // 1. Render showcase rows
    // ========================================================================
    function makeYouTubeCard(length, idx) {
        const meta = (window.YOUTUBE_VIDEOS && window.YOUTUBE_VIDEOS[length] && window.YOUTUBE_VIDEOS[length][idx])
                     || { label: `${ROW_LABELS[length].len} Demo #${idx+1}`, youtubeId: 'S3zpLIMOU4c' };
        const labelEsc = escapeHtml(meta.label);

        // 24h cards carry both Part 1 + Part 2 ids in `parts` and the shared
        // prompt text in `prompt`. Render single thumbnail (Part 1) + a
        // "2 × 12 h" badge that hints at the modal split, with the real prompt
        // (truncated by CSS line-clamp) below the thumbnail.
        if (Array.isArray(meta.parts) && meta.parts.length >= 1) {
            const thumbId = encodeURIComponent(meta.parts[0].youtubeId);
            const partsAttr = JSON.stringify(meta.parts).replace(/'/g, "&#39;");
            const promptText = (meta.prompt || '').trim();
            const promptEsc = escapeHtml(promptText);
            const promptAttr = promptEsc.replace(/"/g, '&quot;');
            // Fall back to label as visible text when no prompt yet (placeholder
            // entries before integrate.py fills in HF manifest data).
            const visibleText = promptEsc || 'Click to play both parts';
            return `
            <div class="video-card yt yt-split" data-label="${labelEsc}"
                 data-prompt="${promptAttr}" data-parts='${partsAttr}'>
              <div class="video-wrap">
                <img src="https://i.ytimg.com/vi/${thumbId}/mqdefault.jpg" alt="${labelEsc}"
                     loading="lazy" decoding="async" referrerpolicy="no-referrer"
                     onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg';}">
                <div class="play-overlay">
                  <i class="fas fa-play"></i>
                </div>
                <span class="badge badge-split">2 × 12 h</span>
              </div>
              <p class="prompt" data-prompt="${promptAttr}">${visibleText}</p>
            </div>`;
        }

        // 1h cards: single youtubeId, single thumbnail.
        // 1h cards: single youtubeId, single thumbnail. Now carries `prompt`
        // from per-(gpu, seed) HF manifest; visible text is the prompt with
        // CSS line-clamp, fallback to label if prompt missing.
        const ytId = encodeURIComponent(meta.youtubeId);
        const thumbMq = `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`;
        const thumbHq = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
        const promptText = (meta.prompt || '').trim();
        const promptEsc  = escapeHtml(promptText);
        const promptAttr = promptEsc.replace(/"/g, '&quot;');
        const visibleText = promptEsc || 'Click to play';
        return `
        <div class="video-card yt" data-youtube-id="${escapeHtml(meta.youtubeId)}"
             data-label="${labelEsc}" data-prompt="${promptAttr}">
          <div class="video-wrap">
            <img src="${thumbMq}" alt="${labelEsc}"
                 loading="lazy" decoding="async"
                 referrerpolicy="no-referrer"
                 onerror="if(this.dataset.fallback!=='1'){this.dataset.fallback='1';this.src='${thumbHq}';}">
            <div class="play-overlay">
              <i class="fas fa-play"></i>
            </div>
          </div>
          <p class="prompt" data-prompt="${promptAttr}">${visibleText}</p>
        </div>`;
    }

    function makeVideoCard(length, caseId, prompt) {
        const text = escapeHtml(prompt);
        return `
        <div class="video-card" data-length="${length}" data-case="${caseId}">
          <div class="video-wrap">
            <video poster="assets/posters/${length}/${caseId}.jpg"
                   preload="none" muted playsinline loop>
              <source data-src="videos/${length}/${caseId}.mp4" type="video/mp4">
            </video>
            <span class="badge">${ROW_LABELS[length].len}</span>
          </div>
          <p class="prompt" data-prompt="${text.replace(/"/g, '&quot;')}">${text}</p>
        </div>`;
    }

    function makeMultiPromptCard(length, caseId, prompts) {
        const lis = prompts.map((p, i) => {
            const t0 = i * 10, t1 = (i + 1) * 10;
            return `<li data-segment="${t0}-${t1}s">${escapeHtml(p)}</li>`;
        }).join('');
        const first = escapeHtml(prompts[0]);
        const allText = JSON.stringify(prompts);
        return `
        <div class="video-card" data-length="${length}" data-case="${caseId}" data-multi='${allText.replace(/'/g, "&#39;")}'>
          <div class="video-wrap">
            <video poster="assets/posters/${length}/${caseId}.jpg"
                   preload="none" muted playsinline loop>
              <source data-src="videos/${length}/${caseId}.mp4" type="video/mp4">
            </video>
            <span class="badge">60 s · multi</span>
          </div>
          <p class="prompt" data-prompt="${first.replace(/"/g, '&quot;')}">${first}</p>
          <span class="multi-prompt-toggle">Show all 6 prompts ▾</span>
          <ul class="multi-prompt-list">${lis}</ul>
        </div>`;
    }

    function makeRow(length) {
        const ids = window.SHOWCASE_ORDER[length] || [];
        const cards = ids.map((id, i) => {
            if (length === '24h' || length === '1h') return makeYouTubeCard(length, i);
            if (length === '60s') {
                const arr = (window.PROMPTS['60s'] && window.PROMPTS['60s'][id]) || [];
                return makeMultiPromptCard(length, id, arr);
            }
            const p = (window.PROMPTS[length] && window.PROMPTS[length][id]) || '';
            return makeVideoCard(length, id, p);
        }).join('');
        // Optional explanatory note injected ABOVE the row (sibling of .showcase-row,
        // not inside .row-track, so it doesn't ride the marquee animation).
        let bannerHtml = '';
        const note = window.CARD_NOTES && window.CARD_NOTES[length];
        if (note) {
            bannerHtml = `<p class="row-note"><i class="fas fa-circle-info"></i> ${escapeHtml(note)}</p>`;
        }
        return bannerHtml + `<div class="showcase-row" data-length="${length}">${cards}</div>`;
    }

    const ROWS_HOST = document.getElementById('showcase-rows');
    if (ROWS_HOST && window.SHOWCASE_ORDER) {
        ROWS_HOST.innerHTML = ROW_ORDER.map(makeRow).join('');
    }

    // ========================================================================
    // 2. Render comparison grid (videos/compare/<L>/<case>/<method>.mp4)
    // ========================================================================
    function renderComparison() {
        const host = document.getElementById('comparison-host');
        if (!host || !window.COMPARE) return;
        const METHODS = [
            ['ours',     'Echo-Infinity (Ours)', 'method-ours'],
            ['longlive', 'LongLive',             ''],
            ['memflow',  'MemFlow',              ''],
            ['memorize', 'Memorize-and-Generate',''],
        ];
        const SECTION_TITLES = {
            '240s': '240 s · MovieGen long-video benchmark',
            '30s':  '30 s · VBench-Long benchmark',
            '60s':  '60 s · Multi-prompt interactive benchmark',
            '5s':   '5 s · VBench standard benchmark',
        };
        let html = '';
        ['240s', '30s', '60s', '5s'].forEach(L => {
            const cases = window.COMPARE[L] || [];
            if (!cases.length) return;
            html += `<h3 class="cmp-section-title">${SECTION_TITLES[L] || L}</h3>`;
            cases.forEach(c => {
                const multiAttr = (L === '60s' && Array.isArray(c.prompts) && c.prompts.length)
                    ? ` data-multi='${JSON.stringify(c.prompts).replace(/'/g, "&#39;")}'`
                    : '';
                html += `<div class="cmp-block fade-in-up" data-length="${L}" data-case="${c.case}" data-prompt="${escapeHtml(c.prompt).replace(/"/g, '&quot;')}"${multiAttr}>`;
                html += `<div class="cmp-row">`;
                METHODS.forEach(([m, tagText, tagCls]) => {
                    html += `<div class="cmp-cell">
                        <span class="method-tag ${tagCls}">${tagText}</span>
                        <div class="video-wrap">
                          <video poster="assets/posters/compare/${L}/${c.case}/${m}.jpg"
                                 preload="none" muted playsinline loop>
                            <source data-src="videos/compare/${L}/${c.case}/${m}.mp4" type="video/mp4">
                          </video>
                        </div>
                      </div>`;
                });
                html += `</div>`;
                if (L === '60s' && Array.isArray(c.prompts) && c.prompts.length) {
                    const lis = c.prompts.map((p, i) => {
                        const t0 = i * 10, t1 = (i + 1) * 10;
                        return `<li data-segment="${t0}-${t1}s">${escapeHtml(p)}</li>`;
                    }).join('');
                    const allText = JSON.stringify(c.prompts).replace(/'/g, "&#39;");
                    const first = escapeHtml(c.prompts[0]);
                    html += `<p class="cmp-prompt prompt" data-prompt="${first.replace(/"/g, '&quot;')}" data-multi='${allText}'>${first}</p>`;
                    html += `<span class="multi-prompt-toggle">Show all 6 prompts ▾</span>`;
                    html += `<ul class="multi-prompt-list">${lis}</ul>`;
                } else {
                    html += `<p class="cmp-prompt">${escapeHtml(c.prompt)}</p>`;
                }
                html += `</div>`;
            });
        });
        host.innerHTML = html;
        // Re-observe new fade-in elements (added after initial scan)
        host.querySelectorAll('.fade-in-up').forEach(el => fadeObs.observe(el));
    }

    // ========================================================================
    // 3. Fade-in (must define before renderComparison uses it)
    // ========================================================================
    const fadeObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-in-up').forEach((el) => fadeObs.observe(el));

    renderComparison();

    // ========================================================================
    // 4. Count-up
    // ========================================================================
    const countEls = document.querySelectorAll('[data-count-to]');
    if (countEls.length > 0) {
        const countObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting || entry.target._counted) return;
                entry.target._counted = true;
                const el = entry.target;
                const target = parseFloat(el.dataset.countTo);
                const prefix = el.dataset.prefix || '';
                const suffix = el.dataset.suffix || '';
                const hasDecimal = String(el.dataset.countTo).indexOf('.') !== -1;
                const duration = 1500;
                const start = performance.now();
                function update(now) {
                    var t = Math.min(1, (now - start) / duration);
                    var ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                    var val = ease * target;
                    el.textContent = prefix + (hasDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
                    if (t < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
        }, { threshold: 0.5 });
        countEls.forEach((el) => countObs.observe(el));
    }

    // ========================================================================
    // 5. Medium-zoom for figures
    // ========================================================================
    if (typeof mediumZoom === 'function') {
        mediumZoom('[data-zoomable]', { margin: 40, background: 'rgba(0, 0, 0, 0.78)' });
    }

    // ========================================================================
    // 6. Dark mode toggle
    // ========================================================================
    const darkToggle = document.getElementById('dark-toggle');
    const htmlEl = document.documentElement;
    function updateToggleIcon() {
        if (!darkToggle) return;
        const icon = darkToggle.querySelector('i');
        if (htmlEl.classList.contains('dark')) icon.className = 'fas fa-sun text-yellow-300';
        else icon.className = 'fas fa-moon text-gray-600';
    }
    updateToggleIcon();
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            localStorage.setItem('theme', htmlEl.classList.contains('dark') ? 'dark' : 'light');
            updateToggleIcon();
        });
    }

    // ========================================================================
    // 7. Scroll-to-top
    // ========================================================================
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) scrollTopBtn.classList.add('visible');
            else scrollTopBtn.classList.remove('visible');
        }, { passive: true });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ========================================================================
    // 8. Showcase scroll animation + auto-scroll
    // ========================================================================
    const showcaseWrapper = document.getElementById('showcase-wrapper');
    const showcaseRows    = document.getElementById('showcase-rows');
    const showcaseRowEls  = document.querySelectorAll('.showcase-row');
    const showcaseHero    = document.getElementById('showcase-hero');
    const mainContent     = document.getElementById('main-content');

    document.querySelectorAll('#top-nav a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (mainContent) mainContent.style.transform = 'translateY(0)';
        });
    });

    if (showcaseWrapper && showcaseRows && showcaseRowEls.length > 0) {

        // Wrap cards into a CSS-animated marquee track per row.
        // Cloning until track ≥ 2× viewport guarantees the translate(-50%) loop
        // never reveals empty space (the second half is a duplicate of the first).
        // Even-indexed rows scroll left-to-right; odd rows reverse.
        const TARGET_PX_PER_SEC = 32;     // visual scrolling speed
        showcaseRowEls.forEach(function (row, idx) {
            const cards = Array.from(row.children);
            if (cards.length === 0) return;

            const track = document.createElement('div');
            track.className = 'row-track';
            cards.forEach(c => track.appendChild(c));
            row.appendChild(track);

            // Clone until the natural width is at least 2× the viewport
            // (so each "half" of the marquee is wider than what's on-screen).
            const targetWidth = window.innerWidth * 2;
            let safety = 0;
            while (track.scrollWidth < targetWidth && safety++ < 10) {
                cards.forEach(c => track.appendChild(c.cloneNode(true)));
            }

            // After cloning, the track contains 2N copies of the unique set.
            // translate(0 → -50%) traverses exactly N copies = one logical loop.
            const halfWidth = track.scrollWidth / 2;
            const duration  = Math.max(20, halfWidth / TARGET_PX_PER_SEC); // seconds
            track.style.animationDuration  = duration + 's';
            track.style.animationDirection = (idx % 2 === 0) ? 'normal' : 'reverse';
            // Stagger start position (visual variety) via negative animation-delay
            track.style.animationDelay = (-(idx * duration / 6)).toFixed(2) + 's';
        });

        var pullUp = 0;
        var endTranslateY = 350;
        function calculatePullUp() {
            if (mainContent && showcaseHero) {
                var heroHeight = showcaseHero.offsetHeight;
                endTranslateY = heroHeight;
                var rowsHeight = showcaseRows.scrollHeight;
                var desiredHeight = heroHeight + rowsHeight;
                showcaseWrapper.style.minHeight = Math.max(window.innerHeight, desiredHeight) + 'px';
                // The visible "showcase region" at the top of the page covers from
                // page-top down to where main content (TLDR) becomes visible. Push
                // TLDR to ~65% of the viewport so the showcase + hero occupy the
                // top portion of the first screen, while still respecting the
                // natural hero height on unusually tall hero / short viewports.
                var heroBottom = showcaseHero.offsetTop + heroHeight;
                var showcaseFloor = Math.max(heroBottom, window.innerHeight * 0.65);
                pullUp = Math.max(0, mainContent.offsetTop - showcaseFloor);
            }
        }
        calculatePullUp();

        var lastProgress = 0;
        var ticking = false;
        function updateShowcase() {
            var rect = showcaseWrapper.getBoundingClientRect();
            var scrollRange = rect.height - window.innerHeight;
            var progress = Math.min(1, Math.max(0, -rect.top / scrollRange));
            var t = Math.min(1, progress / 0.25);

            var rotateX = 14 * (1 - t);
            var rotateZ = -18 * (1 - t);
            var translateY = -200 + (endTranslateY + 200) * t;
            var opacity = 0.25 + 0.75 * t;

            // While the rows are in their rotated/blurred backdrop state (t<1),
            // shift the whole rotated mass up + right so the off-screen bottom-left
            // tail is brought into view and the upper-right area is filled in.
            // The shift attenuates to 0 as the rows un-rotate during scroll.
            var shiftX = 120 * (1 - t);
            var shiftY = -90 * (1 - t);

            showcaseRows.style.transform =
                'translate3d(' + shiftX + 'px, ' + shiftY + 'px, 0) ' +
                'rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg) translateY(' + translateY + 'px)';
            showcaseRows.style.opacity = opacity;

            // Auto-scroll is now CSS-driven (continuous, GPU-composited).
            // Page-scroll only affects 3D rotation / opacity / hero fade / pull-up.
            lastProgress = progress;

            if (showcaseHero) {
                var heroFade = Math.max(0, Math.min(1, 1 - (progress - 0.3) / 0.3));
                showcaseHero.style.opacity = heroFade;
                showcaseHero.style.visibility = heroFade < 0.01 ? 'hidden' : 'visible';
            }
            if (mainContent && pullUp > 0) {
                var contentProgress = Math.min(1, progress / 0.5);
                var currentPullUp = pullUp * (1 - contentProgress);
                mainContent.style.transform = 'translateY(-' + currentPullUp + 'px)';
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) { requestAnimationFrame(updateShowcase); ticking = true; }
        }, { passive: true });
        window.addEventListener('resize', function () {
            calculatePullUp();
            updateShowcase();
        });
        updateShowcase();
        // Auto horizontal scroll is now handled by CSS @keyframes on .row-track
        // (continuous, GPU-composited, immune to rAF idle throttling).
        // Hover-pause is handled by `.showcase-row:hover .row-track { animation-play-state: paused; }`
    }

    // ========================================================================
    // 9. Video lazy-load + concurrent-load queue + play/pause
    // ========================================================================
    const MAX_CONCURRENT_LOADS = 4;
    const loadQueue = [];
    let inflight = 0;

    function dispatchLoad() {
        while (inflight < MAX_CONCURRENT_LOADS && loadQueue.length) {
            const v = loadQueue.shift();
            if (!v || v.dataset.loaded === '1') continue;
            const src = v.querySelector('source[data-src]');
            if (!src || src.src) continue;
            inflight++;
            const release = () => { inflight = Math.max(0, inflight - 1); dispatchLoad(); };
            src.src = src.dataset.src;
            v.preload = 'auto';
            v.dataset.loaded = '1';
            v.addEventListener('canplaythrough', release, { once: true });
            v.addEventListener('error',          release, { once: true });
            v.addEventListener('loadeddata',     release, { once: true });    // fallback
            try { v.load(); } catch (_) { release(); }
        }
    }

    const loadObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadQueue.push(entry.target);
                dispatchLoad();
            }
        });
    }, { rootMargin: '50px' });

    const PLAY_THRESHOLD = 0.4;
    const playObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const v = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio >= PLAY_THRESHOLD) {
                const tryPlay = () => v.play().catch(() => {});
                if (v.readyState >= 2) tryPlay();
                else v.addEventListener('loadeddata', tryPlay, { once: true });
            } else if (!v.paused) v.pause();
        });
    }, { threshold: [0, PLAY_THRESHOLD] });

    // Showcase videos: observe immediately
    document.querySelectorAll('.video-card video').forEach((v) => {
        loadObs.observe(v);
        playObs.observe(v);
    });

    // Comparison videos: defer observation until #results approaches viewport
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        const resultsObs = new IntersectionObserver((entries) => {
            if (entries.some(e => e.isIntersecting)) {
                document.querySelectorAll('#comparison-host video').forEach((v) => {
                    loadObs.observe(v);
                    playObs.observe(v);
                });
                resultsObs.disconnect();
            }
        }, { rootMargin: '300px' });
        resultsObs.observe(resultsSection);
    }

    // ========================================================================
    // 10. Modal — regular prompt, multi-prompt, YouTube embed
    // ========================================================================
    const modalOverlay  = document.getElementById('prompt-modal-overlay');
    const modalText     = document.getElementById('prompt-modal-text');
    const modalClose    = document.getElementById('prompt-modal-close');
    const modalVideoWrap = document.getElementById('prompt-modal-video-wrap');

    const VIDEO_PLACEHOLDER_HTML =
        '<video id="prompt-modal-video" controls muted playsinline loop></video>';

    function resetModalVideoWrap() {
        if (modalVideoWrap) modalVideoWrap.innerHTML = VIDEO_PLACEHOLDER_HTML;
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        // Always reset wrap (handles iframe stop + video pause uniformly)
        resetModalVideoWrap();
        if (modalText) modalText.innerHTML = '';
    }

    function openShowcasePromptModal(card) {
        if (!modalOverlay || !card) return;
        const length = card.dataset.length;
        const caseId = card.dataset.case;
        resetModalVideoWrap();
        const modalVideo = document.getElementById('prompt-modal-video');
        modalVideo.poster = `assets/posters/${length}/${caseId}.jpg`;
        modalVideo.src    = `videos/${length}/${caseId}.mp4`;
        modalVideo.play().catch(() => {});

        let html = '';
        if (length === '60s' && card.dataset.multi) {
            try {
                const list = JSON.parse(card.dataset.multi);
                html += `<h4>Multi-prompt sequence (60 s · 6 segments)</h4>`;
                list.forEach((p, i) => {
                    const t0 = i * 10, t1 = (i + 1) * 10;
                    html += `<div class="seg"><span class="seg-tag">${t0}–${t1}s</span><div>${escapeHtml(p)}</div></div>`;
                });
            } catch (e) { html = `<p>${escapeHtml(card.querySelector('.prompt').textContent)}</p>`; }
        } else {
            const txt = card.querySelector('.prompt').dataset.prompt || card.querySelector('.prompt').textContent;
            html = `<h4>Prompt</h4><p>${escapeHtml(txt)}</p>`;
        }
        modalText.innerHTML = html;
        modalOverlay.classList.add('active');
    }

    function openYouTubeModal(card) {
        if (!modalOverlay || !card) return;
        const label = card.dataset.label || 'Demo';

        // Split case (24h cards): two iframes stacked vertically + note in text col
        if (card.dataset.parts) {
            let parts;
            try { parts = JSON.parse(card.dataset.parts); }
            catch (_) { parts = []; }
            if (parts.length === 0) return;

            const note = (window.CARD_NOTES && window.CARD_NOTES['24h']) || '';
            const promptText = card.dataset.prompt || '';
            const iframesHtml = parts.map((p, i) => `
                <div class="modal-part">
                  <div class="modal-part-label">Part ${p.n} of ${parts.length}</div>
                  <iframe src="https://www.youtube.com/embed/${encodeURIComponent(p.youtubeId)}?autoplay=${i===0?1:0}&rel=0&playsinline=1"
                          frameborder="0" allowfullscreen
                          allow="autoplay; encrypted-media; picture-in-picture"
                          loading="lazy"></iframe>
                </div>`).join('');
            modalVideoWrap.innerHTML = iframesHtml;
            const ytLinks = parts.map(p =>
                `<li><a href="https://www.youtube.com/watch?v=${encodeURIComponent(p.youtubeId)}" target="_blank" rel="noopener" class="text-blue-600 underline">Part ${p.n} / ${parts.length}</a></li>`
            ).join('');
            const promptHtml = promptText
                ? `<p class="modal-prompt">${escapeHtml(promptText)}</p>`
                : '';
            modalText.innerHTML =
              `<h4>${escapeHtml(label)}</h4>
               ${promptHtml}
               <p class="modal-note">${escapeHtml(note)}</p>
               <p style="margin-top:0.6rem"><strong>Open on YouTube for HD:</strong></p>
               <ul style="list-style:disc;padding-left:1.2em;margin-top:0.2rem">${ytLinks}</ul>`;
            modalOverlay.classList.add('active');
            return;
        }

        // Single-id case (1h cards): now also shows real prompt (per gpu/seed).
        const ytId = card.dataset.youtubeId || 'S3zpLIMOU4c';
        const onehPromptText = card.dataset.prompt || '';
        const onehPromptHtml = onehPromptText
            ? `<p class="modal-prompt">${escapeHtml(onehPromptText)}</p>`
            : '';
        modalVideoWrap.innerHTML =
          `<iframe
              src="https://www.youtube.com/embed/${encodeURIComponent(ytId)}?autoplay=1&rel=0&playsinline=1"
              frameborder="0" allowfullscreen
              allow="autoplay; encrypted-media; picture-in-picture"
              style="width:100%;height:100%;border:0;border-radius:10px;background:#000;"></iframe>`;
        modalText.innerHTML =
          `<h4>${escapeHtml(label)}</h4>
           ${onehPromptHtml}
           <p>YouTube embedded preview. Open the original on YouTube for HD playback.</p>
           <p><a href="https://www.youtube.com/watch?v=${encodeURIComponent(ytId)}" target="_blank" rel="noopener" class="text-blue-600 underline">↗ Open on YouTube</a></p>`;
        modalOverlay.classList.add('active');
    }

    function openComparePromptModal(block) {
        if (!modalOverlay || !block) return;
        const length = block.dataset.length;
        const caseId = block.dataset.case;
        const prompt = block.dataset.prompt || '';
        resetModalVideoWrap();
        const modalVideo = document.getElementById('prompt-modal-video');
        modalVideo.poster = `assets/posters/compare/${length}/${caseId}/ours.jpg`;
        modalVideo.src    = `videos/compare/${length}/${caseId}/ours.mp4`;
        modalVideo.play().catch(() => {});

        let bodyHtml = '';
        if (length === '60s' && block.dataset.multi) {
            try {
                const list = JSON.parse(block.dataset.multi);
                bodyHtml += `<p class="modal-multi-intro">Multi-prompt sequence (60 s · 6 segments):</p>`;
                list.forEach((p, i) => {
                    const t0 = i * 10, t1 = (i + 1) * 10;
                    bodyHtml += `<div class="seg"><span class="seg-tag">${t0}–${t1}s</span><div>${escapeHtml(p)}</div></div>`;
                });
            } catch (e) {
                bodyHtml = `<p>${escapeHtml(prompt)}</p>`;
            }
        } else {
            bodyHtml = `<p>${escapeHtml(prompt)}</p>`;
        }
        modalText.innerHTML =
          `<h4>${length} · ${caseId} · Echo-Infinity (Ours)</h4>
           ${bodyHtml}`;
        modalOverlay.classList.add('active');
    }

    // Click dispatcher
    document.addEventListener('click', (e) => {
        // 60s multi-prompt toggle (must be before .prompt closest test)
        const toggle = e.target.closest('.multi-prompt-toggle');
        if (toggle) {
            const card = toggle.closest('.video-card, .cmp-block');
            const list = card && card.querySelector('.multi-prompt-list');
            if (list) {
                const opened = list.classList.toggle('open');
                toggle.textContent = opened ? 'Hide prompts ▴' : 'Show all 6 prompts ▾';
            }
            e.stopPropagation();
            return;
        }

        // YouTube card (entire card OR its prompt)
        const ytCard = e.target.closest('.video-card.yt');
        if (ytCard) { openYouTubeModal(ytCard); return; }

        // Showcase prompt → showcase modal
        const showcasePrompt = e.target.closest('.video-card .prompt');
        if (showcasePrompt) {
            const card = showcasePrompt.closest('.video-card');
            if (card && !card.classList.contains('yt')) openShowcasePromptModal(card);
            return;
        }

        // Comparison row prompt → comparison modal
        const cmpPrompt = e.target.closest('.cmp-prompt');
        if (cmpPrompt) {
            const block = cmpPrompt.closest('.cmp-block');
            if (block) openComparePromptModal(block);
            return;
        }
    });

    if (modalClose)   modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) closeModal();
    });
});
