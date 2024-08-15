import "./Detalle.css"
import NotFound from "../NotFound";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detalle() {
    const [video, setVideo] = useState([])

    const parametros = useParams()
    useEffect(() => {
        fetch(`http://localhost:5000/videos?id=${parametros.id}`)
            .then(response => response.json())
            .then(data => {
                setVideo(...data)
            })
    }, [])

    //const video = videos.find(video=> video.id === Number(parametros.id))
    if (!video) return <NotFound />
    return (
        <>
        <div className="back">
            <div className="text">
                <h1 className="texto">{video.descripcion}</h1>
            </div>
            <section className="container">
                <iframe width="100%" height="100%"
                    src={video.url}
                    title={video.titulo}
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

            </section>
        </div>
        </>
    )
}

export default Detalle;