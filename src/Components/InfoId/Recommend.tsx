import { Link } from "react-router-dom"
import Skleton from "../Content/Skleton"
import { FC } from "react"
import infoStore from "../../store/infoId"
interface Props {
    type: string
}
const Recommend: FC<Props> = ({ type }) => {
    const img = import.meta.env.VITE_HD_IMG
    const skleton = [...Array(8)].map((_, i) => <Skleton key={i} />)
    const { recommend } = infoStore()
    return (
        <div className="container">
            <h2 className="infoid_title">Рекомендации</h2>
            <div className="content">
                {
                    recommend ?
                        recommend.slice(0,4).map(movie => (
                            <Link to={`/${type}id/${movie.id}`} className="content_card" key={movie.id}>
                                <img src={img + movie.poster_path} alt="" />
                                <p className="content_title">{type == 'movie' ? movie.title : movie.name}</p>
                            </Link>
                        ))
                        : skleton
                }
            </div>
        </div>
    )
}

export default Recommend