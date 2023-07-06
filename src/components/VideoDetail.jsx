import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
            setVideoDetail(data.items[0])
        );
        fetchFromAPI(
            `search?part=snippet&realatedToVideoId=${id}&type=video`
        ).then((data) => setVideos(data.items));
    }, [id]);
    if (!videoDetail?.snippet) return "Loading...";
    const {
        snippet: { title, channelId, channelTitle },
        statistics: { viewCount, likeCount },
    } = videoDetail;
    return (
        <Box minHeight="95vh" width={{ sm: "100%", md: "90%" }} margin="auto">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box
                        sx={{
                            width: "100%",
                            position: "sticky",
                            top: "86px",
                        }}
                    >
                        <ReactPlayer
                            controls
                            className="react-player"
                            url={`https://www.youtube.com/watch?v=${id}`}
                        />
                        <Typography
                            color="#fff"
                            fontWeight="bold"
                            variant="h5"
                            p={2}
                        >
                            {title}
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ color: "#fff" }}
                            py={1}
                            px={2}
                        >
                            <Link to={`/channel/${channelId}`}>
                                <Typography
                                    varient={{ sm: "subtitle", md: "h6" }}
                                    color="#fff"
                                >
                                    {channelTitle}
                                    <CheckCircle
                                        sx={{
                                            fontSize: "12px",
                                            color: "gray",
                                            ml: "5px",
                                        }}
                                    />
                                </Typography>
                            </Link>
                            <Stack
                                direction="row"
                                gap={2}
                                sx={{ alignItems: "center" }}
                            >
                                <Typography
                                    varient="body1"
                                    sx={{ opacity: 0.7 }}
                                >
                                    {parseInt(viewCount).toLocaleString()} Views
                                </Typography>
                                <Typography
                                    varient="body1"
                                    sx={{ opacity: 0.7 }}
                                >
                                    {parseInt(likeCount).toLocaleString()} Likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box
                    px={2}
                    py={{ md: 1, xs: 5 }}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography
                        my={1}
                        color="#fff"
                        variant="h6"
                        fontWeight="bold"
                    >
                        <span style={{ color: "#F31503" }}>Related</span> Videos
                    </Typography>
                    <Videos videos={videos} direction="column" />
                </Box>
            </Stack>
        </Box>
    );
};

export default VideoDetail;
