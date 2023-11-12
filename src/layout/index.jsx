import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import Topbar from '../components/Common/Topbar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <main>
            <Sidebar />
            <Topbar />
            <div className='w-full h-[calc(100%-48px)] lg:pl-64'>
                <Component {...props} />
            </div>
        </main>
    )
}

export default Layout
