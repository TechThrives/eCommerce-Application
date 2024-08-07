function hideBackdrop() {
  var backdrop = document.getElementById("backdrop");
  if (backdrop) {
    document.body.removeChild(backdrop);
    document.body.style.overflow = null;
    document.body.style.paddingRight = null;
  }
}

function showBackdrop() {
  const html = document.getElementsByTagName("html")[0];
  const backdrop = document.createElement("div");
  backdrop.id = "backdrop";
  backdrop.classList =
    "transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50";
  document.body.appendChild(backdrop);

  if (document.getElementsByTagName("html")[0]) {
    document.body.style.overflow = "hidden";
    if (window.innerWidth > 1140) {
      document.body.style.paddingRight = "17px";
    }
  }

  backdrop.addEventListener("click", function (e) {
    html.classList.remove("sidebar-open");
    html.classList.remove("profile-open");
    hideBackdrop();
  });
}

export function handleClick() {
  const html = document.getElementsByTagName("html")[0];
  var view = html.getAttribute("data-sidebar-view");

  if (view === "mobile") {
    showBackdrop();
    html.classList.toggle("sidebar-open");
  } else {
    if (view === "hidden") {
      html.setAttribute("data-sidebar-view", "default");
    } else {
      html.setAttribute("data-sidebar-view", "hidden");
    }
  }
}

export function handleRightMenuClick() {
  const html = document.getElementsByTagName("html")[0];
  var view = html.getAttribute("data-profile-view");

  if (view === "mobile") {
    showBackdrop();
    html.classList.toggle("profile-open");
  } else {
    if (view === "hidden") {
      html.setAttribute("data-profile-view", "default");
    } else {
      html.setAttribute("data-profile-view", "hidden");
    }
  }
}

export function handleFullScreenClick(e) {
  e.preventDefault();
  document.body.classList.toggle("fullscreen-enable");
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

export class Config {
  adjustLayout() {
    const html = document.getElementsByTagName("html")[0];
    html.setAttribute(
      "data-sidebar-view",
      window.innerWidth <= 1024 ? "mobile" : "default"
    );
    html.setAttribute(
      "data-profile-view",
      window.innerWidth <= 1024 ? "mobile" : "default"
    );
    if (window.innerWidth > 1024) {
      html.classList.remove("sidebar-open");
      html.classList.remove("profile-open");
      hideBackdrop();
    }
  }

  initWindowSize() {
    window.addEventListener("resize", () => this.adjustLayout());
  }

  init() {
    this.adjustLayout();
    this.initWindowSize();
  }
}
