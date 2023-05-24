import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Login() {
    const [credentials, setCredentials] = useState({ email: '', Password: '' })
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, Password: credentials.Password }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect it
            localStorage.setItem('token', json.JWT_DataToken)
            history("/notes")
        }
        else {
            alert('Wrong Credentials')
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* <div id='GFG' className="container my-3 col-md-5 " >
                <form onSubmit={handleSubmit}>
                    <div class="form-group ">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} value={credentials.email} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="password" class="form-control" id="Password" name='Password' placeholder="Password" onChange={onchange} value={credentials.Password} />
                    </div>
                    <button type="submit" class="btn btn-primary my-2">Submit</button>
                </form>
            </div> */}


            <section class="text-gray-600 body-font" >
                <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0" data-aos='slide-right'>
                        <h1 class="title-font font-medium text-3xl text-gray-900 mb-10 ">Boot Notes - Login</h1>
                        <p class="leading-relaxed mt-4">Welcome to Boot Notes, your go-to platform for creating, reading, updating, and deleting notes! Please log in to access your account and start organizing your thoughts.</p>
                    </div>
                    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0" data-aos='zoom-in'>
                        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
                        <form  >
                            <div class="relative mb-4">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} value={credentials.email} />
                            </div>
                            <div class="relative mb-4">
                                <label for="Password">Password</label>
                                <input type="password" class="form-control form-control w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="Password" name='Password' placeholder="Password" onChange={onchange} value={credentials.Password} />
                            </div>
                            <button onClick={handleSubmit} className='text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg'>Login</button>
                        </form>
                        <p class="text-xs text-gray-500 mt-3">Our platform is designed with simplicity and efficiency</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login