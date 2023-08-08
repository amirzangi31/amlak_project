
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import styles from '@/modules/TextList.module.css'

function TextList({ title , profileData , setProfileData , type }) {


    const addHandler = e => {
        setProfileData({
            ...profileData,
            [type] : [...profileData[type] , ""]
        })
    }

    const changeHandler = (index , e )=>{
        const properties = [...profileData[type]]
        properties[index] = e.target.value

        setProfileData({
            ...profileData,
            [type] : [...properties]
        })
    }

    const deleteHandler = (index) => {
        
        const properties = [...profileData[type]]
        

        properties.splice(index , 1)

        setProfileData({
            ...profileData,
            [type] : [...properties]
        })
    }


    return (
        <div className={styles.container}>
            <p>{title}</p>
            {
                profileData[type].map((i , index) => (
                    <div key={index} className={styles.card}>
                        <input type="text" onChange={(e) => changeHandler(index , e)} value={i} />
                        <button type="button" onClick={() => deleteHandler(index)} >حذف <AiOutlineDelete /> </button>
                    </div>
                ))
            }

            <button type="button" onClick={addHandler} >افزودن <MdOutlineLibraryAdd /> </button>
        </div>
    )
}

export default TextList