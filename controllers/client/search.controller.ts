import { Request, Response } from "express"
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

// [GET] /search/:type
export const result = async (req: Request, res: Response): Promise<void> => {
    const type: string = req.params.type;
    const keyword: string = `${req.query.keyword}`;

    let searchedSongs = [];

    if(keyword) {
        const keywordRegex = new RegExp(keyword, "i");

        // convert sang slug không dấu và thêm dấu "-"
        const formattedSlug = convertToSlug(keyword);
        const formattedSlugRegex = new RegExp(formattedSlug, "i");

        const songs = await Song.find({
            $or: [
                { title: keywordRegex },
                { slug: formattedSlugRegex }
            ]
        }).select("-lyrics -description");

        for (const item of songs) {
            const singerInfo = await Singer.findOne({
                _id: item.singerId,
                status: "active",
                deleted: false
            });

            // item["singerInfo"] = singerInfo;
            searchedSongs.push({
                id: item.id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                singerInfo: {
                    fullName: singerInfo.fullName
                }
            });
        };   
        
        // searchedSongs = songs;
    }

    switch(type) {
        case "result":
            res.render("client/pages/search/result", {
                pageTitle: `Kết quả: ${keyword}`,
                keyword: keyword,
                songs: searchedSongs
            })
            break;
        case "suggest":
            res.json({
                code: 200,
                message: "Success!",
                songs: searchedSongs
            });
            break;
        default:
            break;
    }
}