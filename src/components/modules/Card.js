

import styles from '@/modules/Card.module.css'
import { icons } from 'src/constants/icons'

import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
import { sp } from '@/utils/replaceNumber';
import Link from 'next/link';

function Card({data : {category , title ,location , price }}) {
  return (
    <div className={styles.container}>
        <div className={styles.icon}>
                {icons[category]}
        </div>
        <div className={styles.title}>
                {title}
        </div>
        <div className={styles.location}> 
                <HiOutlineLocationMarker /> 
                {location}
        </div>
        <div className={styles.price}>
                {sp(price)} تومان
        </div>
        <Link href='/'>
                مشاهده آگهی
                <BiLeftArrowAlt /> 
        </Link>
    </div>
  )
}

export default Card