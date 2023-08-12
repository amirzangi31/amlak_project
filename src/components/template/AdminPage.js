


import styles from '@/template/AdminPage.module.css'
import AdminCard from '../modules/AdminCard'

function AdminPage({profiles}) {
  return (
    <div>
        {profiles.length === 0 && <p className={styles.text}>هیچ آگهی درحال انتظار تاییدی وجود ندارد  </p>}
        {
            profiles.map((item , index) => (
                    <AdminCard  key={item._id} data={JSON.parse(JSON.stringify(item))} /> 
            ))
        }

    </div>
  )
}

export default AdminPage