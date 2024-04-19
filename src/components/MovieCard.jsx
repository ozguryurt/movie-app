import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = (props) => {
    return (
        <>
            <Link to={`/movies/${props.id}`}>
                <div className="movie-card">
                    <div className={`image lg:rounded-s rounded-t lg:w-2/12 w-full lg:min-h-full min-h-[25rem] bg-center lg:bg-contain bg-cover bg-no-repeat`} style={{
                        backgroundImage: `url('http://image.tmdb.org/t/p/w500/${props.posterPath}')`
                    }}>
                    </div>
                    <div className="lg:w-10/12 w-full flex flex-col justify-start lg:items-start items-center p-3 gap-3">
                        <p className="text-white lg:text-start text-center font-bold text-4xl">
                            {props.title} <span className="text-xs font-semibold">({String(props.avgPoint).slice(0, 3)})</span>
                        </p>
                        <p className="text-white lg:text-start text-center font-normal text-xs">
                            <b>Release Date:</b> {props.releaseDate}
                        </p>
                        <p className="text-white lg:text-start text-center font-normal text-sm">
                            {props.overview}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default MovieCard