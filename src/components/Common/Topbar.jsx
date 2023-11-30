import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { BsChevronDown } from 'react-icons/bs'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import UserNavbar from './UserNavbar'
import ProfileMenu from './ProfileMenu'
import logo from '../../assets/logo_main.png'
import AdminNavbar from '../admin/AdminNavbar'

const Topbar = () => {
    const { user } = useSelector((state) => state.user)
    const [menuOpen, setMenuOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <div className={`bg-[#2b3643] sticky top-0  w-full p-3 z-10 flex lg:justify-end justify-between items-center text-white px-6`}>
                <div className={`lg:hidden  block bg-white px-2 `}>
                    <img src={logo} alt="TexLang" className='h-12 no-print' />
                </div>
                <div className='flex items-center gap-2'>
                    <div onClick={() => setMenuOpen(true)} className='flex items-center font-sans gap-1.5 cursor-pointer hover:bg-[#67707975] px-2.5 h-full no-print'>
                        <span className='no-print'>{user?.name}</span>
                        <BsChevronDown />
                        <ProfileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    </div>
                    <button className='lg:hidden block' onClick={() => setDrawerOpen((prev) => !prev)}>
                        <FaBars size={20} />
                    </button>
                </div>
            </div>

            <SlidingPane
                isOpen={drawerOpen}
                title={
                    <div className=' w-full bg-white'>
                        <img src={logo} alt="TexLang" className='h-12' />
                    </div>
                }
                onRequestClose={() => setDrawerOpen(false)}
                from='left'
                width='300px'
                className='lg:hidden bg-[#364150] text-white z-30'
            >
                {user && user?.role === 'admin' ? <AdminNavbar /> : <UserNavbar />}

            </SlidingPane>
        </>
    )
}

export default Topbar
