import styles from '@/modules/Sidebar.module.css'
import Link from 'next/link'
import { HiFilter } from 'react-icons/hi'
import { categories } from 'src/constants/strings'

function Sidebar() {
    return (
        <div className={styles.container}>
            <p>
                <HiFilter />
                دسته بندی
            </p>

            <div>
                <Link href={"/buy-residential"}>همه</Link>
                {Object.keys(categories).map((i, index) => (
                    <Link
                        key={index}
                        href={{
                            pathname: "/buy-residential",
                            query: { category: i },
                        }}
                    >
                        {categories[i]}
                    </Link>))}
            </div>

        </div>
    )
}

export default Sidebar