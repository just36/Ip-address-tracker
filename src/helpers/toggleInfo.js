export function toggleInfo() {
  const infoBlock = document.querySelector('.info');
  this.classList.toggle('info__close_toggle');
  infoBlock.classList.toggle('info_min');
}
