function onBodyResize (e) {
  if (window.innerWidth <= 990) {
    window.isMobile = true;
  } else {
    window.isMobile = (
      /Mobi/i.test(navigator.userAgent) ||
      /Anroid/i.test(navigator.userAgent) ||
      /Mobile/i.test(navigator.userAgent)
    )
  }
}