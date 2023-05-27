import { styles } from "../../../Utils/Style"
import PropTypes from "prop-types";
import { Image } from 'antd';

const LandLord = ({ item }) => {
    console.log(item)
    return (
        <>
            <div className={`${styles.padding} min-w-[40%] min-h-[80vh]`}>
                <div className="shadows min-h-[100vh] border">
                    <div className=" relative right-0 -top-10 overflow-hidden h-24 flex flex-col justify-center items-center">
                        <Image
                            width={180}
                            height={80}
                            src={`${import.meta.env.VITE_APP_URL}/uploads/${item.uPhoto}`}
                            className=" object-fill bg-slate-500 border rounded"
                        />
                    </div>
                    <div className={`${styles.paddingX}`}>
                        <p className={`${styles.heroSubText} text-center text-primary`}>{item.uName}</p>
                        <div className={`${styles.sectionSubText} ${styles.paddingY} text-center text-primary`}>
                            <p>Mobile: {item.uPhone}</p>
                            <p 
                            onClick={() => window.open(`mailto:${item.uEmail}?subject=About Room&body= Write your message`)}
                            className=" cursor-pointer hover:text-secondary"
                            >Email: {item.uEmail}</p>
                        </div>
                    </div>




                </div>
            </div>
        </>
    )
}
LandLord.propTypes = {
    item: PropTypes.any.isRequired,
};
export default LandLord
