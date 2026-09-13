(() => {
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

  // Copy buttons for ordinary and titled code blocks.
  qsa('pre').forEach((pre) => {
    if (pre.closest('.mermaid')) return;
    const code = pre.querySelector('code');
    if (!code) return;
    const wrap = pre.parentElement;
    if (wrap && wrap.querySelector(':scope > .copy-code')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'copy';
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(code.innerText);
      button.textContent = 'copied';
      setTimeout(() => button.textContent = 'copy', 1200);
    });
    (wrap || pre).appendChild(button);
  });

  // Automatic equation numbering + references.
  const eqMap = new Map();
  qsa('.equation-block').forEach((block, idx) => {
    const n = idx + 1;
    block.dataset.eqNumber = n;
    const number = block.querySelector('.equation-number');
    if (number) number.textContent = `(${n})`;
    if (block.dataset.eqId) eqMap.set(block.dataset.eqId, n);
  });
  qsa('[data-eqref]').forEach((ref) => {
    const n = eqMap.get(ref.dataset.eqref);
    if (n) ref.textContent = `Eq. (${n})`;
  });

  // Explicitly controlled technical animation; no autoplay.
  qsa('.pipeline-demo').forEach((demo) => {
    const token = demo.querySelector('.pipeline-token');
    const status = demo.querySelector('.demo-status');
    const play = demo.querySelector('[data-action="play"]');
    const reset = demo.querySelector('[data-action="reset"]');
    const xs = [0, 175, 350, 525, 700];
    let timer = null;
    let stage = 0;

    function show(i) {
      stage = i;
      token.style.transform = `translateX(${xs[i]}px)`;
      status.textContent = `cycle ${i}`;
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
      play.disabled = false;
    }
    play.addEventListener('click', () => {
      stop();
      show(0);
      play.disabled = true;
      timer = setInterval(() => {
        if (stage >= xs.length - 1) { stop(); return; }
        show(stage + 1);
      }, 720);
    });
    reset.addEventListener('click', () => { stop(); show(0); });
    show(0);
  });
})();
