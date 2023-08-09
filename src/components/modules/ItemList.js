
import styles from '@/modules/ItemList.module.css'

function ItemList({ data }) {
    return (
        <>
            {data.length ? (data.map((item, index) => (
                <li key={index} >
                    {item}
                </li>
            ))) : <p className={styles.text}>هیچ موردی ذکر نشده است</p>}
        </>

    )
}

export default ItemList