import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'



function Navbar() {
  const location = useLocation()
  const history = useNavigate()

  useEffect(() => {
    console.log(location.pathname)
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    history('/login')
  }
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""} `} to="/home">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? <form className="form-inline my-2 my-lg-0">
            <Link className="btn btn-outline-info mx-1 my-2 my-sm-0" to='/login' role="button">Login</Link>
            <Link className="btn btn-outline-info mx-1 my-2 my-sm-0" to='/signup' role="button">Signup</Link>
          </form> : <button className="btn btn-outline-info" onClick={handleLogout} >Logout</button>}
        </div>
      </nav> */}




      <header class="text-gray-600 body-font" data-aos='fade-down'>
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg onClick={() => window.location.reload(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-linecap="round" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white p-2 bg-pink-500 rounded-full">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <Link class="ml-3 text-xl" to='/' >Boot Notes</Link>
          </a>
          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link class="mr-5 hover:text-gray-900  " to='/notes' >Get your Notes</Link>
            <Link class="mr-5 hover:text-gray-900" to='/about' >About Us</Link>
          </nav>
          {!localStorage.getItem('token') ?
            <div>
              <Link to='/login'>
                <button class=" mx-3 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Login
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </Link>
              <Link to='/signup'>
                <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Signup
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </button>
              </Link>
            </div> : <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleLogout} >Logout</button>}
        </div>
      </header>
    </>
  )
}

export default Navbar