import styles from '@/modules/CategoryCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

function CategoryCard({ title  , name}) {
    return (
        <div className={styles.card}>
            <Link href={`/buy-residential?category=${name}`}>
                <Image src={`/images/${name}.png`} width={240} alt={title} height={144} priority={true} />
                <p>{title}</p>
            </Link>
        </div>
    )
}

export default CategoryCard