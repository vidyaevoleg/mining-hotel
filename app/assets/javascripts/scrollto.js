function smoothScrollTo(to, duration) {
  if (!duration) return;
  const currentScroll = window.scrollY
  const diff = to - currentScroll;
  const perTick = diff / duration * 10;
  setTimeout(() => {
    window.scrollTo(0, currentScroll + perTick);
    const bottomOffset = document.body.clientHeight - window.scrollY - window.innerHeight;
    if (window.scrollY === to || (to > window.scrollY && bottomOffset === 0)) {
      return;
    }
    smoothScrollTo(to, duration - 10);
  }, 10);
}


document.addEventListener("DOMContentLoaded", function() {
  zz('.header-nav-item a').forEach(link => {
    if (!z('section#' + link.dataset.to)) return;
    link.on('click', ev => {
      // ev.preventDefault();
      smoothScrollTo(
        z('section#' + ev.target.dataset.to).offsetTop - 70
      , 300);
      // close all popups
      // close(_('.popup'));
      // close sidebar
      // const sb = _('#sidebar');
      // sb.classList.remove('opened');
      // _('button#open-sidebar').classList.remove('hidden');
      // _('button#close-sidebar').classList.add('hidden');
      // setTimeout(() => {
      //   sb.classList.add('hidden');
      // }, 210)
    });
  });

  // initial scroll
  if (window.location.hash) {
    const target = window.location.hash.replace('#', '');
    if (['features', 'calc', 'steps'].includes(target)) {
      const domTarget = z('section#' + target);
      if (domTarget) {
        smoothScrollTo(
          domTarget.offsetTop - 70
        , 300);
      }
    }
  }
});
