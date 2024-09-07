import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { axiosClient } from './../../api/axiosClinets';
import infoStore, { info } from "../../store/infoId";
import { FaPlay } from "react-icons/fa6";
import Video from "./Video";
import Actors from "../UI/Actors";
import Recommend from "./Recommend";
import Loader from "../UI/Loader";

interface InfoIdProps {
    type: string
}
const InfoId: FC<InfoIdProps> = ({ type }) => {
    const fullImg = import.meta.env.VITE_FULL_IMG
    const hdImg = import.meta.env.VITE_HD_IMG
    const [isLoad, setLoad] = useState(false)
    const { setRecommend, setActive, infoMovie, infoTv, setInfoMovie, setInfoTv, setKey, setActors, actors } = infoStore()
    const { id } = useParams()
    const getInfo = async () => {
        setLoad(true)
        const res = await axiosClient.get(`${type}/${id}`)
        const res2 = await axiosClient.get(`${type}/${id}/credits`)
        const recommend: { results: info[] } = await axiosClient.get(`${type}/${id}/recommendations`)
        setRecommend(recommend.results)
        setActors(res2)
        type == 'movie' ? setInfoMovie(res) : setInfoTv(res)
        setLoad(false)
    }
    const info = type == 'movie' ? infoMovie : infoTv

    useEffect(() => {
        getInfo()
    }, [id])
    const getVideo = async (id: number) => {
        const res: { results: [{ key: string }] } = await axiosClient.get(`${type}/${id}/videos?`)
        setKey(res.results[0].key)
        setActive(true)
    }
    if (info && !isLoad) {
        return (
            <>
                <div className="infoid">
                    <Video />
                    <div className="infoid_main infoblock_img">
                        <div className="infoid_main_bg">
                            <img src={fullImg + info.backdrop_path} alt="" />
                        </div>
                        <div className="infoid_main_img">
                            <img src={hdImg + info.poster_path} alt="" />
                        </div>
                    </div>
                    <div className="infoblock_descr">
                        <h2 className="infoblock_title">{type == 'movie' ? info.title : info.name}</h2>
                        <p className="infoblock_text">{info.overview}</p>
                        <div className="infoblock_content">
                            <span>{info.release_date}</span>
                            {
                                info.genres.map(genr => (
                                    <span key={genr.id}>{genr.name},</span>
                                ))
                            }
                            <span>{info.runtime ? `${Math.floor(info.runtime / 60)}h ${info.runtime % 60}m` : ''}</span>
                        </div>
                        {
                            type == 'movie' ?
                                <button className="infoid_btn" onClick={() => getVideo(info.id)}>
                                    <FaPlay />
                                    Смотерть трейлер
                                </button>
                                : null
                        }
                    </div>
                    <div className="infoid_actors">
                        {
                            actors?.cast.slice(0, 6).map(actor => (
                                <Actors actor={actor} key={actor.id} />
                            ))
                        }
                    </div>
                </div>
                <div className="budget">
                    <div className="budget_card">
                        <h2 className="budget_card_title">Бюджет</h2>
                        <p className="budget_card_text">{info.budget ? `${info.budget.toLocaleString()}$` : "Бюджет не указано"}</p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_card_title">Сборы</h2>
                        <p className="budget_card_text">{info.revenue ? `${info.revenue.toLocaleString()}$` : "Сборы не указано"}</p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_card_title">Статус</h2>
                        <p className="budget_card_text">{info.status ? info.status : "нет информации о статус"}</p>
                    </div>
                    <div className="budget_card">
                        <h2 className="budget_card_title">Исходное название</h2>
                        <p className="budget_card_text">{type == 'movie' ? info.original_title : info.original_name}</p>
                    </div>
                </div>
                <Recommend type={type} />
            </>
        )
    }else return <Loader/>
}

export default InfoId