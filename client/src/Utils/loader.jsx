import styles from './loader.module.css'

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <div className={styles.loader}></div>
            <p><strong>please wait....</strong></p>
        </div>
    )
}

export default Loader
