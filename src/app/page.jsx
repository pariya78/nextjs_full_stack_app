import styles from './home.module.css'
import Image from "next/image";

const Home = () => {
    // throw new Error('error in home page');
    return <div className={styles.container}>
        <div className={styles.textContainer}>
            <h1 className={styles.title}>
                Creative Thoughts Agency.
            </h1>
            <p className={styles.desc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </p>
            <div className={styles.buttons}>
                <button className={styles.button}> Learn More</button>
                <button className={styles.button}> Contacts</button>
            </div>
            <div className={styles.brands}>
                <Image
                    className={styles.brandImg}
                    src='/brands.png'
                    alt='brands'
                    fill
                />
            </div>
        </div>
        <div className={styles.imageContainer}>
            <Image src='/hero.gif'
                   alt='hero'
                   fill
                   className={styles.heroImg}/>
        </div>
    </div>;
};

export default Home;