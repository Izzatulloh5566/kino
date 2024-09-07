import { FC, useState } from "react"
import { getData } from "../../api/getData";
import Pagination from "./Pagination";
import Skleton from "./Skleton";
import { Link } from "react-router-dom";
interface ContentProps {
    type: string
}
const Content: FC<ContentProps> = ({ type }) => {
    const img = import.meta.env.VITE_HD_IMG
    const [page, setPage] = useState(1)
    const { data } = getData(type, 'popular', page)

    const skleton = [...Array(8)].map((_, i) => <Skleton key={i}/>)
    return (
        <>
            <div className="content">

                {
                    data ?
                        data.map(movie => (
                            <Link to={`/${type}id/${movie.id}`} className="content_card" key={movie.id}>
                                <img src={img + movie.poster_path} alt="" />
                                <p className="content_title">{type == 'movie' ? movie.title : movie.name}</p>
                            </Link>
                        ))
                        : skleton
                }
            </div>
            <Pagination setPage={setPage} />
        </>

    )
}

export default Content