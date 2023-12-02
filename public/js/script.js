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
// End APlayer

// Button Like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
    buttonLike.addEventListener("click", () => {
        const songId = buttonLike.getAttribute("button-like");
        const isActive = buttonLike.classList.contains("active");

        const typeLike = isActive ? "dislike" : "like";

        const link = `/songs/like/${typeLike}/${songId}`;

        const option = {
            method: "PATCH"
        };

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const span = buttonLike.querySelector("span");
                    span.innerHTML = `${data.like} Like`;

                    buttonLike.classList.toggle("active");
                }
            })
    });
}
// End Button Like

// Button Favorite
const buttonFavorite = document.querySelector("[button-favorite]");
if (buttonFavorite) {
    buttonFavorite.addEventListener("click", () => {
        const songId = buttonFavorite.getAttribute("button-favorite");
        const isActive = buttonFavorite.classList.contains("active");

        const favoriteType = isActive ? "unfavorite" : "favorite";

        const link = `/songs/favorite/${favoriteType}/${songId}`;

        const option = {
            method: "PATCH"
        };

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    buttonFavorite.classList.toggle("active");
                }
            });
    });
};
// End Button Favorite