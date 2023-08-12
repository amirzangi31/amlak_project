import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import styles from '@/template/DetailPage.module.css'
import ItemList from "../modules/ItemList";
import Title from "../modules/Title";
import { e2p, sp } from "@/utils/replaceNumber";
import { icons } from "src/constants/icons";
import { categories } from "src/constants/strings";
import ShareButton from "../modules/ShareButton";
import toast, { Toaster } from "react-hot-toast";


function DetailPage({ data }) {



    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1>{data.title}</h1>
                <span>
                    <HiOutlineLocationMarker />
                    {data.location}
                </span>
                <Title >توضیحات</Title>
                <p>{data.description}</p>
                <Title >امکانات</Title>
                <ItemList data={data.amenities} />
                <Title >قوانین</Title>
                <ItemList data={data.rules} />
            </div>
            <div className={styles.sidebar}>
                <div className={styles.realState}>
                    <SiHomebridge />
                    <p>املاک {data.realState}</p>
                    <span>
                        <AiOutlinePhone />
                        {e2p(data.phone)}
                    </span>
                </div>

                <ShareButton  />
         
                <div className={styles.price}>
                    <p>
                        {icons[data.category]}
                        {categories[data.category]}
                    </p>
                    <p>{sp(data.price)} تومان</p>
                    <p>
                        <BiCalendarCheck />
                        {new Date(data.constructionDate).toLocaleDateString("fa-IR")}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default DetailPage