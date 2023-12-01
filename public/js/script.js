// APlayer
const aplayer = document.getElementById("aplayer");
if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSinger.avatar
        }],
        autoplay: true,
        volumn: 0.8
    });


    const avatar = document.querySelector(".singer-detail .inner-avatar");

    ap.on("play", function () {
        avatar.style.animationPlayState = "running";
    });

    ap.on("pause", function () {
        avatar.style.animationPlayState = "paused";
    });
}