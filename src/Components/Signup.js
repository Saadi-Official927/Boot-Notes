import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [credentials, setCredentials] = useState({ Firstname: '', Lastname: '', email: '', Password: '', cPassword: '' })
    const history = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/auth/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Firstname: credentials.Firstname, Lastname: credentials.Lastname, email: credentials.email, Password: credentials.Password, cPassword: credentials.cPassword }),
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect it
            localStorage.setItem('token', json.authtoken)
            history("/login")
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
            {/* <div className="container my-3 col-md-5">
                <form onSubmit={handleSubmit}>
                    <div class="form-group ">
                        <label for="Firstname">Enter Your First-Name</label>
                        <input type="text" class="form-control" id="Firstname" name='Firstname' aria-describedby="emailHelp" placeholder="First-Name" onChange={onchange} value={credentials.Firstname} minLength={3} required />
                    </div>
                    <div class="form-group ">
                        <label for="Lastname">Enter Your Last-Name</label>
                        <input type="text" class="form-control" id="Lastname" name='Lastname' aria-describedby="emailHelp" placeholder="Last-Name" onChange={onchange} value={credentials.Lastname} minLength={3} required />
                    </div>
                    <div class="form-group ">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} value={credentials.email} required />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="password" class="form-control" id="Password" name='Password' placeholder="Password" onChange={onchange} value={credentials.Password} minLength={5} required />
                    </div>
                    <div class="form-group">
                        <label for="cPassword">Confirm Password</label>
                        <input type="password" class="form-control" id="cPassword" name='cPassword' placeholder="Confirm Password" onChange={onchange} value={credentials.cPassword} minLength={5} required />
                    </div>
                    <button type="submit" class="btn btn-primary my-2">Submit</button>
                </form>
            </div> */}


            <section class="text-gray-600 body-font relative" data-aos='fade-down'>
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full mb-12">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Sign-in</h1>
                        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Signup here to be part of our community</p>
                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="Firstname" class="leading-7 text-sm text-gray-600">First-Name</label>
                                    <input type="text" class="form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="Firstname" name='Firstname' aria-describedby="emailHelp" placeholder="First-Name" onChange={onchange} value={credentials.Firstname} minLength={3} required />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="Lastname" class="leading-7 text-sm text-gray-600" >Last-Name</label>
                                    <input type="text" class="form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="Lastname" name='Lastname' aria-describedby="emailHelp" placeholder="Last-Name" onChange={onchange} value={credentials.Lastname} minLength={3} required />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="email" className='leading-7 text-sm text-gray-600' >Email address</label>
                                    <input type="email" class="form-control  w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} value={credentials.email} required />
                                    <small class="text-center">We'll never share your email with anyone else.</small>
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="Password" className='leading-7 text-sm text-gray-600' >Password</label>
                                    <input type="password" class="form-control  w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="Password" name='Password' placeholder="Password" onChange={onchange} value={credentials.Password} minLength={5} required />
                                </div>
                            </div>
                            <div class="p-2 w-1/2">
                                <div class="relative">
                                    <label for="cPassword" className='leading-7 text-sm text-gray-600'>Confirm Password</label>
                                    <input type="password" class="form-control w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="cPassword" name='cPassword' placeholder="Confirm Password" onChange={onchange} value={credentials.cPassword} minLength={5} required />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={handleSubmit} class="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg">Signup</button>
                            </div>
                            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                <a class="text-pink-500" href='https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfsctVFZBXbJvnWZWFRtJJpMHbXVLBVczRfnLNlCBHkXCQwHCPXjrVVWqgpPQSflbwQdNq'>rrohamsaad@email.com</a>
                                <p><br /></p>                                
                                <span class="inline-flex">
                                    <a class="text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500">
                                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                        </svg>
                                    </a>
                                    <a class="ml-4 text-gray-500">
                                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup