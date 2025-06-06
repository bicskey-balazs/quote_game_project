const loadMainBtn = document.querySelector("#loadMainBtn");
const rootDiv = document.querySelector("#rootDiv");
const bgmusic = document.querySelector("#bgmusic")

// document.addEventListener("click", () => {
//     const bgmusic = document.querySelector("#bgmusic");
//     bgmusic.play()
//     bgmusic.volume = 0.6
// })

loadMainBtn.addEventListener("click", async() => {
    const response = await fetch("meditation.html");
    const resHtml = await response.text();
    rootDiv.innerHTML = resHtml;

    const scripts = [
      "/src/js/main.js",
      "/src/js/timer.js",
      "src/js/bgEffect.js"
    ];

    for (const src of scripts) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = src;
      document.body.appendChild(script);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "src/meditation.css";
    document.head.appendChild(link);
  
    const links = document.querySelectorAll('link[rel="stylesheet"]');

    links.forEach(link => {
    if (link.href.includes('styles.css') || link.href.includes('zen.css')) {
        link.remove();
    }
    });

    const bgmusic = document.querySelector("#bgmusic");
    bgmusic.play()
    bgmusic.volume = 0.6
})

