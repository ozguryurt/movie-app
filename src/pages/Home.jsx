import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

function Home() {

  const [movies, setMovies] = useState()

  useEffect(() => {
    getMovies()
  }, [])

  const getMovies = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
    const resData = await data.json()
    setMovies(resData.results)
  }

  const searchMovie = async (e) => {
    if (e.target.value.length > 0) {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${e.target.value}&api_key=${import.meta.env.VITE_API_KEY}`)
      const resData = await data.json()
      setMovies(resData.results)
    } else {
      getMovies()
    }
  }

  return (
    <>
      <div className="min-h-screen py-5 px-10 flex flex-col justify-start items-center gap-5 bg-zinc-800">
        <p className="text-white font-bold text-center text-4xl">
          POPULAR MOVIES
        </p>
        <div className="search-wrapper">
          <input onChange={searchMovie} type="text" placeholder='Search a movie' />
        </div>
        <div className="w-full grid grid-cols-1 gap-5">
          {
            movies?.map((movie, index) => {
              return <MovieCard
                id={movie?.id}
                key={index}
                title={movie?.title || movie?.name}
                releaseDate={movie?.release_date || movie?.first_air_date}
                overview={movie?.overview}
                avgPoint={movie?.vote_average}
                posterPath={movie?.poster_path} />
            })
          }
        </div>
      </div>
    </>
  )
}
export default Home