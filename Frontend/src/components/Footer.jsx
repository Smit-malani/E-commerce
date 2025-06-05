import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className='w-full'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 w-full text-sm'>

                <div>
                    <h1 className='uppercase font-bold text-3xl mb-5'>Shop <span className='text-[#C586A5]'>Sphere</span></h1>
                    <p className='w-full md:w-2/3 text-gray-700 text-justify'>Forever is a premium fashion brand bringing you the latest styles with unparalleled quality and customer satisfaction.We are committed to sustainability and ethical fashion.</p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <NavLink to='/'>
                            <p>Home</p>
                        </NavLink>
                        <NavLink to='/collection'>
                            <p>Collection</p>
                        </NavLink>
                        <NavLink to='/about'>
                            <p>About</p>
                        </NavLink>
                        <NavLink to='/contact'>
                            <p>Contact</p>
                        </NavLink>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-700'>
                        <li>+91-875-899-4652</li>
                        <li>shop@sphere.com</li>
                    </ul>
                </div>

            </div>
            <div className=''>
                <hr />
                <p className='py-5 text-sm text-gray-700 text-center'>Copyright 2025@ Sphere.com - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer