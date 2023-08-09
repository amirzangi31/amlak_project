import styles from '@/template/HomePage.module.css'
import { FiCircle } from 'react-icons/fi'
import {  cities, services } from 'src/constants/strings'
import CategoryCard from '../modules/CategoryCard'
import { FaCity } from 'react-icons/fa'



function HomePage() {
    return (
        <div>
            <div className={styles.banner}>
                <div className={styles.desc}>
                    <h1>سامانه خرید و اجاره املاک </h1>
                    <ul>
                        {services.map((i, index) => (
                            <li key={index}>
                                <FiCircle />
                                <span>{i}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className={styles.categories}>
                <CategoryCard title="خانه ویلایی" name="villa" />
                <CategoryCard title="آپارتمان " name="apartment" />
                <CategoryCard title="مغازه " name="store" />
                <CategoryCard title="دفتر " name="office" />
            </div>
            <div className={styles.city}>
                <h3>شهر های پر بازدید</h3>
                <ul>
                    {cities.map((item ,index) =>(
                        <li key={index}>
                            <FaCity /> 
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default HomePage