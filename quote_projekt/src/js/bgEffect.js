const startGomb = document.querySelector("#timerBtn");
const rootDiv = document.querySelector("#rootDiv");
const bgOverlay = document.querySelector("#bgOverlay");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bgChange(kepUrl) {
  // Step 1: Set new background image on overlay
  bgOverlay.style.backgroundImage = `url("src/kepek/${kepUrl}")`;
  bgOverlay.style.opacity = "1"; // Start fade-in

  await wait(1000); // Wait for fade-in to complete

  // Step 2: Set new image to main container, then fade out overlay
  rootDiv.style.backgroundImage = `url("src/kepek/${kepUrl}")`;
  bgOverlay.style.opacity = "0"; // Fade overlay out

  await wait(9000); // Show image for 9 seconds (total = 10)
}

startGomb.addEventListener("click", async () => {
  for (const filename of imageFilenames) {
    await bgChange(filename);
  }
});
//nagyon favágó de máshogy nem engedi
const imageFilenames = [
  "1000_F_692673858_nAWgv8ZDktsBbULkdTow9QJP4C3GLq5K.jpg",
  "1000_F_772947440_yGlYK5dbBweJTI53o5jOpMIk3YzyC4f9.jpg",
  "1000_F_802037262_0Z42iWc0xZNZzvzgzGqbR7mIsFvY0k3t.jpg",
  "1221284.jpg",
  "20davis-lqpf-articleLarge-v2.webp",
  "360_F_562252718_OGtw1RkPlWIPghxdYtLXgpHSc9BHWzdM.jpg",
  "360_F_599857538_IlVjNLZgp7WWNy0nzkbJJWuLAD7y0i6E.jpg",
  "360_F_779591142_8xvs9q3poGghd2KZdwvqrctw144fP4ai.jpg",
  "48323.avif",
  "4k-Serene-Nature-Torii-Arch-4K-Wallpaper.jpg",
  "5a5bee79-ef2f-4c1d-b26f-e0cc5313b976.avif",
  "646889.jpg",
  "6be8b455d84fd96a668fb5dd4c0771e1.jpg",
  "7713fde4d2dad2891b1f2114c8ddf35e.jpg",
  "923127.jpg",
  "987243-1920x1080-desktop-full-hd-stephen-hawking-wallpaper-image.jpg",
  "988fa23c-0001-0004-0000-000001091224_w520_r0.6730769230769231_fpx44.97_fpy65.24.jpg",
  "a-close-up-portrait-of-an-old-kung-fu-master-with-a-long-white-beard-and-piercing-eyes-photo.jpeg",
  "Andrew-Tate-(1)1672385156-0.png",
  "Collage-Maker-08-Aug-2022-0631-AM.avif",
  "cws5grxz64m91.jpg",
  "desktop-wallpaper-75-poor-man-working-man-thumbnail.jpg",
  "desktop-wallpaper-best-old-man-·-old-person-thumbnail.jpg",
  "fantasy-old-man-artist-asian-hd-wallpaper-preview.jpg",
  "filelist.txt",
  "fish-yin-and-yang-symbols-zen-koi-wallpaper-preview.jpg",
  "flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  "gandalf-4k-lord-of-the-rings-9qgp66jbe10rnigk.jpg",
  "God-Of-War-PS4-4K-Wallpaper-2.jpg",
  "green-terraced-fields-4k-3840x2160-by-a-i-v0-oo5faayeyy1b1.webp",
  "hq720.jpg",
  "images (1).jpg",
  "images (2).jpg",
  "images (3).jpg",
  "images (4).jpg",
  "images (5).jpg",
  "images.jpg",
  "iSpazio-15-768x1662.jpg",
  "istockphoto-179060734-612x612.jpg",
  "kung_fu_panda_4_po_zen-wallpaper-3840x2160.jpg",
  "laugh-old-man-224x300.webp",
  "maxresdefault.jpg",
  "old-man-portrait-street-man.jpg",
  "old_guy_400x400.jpg",
  "portrait-shaolin-monk-kung-fu-260nw-2202953609.webp",
  "portrait-stoic-marcus-aurelius-black-white-film-grain-highly-detailed-masterpiece_1097265-29435.avif",
  "sadhguru-intertwining-his-fingers-t0glt8st69bmwls9.webp",
  "samurai-in-front-of-torii-gate-wallpaper-1920x1440_25.jpg",
  "soos_gabor_90c5eb0b76.webp",
  "topless-disabled-old-man-eating-park-alone-no-shirt-sitting-his-wheelchair-his-lunch-very-sunny-day-52712702.webp",
  "wp12565070.jpg",
  "yin-yang-4k-358y77zythfnsrqt.jpg",
  "yin-yang-koi-digital-art-uhdpaper.com-4K-8.3220-wp.thumbnail.jpg"
];