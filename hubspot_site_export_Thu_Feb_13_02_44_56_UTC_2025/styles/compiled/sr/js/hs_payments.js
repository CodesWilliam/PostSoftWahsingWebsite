const hsOverlay=overlay=>{const uniqueModuleId=overlay.getAttribute("data-instance"),numericModuleId=uniqueModuleId.replace("widget_",""),overlayDisabled="true"===overlay.getAttribute("data-disabled"),hash=`#checkout-${numericModuleId}`,openButton=document.querySelector(`.button__open-overlay-${uniqueModuleId}`),closeButton=overlay.querySelector(".hs-overlay__close--top"),bottomCloseButton=overlay.querySelector(".hs-overlay__close--bottom"),overlayBackground=document.querySelector(`.hs-overlay-background[data-instance="${uniqueModuleId}"]`),iframe=overlay.querySelector(".payments-iframe-container iframe");function handleCloseButtonClick(e){"Tab"===e.key&&e.shiftKey&&(e.preventDefault(),bottomCloseButton.focus())}function handleBottomCloseButtonClick(e){"Tab"===e.key&&(e.preventDefault(),e.shiftKey?iframe.focus():closeButton.focus())}function handleOverlayBackgroundClick(){window.history.back()}function openOverlay(){overlay.addEventListener("transitionend",(function endTransition(){overlay.removeEventListener("transitionend",endTransition),iframe.focus()})),closeButton.addEventListener("keydown",handleCloseButtonClick),bottomCloseButton.addEventListener("keydown",handleBottomCloseButtonClick),overlayBackground.addEventListener("click",handleOverlayBackgroundClick),document.documentElement.classList.add("hs-payments--overlay-open"),overlay.classList.add("open"),overlayBackground.classList.add("open")}overlayDisabled||(overlay.removeAttribute("style"),overlayBackground.removeAttribute("style"),openButton.addEventListener("click",(()=>{window.history.pushState(null,"",window.location.href+hash),openOverlay()})),closeButton.addEventListener("click",(()=>{window.history.back()})),bottomCloseButton.addEventListener("click",(()=>{window.history.back()})),window.addEventListener("popstate",(e=>{hash===e.target.location.hash?openOverlay():overlay.classList.contains("open")&&(overlay.addEventListener("transitionend",(function endTransition(){document.documentElement.classList.remove("hs-payments--overlay-open"),overlay.removeEventListener("transitionend",endTransition),openButton.focus()})),closeButton.removeEventListener("keydown",handleCloseButtonClick),bottomCloseButton.removeEventListener("keydown",handleBottomCloseButtonClick),overlayBackground.removeEventListener("click",handleOverlayBackgroundClick),overlay.classList.remove("open"),overlayBackground.classList.remove("open"))})),window.location.hash&&window.location.hash===hash&&setTimeout((()=>{const originalUrl=window.location.href,originalUrlWithoutHash=originalUrl.replace(window.location.hash,"");window.history.replaceState(null,"",originalUrlWithoutHash),window.history.pushState(null,"",originalUrl),openOverlay()}),500))};document.addEventListener("DOMContentLoaded",(()=>{Array.from(document.querySelectorAll(".hs-overlay")).forEach((overlay=>hsOverlay(overlay)))}));
//# sourceURL=https://46181478.fs1.hubspotusercontent-na1.net/hub/46181478/hub_generated/template_assets/183865510837/1734142795469/sr/js/hs_payments.js