
 
import styles from '@/template/MyProfilesPage.module.css'

import DashboardCard from '../modules/DashboardCard'




function MyProfilesPage({profiles}) {



  return (
    <div>
      {profiles.length ? null : <p className={styles.text}>هیچ آگهی هنوز ثبت نشده است</p>}

      {
        profiles.map(i => <DashboardCard data={JSON.parse(JSON.stringify(i))} key={i._id} /> )
      }

    </div>
  )
}

export default MyProfilesPage