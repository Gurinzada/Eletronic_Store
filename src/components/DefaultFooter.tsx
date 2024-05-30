import styles from "../Styles/DefaultFooter.module.scss"

const DefaultFooter = () => {
    return(
        <footer className={styles.Footer}>
            <div>
                <span>PixelPioneer, 2024©</span>
            </div>
            <div>
                <span>Obrigado por usar nossos serviços!</span>
            </div>
        </footer>
    )
}

export default DefaultFooter