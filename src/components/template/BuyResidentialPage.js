

import styles from '@/template/BuyResidentialPage.module.css'
import Card from '../modules/Card'
import Sidebar from '../modules/Sidebar'

function BuyResidentialPage({data}) {

  return (
    <div className={styles.container}>
        <div className={styles.sidebar}>
            <Sidebar /> 
        </div>
        <div className={styles.main}>
            {data.length === 0 && <p className={styles.text}>هیج آگهی ثبت نشده است</p>}
            {data.map((item) => (
                <Card key={item._id} data={item} /> 
            ))}
        </div>
    </div>
  )
}

export default BuyResidentialPage