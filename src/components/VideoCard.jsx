import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
    demoThumbnailUrl,
    demoVideoUrl,
    demoVideoTitle,
    demoChannelUrl,
    demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
    video: {
        id: { videoId },
        snippet,
    },
}) => {
    return (
        <Card
            sx={{
                width: { xs: "100%", sm: "230px", md: "260px" },
                boxShadow: "none",
                borderRadius: 0,
            }}
        >
            <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                <CardMedia
                    image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                    alt={snippet?.title}
                    sx={{
                        minWidth: 358,
                        width: { xs: "100%", sm: "230px", md: "260px" },
                        height: 150,
                        objectFit: "cover",
                    }}
                />
            </Link>
            <CardContent
                sx={{
                    backgroundColor: "#1e1e1e",
                    height: "95px",
                }}
            >
                <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
                    <Typography
                        varient="subtitle1"
                        fontWeight="bold"
                        color="#fff"
                    >
                        {snippet?.title.slice(0, 60) ||
                            demoVideoTitle.slice(0, 60)}
                    </Typography>
                </Link>
                <Link
                    to={
                        snippet?.channelId
                            ? `/channel/${snippet?.channelId}`
                            : demoChannelUrl
                    }
                >
                    <Typography
                        varient="subtitle2"
                        fontWeight="bold"
                        color="gray"
                    >
                        {snippet?.channelTitle.slice(0, 60) ||
                            demoChannelTitle.slice(0, 60)}
                        <CheckCircle
                            sx={{
                                fontSize: 12,
                                color: "gray",
                                ml: "5px",
                            }}
                        ></CheckCircle>
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
