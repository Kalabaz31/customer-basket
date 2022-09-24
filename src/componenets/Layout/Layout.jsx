import React from 'react'
import "./Layout.scss"


const Layout = ({ children }) => {


    return (
        <div className='app__layout'>
            <div className="container">
                {children}
            </div>

        </div>
    )
}

export default Layout