// Dropdown profile
const profileImage = document.querySelector('.inner-menu>ul>.user-pic');
if (profileImage) {
    const subMenu = document.querySelector('.sub-menu-wrap');

    profileImage.addEventListener('click', () => {
        subMenu.classList.toggle('open-sub-menu');
    });
}
// End Dropdown profile

// APlayer
const aplayer = document.getElementById("aplayer");
if (aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        lrcType: 1,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSinger.avatar,
            lrc: dataSong.lyrics
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

    ap.on("ended", () => {
        const link = `/songs/listen/${dataSong._id}`;

        const option = {
            method: "PATCH"
        };

        fetch(link, option)
            .then(res => res.json())
            .then(data => {
                if (data.code == 200) {
                    const listenElem = document.querySelector(".inner-listen span");
                    listenElem.innerHTML = `${data.listen} streams`;
                }
            });
    });
};
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
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite) {
    listButtonFavorite.forEach(buttonFavorite => {
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
    });
};
// End Button Favorite

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {

    const input = boxSearch.querySelector("input[name='keyword']");
    const boxSuggest = boxSearch.querySelector(".inner-suggest");

    input.addEventListener(
        "input",
        _.debounce(() => {
            const keyword = input.value;

            const link = `/search/suggest?keyword=${keyword}`;

            fetch(link)
                .then(res => res.json())
                .then(data => {
                    const songs = data.songs;

                    if (songs.length > 0) {
                        boxSuggest.classList.add("show");

                        const htmls = songs.map(song => {
                            return `
                                <a class="inner-item" href="/songs/detail/${song.slug}">
                                    <div class="inner-image"><img src="${song.avatar}" /></div>
                                    <div class="inner-info">
                                        <div class="inner-title">${song.title}</div>
                                        <div class="inner-singer"><i class="fa-solid fa-microphone-lines"></i> ${song.singerInfo.fullName}</div>
                                    </div>
                                </a>
                            `;
                        });

                        const boxList = boxSuggest.querySelector(".inner-list");
                        boxList.innerHTML = htmls.join("");
                    } else {
                        boxSuggest.classList.remove("show");
                    }
                });
        }, 300)
    );
};
// End Search Suggest

// Show alert
const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
    const time = parseInt(showAlert.getAttribute('date-time')) || 3000;
    const closetAlert = showAlert.querySelector('[close-alert]');

    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    closetAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
};
// End Show alert
