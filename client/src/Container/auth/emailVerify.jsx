import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../assets/success.png";
import styles from "./email.module.css";
// import Layout from "../../Component/Layout/Layout";
import PageNotFound from "../../Utils/PageNotFound";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${import.meta.env.VITE_APP_URL}/api/auth/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                // setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            <div className="h-[80vh] flex flex-col justify-center items-center ">
                {validUrl ? (
                    <div className={styles.container}>
                        <img src={success} alt="success_img" className={styles.success_img} />
                        <h1>Email verified successfully</h1>
                        <Link to="/login">
                            <button className={styles.green_btn}>Login</button>
                        </Link>
                    </div>
                ) : (
                    <PageNotFound />
                )}
            </div>
        </>
    );
};

export default EmailVerify;