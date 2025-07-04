import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const adminPanelUrl = import.meta.env.VITE_ADMIN_PANEL_URL


const Navbar = () => {

  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      <Link to={'/'}><img src={assets.logo} className='w-36' alt="logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to={'/'} className='flex flex-col gap-1 items-center'>
          <p>HOME</p>
          <hr className='hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
        </NavLink>
        <NavLink to={'/collection'} className='flex flex-col gap-1 items-center'>
          <p>COLLECTION</p>
          <hr className='hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
        </NavLink>
        <NavLink to={'about'} className='flex flex-col gap-1 items-center'>
          <p>ABOUT</p>
          <hr className='hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
        </NavLink>
        <NavLink to={'contact'} className='flex flex-col gap-1 items-center'>
          <p>CONTACT</p>
          <hr className='hidden w-2/4 h-[1.5px] border-none bg-gray-700' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
        {token && (
          <a
            href={adminPanelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center text-sm text-gray-700 border border-gray-300 rounded-full px-4 py-1  hover:text-black hover:border-black transition cursor-pointer"
          >
            Admin Panel
          </a>

        )}

        <img onClick={() => {
          setShowSearch(true)
          navigate('/collection')
        }
        }
          src={assets.search_icon} alt="search_icon" className='w-5 cursor-pointer' />

        <div className='group relative'>
          <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="profile_icon" />
          {/* -------------- Dropdown Menu ----------------- */}
          {token &&
            <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}

        </div>

        <Link to={'/cart'} className='relative'>
          <img src={assets.cart_icon} alt="cart_icon" className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="menu_icon" className='w-5 cursor-pointer sm:hidden' />

      </div>

      {/* Sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt="arrow_icon" className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to={'/'}>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to={'/collection'}>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to={'/about'}>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to={'/contact'}>CONTACT</NavLink>

        </div>
      </div>

    </div>
  )
}

export default Navbar