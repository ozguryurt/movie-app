import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const MovieDetail = () => {

    let { videoID } = useParams();

    const [movie, setMovie] = useState()

    useEffect(() => {
        getMovieDetail(videoID)
        getMovieVideos(videoID)
    }, [])

    const getMovieDetail = async (id) => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`)
        const resData = await data.json()
        setMovie(resData)
    }

    const getMovieVideos = async (id) => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}`)
        const resData = await data.json()
        setMovie(prevState => ({
            ...prevState,
            videos: resData.results
        }));
    }

    if (movie?.status_code == 34) return <NotFound />

    return (
        <>
            <div className="min-h-screen py-5 px-10 flex flex-col justify-start items-center gap-5 bg-zinc-800">
                <div className="flex lg:flex-row flex-col">
                    <img className='rounded lg:w-2/12 w-full' src={`http://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="" />
                    <div className="lg:w-10/12 w-full flex flex-col justify-start items-start p-3 gap-3">
                        <p className="text-white lg:text-start text-center font-bold text-4xl w-full">
                            {movie?.title} <span className="text-xs font-semibold">({String(movie?.vote_average).slice(0, 3)})</span>
                        </p>
                        {
                            movie?.homepage &&
                            <p className="text-white lg:text-start text-center font-normal text-xl w-full">
                                <Link to={movie?.homepage} target="_blank">{movie?.homepage.replaceAll("https://", "")}</Link>
                            </p>
                        }
                        <p className="text-white lg:text-start text-center font-normal text-lg w-full">
                            <b>Release Date:</b> {movie?.release_date}
                        </p>
                        <p className="text-white lg:text-start text-center font-normal text-lg w-full">
                            <b>Categories:</b> {movie?.genres?.map((genre, index) => <span>{genre.name} </span>)}
                        </p>
                        <p className="text-white lg:text-start text-center font-normal text-lg w-full">
                            {movie?.overview}
                        </p>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-5">
                    {
                        movie?.videos?.filter(video => video.type === "Trailer" && video.site === "YouTube")
                            .map((video, index) => (
                                <div key={index} className='w-full'>
                                    <iframe
                                        title={`Video ${video.id}`}
                                        src={`https://www.youtube.com/embed/${video.key.replaceAll("\"", "")}`}
                                        allowFullScreen
                                        className='rounded w-full min-h-[10rem] h-[75vw] max-h-[30rem]'
                                    ></iframe>
                                </div>
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default MovieDetail