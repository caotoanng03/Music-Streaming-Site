import { Request, Response } from "express";
import Genre from "../../models/genre.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";

// [GET] /songs/:slugGenre
export const list = async (req: Request, res: Response): Promise<void> => {
    const genre = await Genre.findOne({
        slug: req.params.slugGenre,
        status: "active",
        deleted: false
    });

    if (!genre) {
        res.redirect("/genres");
        return;
    };

    const songs = await Song.find({
        topicId: genre.id,
        status: "active",
        deleted: "false"
    }).select("title avatar singerId like slug");

    for (const song of songs) {
        const singerInfo = await Singer.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        });

        song["singerInfo"] = singerInfo;
    };

    res.render("client/pages/songs/list", {
        pageTitle: genre.title,
        songs: songs
    });
}

// [GET] /songs/detail/:songSlug
export const detail = async (req: Request, res: Response): Promise<void> => {

    const song = await Song.findOne({
        slug: req.params.songSlug,
        status: "active",
        deleted: false
    });

    if (!song) {
        res.redirect(`back`);
        return;
    }

    const singer = await Singer.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName avatar");

    if (!singer) {
        res.redirect(`back`);
        return;
    }

    const genre = await Genre.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");

    let favoriteSong;

    if (res.locals.user) {
        favoriteSong = await FavoriteSong.findOne({
            // userId: "",
            userId: res.locals.user.id,
            songId: song.id
        });
    }

    song["isFavoriteSong"] = favoriteSong ? true : false;

    res.render("client/pages/songs/detail", {
        pageTitle: "Detail | " + song.title,
        song: song,
        singer: singer,
        genre: genre
    });
}

// [PATCH] /songs/like/:typeLike/:songId
export const like = async (req: Request, res: Response): Promise<void> => {
    const songId: string = req.params.songId;
    const typeLike: string = req.params.typeLike;

    const song = await Song.findOne({
        _id: songId,
        status: "active",
        deleted: false
    });

    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1

    await Song.updateOne({
        _id: songId
    }, { like: newLike });
    // like: ["id_user1"], ["id-user2"]

    res.json({
        code: 200,
        message: "Success",
        like: newLike
    });
}

// [PATCH] /songs/favorite/:favoriteType/:songId
export const favorite = async (req: Request, res: Response): Promise<void> => {
    if (!res.locals.user) {
        res.json({
            code: 400,
            message: "Unthorized user!"
        });
        return;
    }

    const songId: string = req.params.songId;
    const favoriteType: string = req.params.favoriteType;

    switch (favoriteType) {
        case "favorite":
            const existingFavSong = await FavoriteSong.findOne({
                songId: songId
            });

            if (!existingFavSong) {
                const newFavSong = new FavoriteSong({
                    // userId:
                    userId: res.locals.user.id,
                    songId: songId
                });
                await newFavSong.save();
            };

            break;

        case "unfavorite":
            await FavoriteSong.deleteOne({
                songId: songId
            });
            break;

        default:
            break;
    }

    res.json({
        code: 200,
        message: "Success"
    });
}

// [PATCH] /songs/listen/:songId
export const listen = async (req: Request, res: Response): Promise<void> => {
    const songId: string = req.params.songId;

    const song = await Song.findOne({ _id: songId });

    if (song) {
        const listen: number = song.listen + 1;

        await Song.updateOne({
            _id: songId
        }, { listen: listen });

        const newSong = await Song.findOne({
            _id: songId
        });

        res.json({
            code: 200,
            message: "Success!",
            listen: newSong.listen
        });
    };
};
