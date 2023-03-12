window.onscroll = () => { popover.classList.contains('show') ? popover.classList.remove('show') : null };
  
function generalCssSettings() {
  usersBlock.style.minHeight = window.innerHeight-48-mainNav.offsetHeight + 'px';
}

generalCssSettings();