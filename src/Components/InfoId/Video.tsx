import infoStore from "../../store/infoId"
import { IoMdClose } from "react-icons/io";

const Video = () => {
    const { setKey, key,active,setActive } = infoStore()
    const close = ()=>{
        setActive(false)
        setKey('')
    }
    return (
        <div className={`infoid_video ${active && 'active'}`}>
            <button className="infoid_video_btn" onClick={close}>
                <IoMdClose />
            </button>
            <iframe width="971" height="546" src={`https://www.youtube.com/embed/${key}`} ></iframe>
        </div>
    )
}

export default Video