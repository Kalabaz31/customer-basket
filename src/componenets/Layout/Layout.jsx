import React from 'react'
import "./Layout.scss"


const Layout = ({ children }) => {


    return (
        <div className='app__layout'>


            {children}
        </div>
    )
}

export default Layout