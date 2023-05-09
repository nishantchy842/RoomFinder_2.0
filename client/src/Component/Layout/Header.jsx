import { useEffect, useState } from "react";
import { styles } from "../../Utils/Style";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

    const [navColor, setNavColor] = useState('transparent')
    const [navSize, setNavSize] = useState('4rem')
    const [color, setColor] = useState('white')
    const [toggle, setToggle] = useState(false);

    const navigate = useNavigate()
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setNavColor('#283048') : setNavColor('transparent')
        window.scrollY > 10 ? setNavSize('5rem') : setNavSize('6rem')
        window.scrollY > 10 ? setColor('#138f6e') : setColor('white')
    }
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        
        <nav
        style={{
            backgroundColor: navColor,
            height: navSize,
            transition: "all 1s"
        }} 
        className={`${
            styles.paddingX
          } w-full flex items-center py-5 top-0`}
        >

        <div className='logo w-full flex justify-between items-center max-w-7xl mx-auto'  >
        
            <Link >
                <img className='w-20 h-20 object-contain'
                 src='https://cdn.logo.com/hotlink-ok/logo-social.png'
                  alt='logo'></img>

            </Link>
        </div>
        <div className='home-to-contact'>
            <ul style={{ color: color, cursor:'pointer' }} className='list-none hidden sm:flex flex-row gap-10'>
            <li className='text-secondary'>Home</li>
            <li><button className="btn" onClick={()=>navigate('/login')}>Login</button></li>
                {
                    // NavData.map((item, id) => {
                    //     return <li key={item.id} className='text-secondary'><Link to={item.path} spy={true} smooth={true} offset={-100} duration={500}>{item.title}</Link></li>
                    // })

                }
            </ul>
            <div className='md:hidden flex flex-1 justify-end items-center'>
            <img
              src={toggle ? close : "menu"}
              alt='menu'
              className='w-[28px] h-[28px] object-contain'
              onClick={() => setToggle(!toggle)}
            />
  
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
            >
              <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              <li>Home</li>
              {
                // NavData.map((item, id) => {
                //     return <li key={item.id} className='text-secondary'><Link to={item.path} spy={true} smooth={true} offset={-100} duration={500}>{item.title}</Link></li>
                // })

            }
              </ul>
            </div>
          </div>
        </div>

    </nav>
        
    )
}
export default Header