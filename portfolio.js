(() => {
  const dialog = document.createElement('dialog');
  dialog.className = 'figure-dialog';
  dialog.setAttribute('aria-label', '模型结构与图表放大查看');
  dialog.innerHTML = '<div class="figure-dialog-header"><p></p><div class="figure-dialog-actions"><button class="figure-zoom" type="button">原图尺寸</button><button class="figure-close" type="button">关闭 ×</button></div></div><div class="figure-scroll"><img alt=""></div>';
  document.body.appendChild(dialog);
  const image = dialog.querySelector('img');
  const scroll = dialog.querySelector('.figure-scroll');
  const zoom = dialog.querySelector('.figure-zoom');
  document.querySelectorAll('.architecture-panel a,.pretrain-details a,.plot-grid a').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const original = link.querySelector('img') || link.closest('figure')?.querySelector('img');
      image.src = link.href;
      image.alt = original?.alt || '研究结构图';
      dialog.querySelector('p').textContent = image.alt;
      scroll.classList.remove('zoomed');
      zoom.textContent = '原图尺寸';
      dialog.showModal();
    });
  });
  dialog.querySelector('.figure-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  zoom.addEventListener('click', () => { const expanded = scroll.classList.toggle('zoomed'); zoom.textContent = expanded ? '适应窗口' : '原图尺寸'; });
  document.querySelectorAll('video').forEach(video => video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  }));
})();
