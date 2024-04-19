import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen py-5 px-10 flex flex-col justify-center items-center gap-5 bg-zinc-800">
        <span className="text-white text-center font-bold text-4xl">
          The movie you are looking for is not found.
        </span>
        <Link to={'/'} className="text-white bg-zinc-700 rounded p-2">Take me home</Link>
      </div>
    </>
  )
}

export default NotFound