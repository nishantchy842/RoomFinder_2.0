import { Box } from "@mui/material"
import { styles } from "../../Utils/Style"

const AboutMe = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <p className={`${styles.heroSubHeadText} text-center`}> About Me</p>
                <Box sx={{ width: "80vw", height: '80vh', display: "flex", flexDirection: "column" }}>
                    <div className=" h-36 w-full flex justify-between items-center flex-shrink flex-wrap">
                        <img src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTK7Os2YW_6OfJJGh9rvPUSbNYqUwQXZce6mMIrqMasLen8sg4BDbHwN-UMOAV6Q_lXdvqdhbY-NqCTcGA" alt="/"
                            className=" w-40 h-40 rounded-full relative top-16 left-16"
                        />
                        <button className="btn relative top-24 right-4">Edit Profile</button>

                    </div>
                    <div className={`shadows flex flex-col justify-center items-center border min-h-[80%]`}>
                        <div className={`${styles.sectionSubText} flex justify-center items-center`}>
                            <label>Full Name:</label>
                            <p className={`${styles.paddingX} ${styles.heroSubText} text-primary`}> Nishant chaudhary </p>
                        </div>
                        <div className={`${styles.sectionSubText} flex justify-center items-center`}>
                            <label>Phone:</label>
                            <p className={`${styles.paddingX} ${styles.sectionSubText} text-primary`}> 9840219599 </p>
                        </div>
                        <div className={`${styles.sectionSubText} flex justify-center items-center`}>
                            <label>Email:</label>
                            <p className={`${styles.paddingX} ${styles.sectionSubText} text-primary`}> nishantchaudhary842@gmail.com </p>
                        </div>
                        <div className={`${styles.sectionSubText} flex justify-center items-center`}>
                            <label>Address:</label>
                            <p className={`${styles.paddingX} ${styles.sectionSubText} text-primary`}> Harisiddhi,lalitpur </p>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    )
}

export default AboutMe
