import Sidebar from '../components/Common/Sidebar'
import Topbar from '../components/Common/Topbar'

const Layout = (Component) => ({ ...props }) => {
    return (
        <>
            <Sidebar />
            <Topbar />
            <main className='lg:pl-64'>
                <Component {...props} />
            </main>
            <footer className='flex items-center justify-center lg:pl-64 bg-[#2b3643] text-white py-1.5'>
                <span className='no-print'>Copyright © Megdap Innovation Labs</span>
            </footer>
        </>
    )
}

export default Layout
