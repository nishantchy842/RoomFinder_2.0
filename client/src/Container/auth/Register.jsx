import Layout from "../../Component/Layout/Layout"
import { styles } from "../../Utils/Style"

const Register = () => {

    const handleSubmit = async (e) => {


        e.preventDefault()
        // try {
        //   const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, {
        //     name,
        //     email,
        //     password,
        //     phone,
        //     address,
        //   })
        //   if (res && res.data.success) {
        //     toast.success(res.data.message)
        //     navigate("/login");
        //   } else {
        //     toast.error(res.data.message);
        //   }

        // } catch (error) {
        //   console.log(error)
        // }


    }

    return (
        <div>
            <Layout>
                <div className='h-[100vh] w-auto flex justify-center items-center bg-[#a2b2ee]'>
                    <form onSubmit={handleSubmit} 
                    className="hover:border rounded-tl-[150px] rounded-br-[150px] w-[50%] min-w-[300px] mt-10 p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
                        <h1 className={`text-center ${styles.sectionHeadText}`}>Register Here</h1>
                        <div className="mb-3">
                            <label className="block ">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-400">
                                    Name
                                </span>
                                <input
                                    type="text"
                                    //   value={name}
                                    //   onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Your Name"
                                    required
                                    autoFocus
                                    className="mt-1 px-3 py-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-400">
                                    Email
                                </span>
                                <input
                                    type="email"
                                    //   value={email}
                                    //   onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email "
                                    required
                                    className="inputStyles mt-1 px-3 py-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-400">
                                    Password
                                </span>
                                <input
                                    type="password"
                                    //   value={password}
                                    //   onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    required
                                    className="mt-1 px-3 py-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-400">
                                    Phone
                                </span>
                                <input
                                    type="number"
                                    //   value={phone}
                                    //   onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter Your Phone"
                                    required
                                    className="mt-1 px-3 py-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="mb-3 ">
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-400">
                                    Address
                                </span>
                                <input
                                    type="text"
                                    //   value={address}
                                    //   onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter Your Address"
                                    required
                                    className="mt-1 px-3 py-2 w-full"
                                />
                            </label>
                        </div>
                        <div className="flex justify-center align-middle mt-10">
                            <button type="submit" className='btn'>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default Register
