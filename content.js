const styleTag = document.createElement("style");
const styleContents = document.createTextNode(`
ytd-mini-guide-entry-renderer[aria-label="Shorts"],
ytd-rich-section-renderer,
ytd-reel-shelf-renderer ,
[title="Shorts"]  {
     display: none; 
    }
`);
styleTag.appendChild(styleContents);
document.body.prepend(styleTag);

function removeUIElements() {
  const shortsButton = document.querySelector(
    'ytd-mini-guide-entry-renderer[aria-label="Shorts"]'
  );
  if (shortsButton) {
    shortsButton.remove();
  }

  const carousels = document.querySelectorAll(
    "ytd-rich-section-renderer, ytd-reel-shelf-renderer"
  );
  carousels.forEach((carousel) => {
    carousel.remove();
  });

  const otherShortsButtons = document.querySelectorAll('[title="Shorts"]');
  otherShortsButtons.forEach((node) => node.remove());
}

removeUIElements();

const observer = new MutationObserver((mutations) => {
  let shouldRemoveElements = false;
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldRemoveElements = true;
      break;
    }
  }

  if (shouldRemoveElements) {
    removeUIElements();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
