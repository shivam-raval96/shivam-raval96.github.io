// loadContent.js
function loadContent(containerId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (window.MathJax) {
                MathJax.typesetPromise([document.getElementById(containerId)])
                    .catch((err) => console.error('Error typesetting MathJax:', err));
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

// Load the content into the placeholders
loadContent('intro', 'intro.html');