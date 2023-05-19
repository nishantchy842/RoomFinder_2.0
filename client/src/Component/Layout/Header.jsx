import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  /*const [navColor, setNavColor] = useState('transparent')
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
        
    )*/

  let Links = [{ name: "ABOUT", link: "/" }];
  let [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(state => state.user)

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-20 bg-[#295d61]">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          onClick={() => navigate("/")}
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          RoomFinder
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#295d61] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 " : "top-[-490px]"
            }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-gray-800 hover:text-gray-400 duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          {isLoggedIn==false ?
            <button
              className="btn text-white py-2 px-6 rounded md:ml-8
    duration-500"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button> :
            <button
              className="btn text-white py-2 px-6 rounded md:ml-8
    duration-500"
              onClick={() => console.log("logout clicked")}
            >
              LOGOUT
            </button>
          }

        </ul>
      </div>
    </div>
  );
};
export default Header;