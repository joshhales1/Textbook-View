import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";

export default function Page(props: {imageUrl: string, noPage: boolean}) {

    const [loading, setLoading] = useState(false);

    console.log(props.noPage);

    useEffect(() => {
        setLoading(true);
    }, [props.imageUrl]);

    if (props.noPage)
        return null;

    return <div className="Page">
        <img src={props.imageUrl} style={{opacity: loading ? 0 : 1}} onLoad={() => {setLoading(false)}} />
        <CircularProgress style={{position: "absolute", display: loading ? "block" : "none"}}/>
    </div>;
}