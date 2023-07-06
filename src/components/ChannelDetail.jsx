import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
    const { id } = useParams();
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
            setChannelDetail(data.items[0])
        );
        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
            (data) => setVideos(data.items)
        );
    }, [id]);
    return (
        <Box minHeight="90vh">
            <Box>
                <div
                    style={{
                        background: `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(117,117,204,1) 43%, rgba(0,212,255,1) 100%)`,
                        zIndex: 10,
                        height: "250px",
                    }}
                />
                <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
            </Box>
            <Box display="flex" p="2">
                <Box sx={{ mr: { sm: "100px" } }} />
                <Videos sx={{ width: { xs: "300px" } }} videos={videos} />
            </Box>
        </Box>
    );
};

export default ChannelDetail;
