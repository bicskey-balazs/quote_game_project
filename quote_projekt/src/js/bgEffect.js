const startGomb = document.querySelector("#timerBtn");
const rootDiv = document.querySelector("#personDiv");
// const bgOverlay = document.querySelector("#bgOverlay");
let stopMeditation = document.querySelector("#seged");

//nem kéne mindenhova berakni de mostmár mindegy
const timerInput1 = document.querySelector("#setTimer1");
const timerInput2 = document.querySelector("#setTimer2");
const timerInput3 = document.querySelector("#setTimer3");

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bgChange(kepUrl) {
    if (stopMeditation.innerHTML === "stop") {
        rootDiv.style.backgroundImage = "";
        return;
    }

    rootDiv.style.opacity = 0;
    await wait(500);

    rootDiv.style.backgroundImage = `url("src/kepek/person/${kepUrl}")`;

    await wait(50);
    rootDiv.style.opacity = 1;

    await wait(9500);
}

startGomb.addEventListener("click", async () => {
    let timerValue = (Number(timerInput1.value)*3600) + (Number(timerInput2.value)*60) + Number(timerInput3.value );
    if(timerValue <= 60) return;
    //majd ki kell számolni
    for(let i = 0; i < Math.floor(timerValue/10); i++){
        if(stopMeditation.innerHTML == "stop") break;
        for (const filename of imageFilenames) {
            if(stopMeditation.innerHTML == "stop") break;
            await bgChange(filename);
        }
    }
});
//nagyon favágó de máshogy nem engedi
const imageFilenames = [
  "20davis-lqpf-articleLarge-v2.webp",
  "360_F_562252718_OGtw1RkPlWIPghxdYtLXgpHSc9BHWzdM.jpg",
  "360_F_599857538_IlVjNLZgp7WWNy0nzkbJJWuLAD7y0i6E.jpg",
  "360_F_779591142_8xvs9q3poGghd2KZdwvqrctw144fP4ai.jpg",
  "48323.avif",
  "5a5bee79-ef2f-4c1d-b26f-e0cc5313b976.avif",
  "646889.jpg",
  "7713fde4d2dad2891b1f2114c8ddf35e.jpg",
  "923127.jpg",
  "987243-1920x1080-desktop-full-hd-stephen-hawking-wallpaper-image.jpg",
  "988fa23c-0001-0004-0000-000001091224_w520_r0.6730769230769231_fpx44.97_fpy65.24.jpg",
  "a-close-up-portrait-of-an-old-kung-fu-master-with-a-long-white-beard-and-piercing-eyes-photo.jpeg",
  "Andrew-Tate-(1)1672385156-0.png",
  "Collage-Maker-08-Aug-2022-0631-AM.avif",
  "desktop-wallpaper-75-poor-man-working-man-thumbnail.jpg",
  "desktop-wallpaper-best-old-man-·-old-person-thumbnail.jpg",
  "fantasy-old-man-artist-asian-hd-wallpaper-preview.jpg",
  "filelist.txt",
  "gandalf-4k-lord-of-the-rings-9qgp66jbe10rnigk.jpg",
  "God-Of-War-PS4-4K-Wallpaper-2.jpg",
  "hq720.jpg",
  "images (1).jpg",
  "images (2).jpg",
  "images (4).jpg",
  "images.jpg",
  "istockphoto-179060734-612x612.jpg",
  "laugh-old-man-224x300.webp",
  "old-man-portrait-street-man.jpg",
  "old_guy_400x400.jpg",
  "portrait-shaolin-monk-kung-fu-260nw-2202953609.webp",
  "portrait-stoic-marcus-aurelius-black-white-film-grain-highly-detailed-masterpiece_1097265-29435.avif",
  "sadhguru-intertwining-his-fingers-t0glt8st69bmwls9.webp",
  "soos_gabor_90c5eb0b76.webp",
  "topless-disabled-old-man-eating-park-alone-no-shirt-sitting-his-wheelchair-his-lunch-very-sunny-day-52712702.webp",
  "wp12565070.jpg"
];