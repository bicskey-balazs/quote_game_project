const loadMainBtn = document.querySelector("#loadMainBtn");
const rootDiv = document.querySelector("#rootDiv");

loadMainBtn.addEventListener("click", async() => {
    const response = await fetch("meditation.html");
    const resHtml = await response.text();
    rootDiv.innerHTML = resHtml;

    const scripts = [
      "/src/js/main.js",
      "/src/js/timer.js"
    ];

    for (const src of scripts) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = src;
      document.body.appendChild(script);
    }
})