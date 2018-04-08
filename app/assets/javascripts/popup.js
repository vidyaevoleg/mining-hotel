// const popup = _('.pp');
// const paranja = _('.paranja');

function open(popup) {
  document.body.setAttribute('style', 'overflow: hidden');
  const paranja = z('.paranja');
  paranja.classList.remove('hidden');
  paranja.classList.add('visible');
  popup.classList.remove('hidden');
  popup.classList.add('visible');
}

function close(popup) {
  document.body.removeAttribute('style');
  const paranja = z('.paranja');
  paranja.classList.remove('visible');
  popup.classList.remove('visible');
  setTimeout(() => {
    paranja.classList.add('hidden');
    popup.classList.add('hidden');
  }, 210)
}


zz('.call-popup').forEach(btn => {
  if (!btn) return;
  btn.on('click', ev => {
    open(z('.pp'));
  })
})

z('.paranja') && z('.paranja').on('click', ev => close(z('.pp')));
z('.pp-close') && z('.pp-close').on('click', ev => close(z('.pp')));
