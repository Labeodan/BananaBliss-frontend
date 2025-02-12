import styles from './BreadSkeleton.module.scss';

const BreadSkeleton = () => {
    return (
        <div className={`${styles.productCard} skeleton`}>
            <div className={`${styles.imageSkeleton} skeleton`}></div>
            <div className={`${styles.textSkeleton} skeleton`}></div>
            <div className={`${styles.textSkeleton} skeleton`}></div>
            <div className={`${styles.priceSkeleton} skeleton`}></div>
            <div className={`${styles.buttonSkeleton} skeleton`}></div>
            <div className={`${styles.buttonSkeleton} skeleton`}></div>
        </div>
    );
};

export default BreadSkeleton;