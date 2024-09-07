import { useEffect } from "react";
import { axiosClient } from "../api/axiosClinets";
import searchStore from "../store/search";
import { useDebounce } from "use-debounce";
import { IData } from "../api/getData";
interface ISearch {
  results: IData[]
}
const Search = () => {
  const { search, setSearch, setMovies, movies } = searchStore()
  const [value] = useDebounce(search, 1000)
  const hdImg = import.meta.env.VITE_HD_IMG
  const getSearch = async () => {
    const res: ISearch = await axiosClient.get(`search/multi?query=${value}`)
    const response = res.results.filter(movie => movie.poster_path)
    setMovies(response)
  }
  useEffect(() => {
    getSearch()
  }, [value])
  return (
    <div className="movie">
      <div className="container">
        <input
          type="text"
          className="input"
          placeholder="Найти фильм, сериал..."
          onChange={(e) => setSearch(e.target.value)}
        />
        {
          movies?.length ?
            <div className="content">
              {
                movies.map(movie => (
                  <div className="content_card" key={movie.id}>
                    <img src={hdImg + movie.poster_path} alt="" />
                    <p className="content_title">{movie.title || movie.name}</p>
                  </div>
                ))
              }
            </div>
            : <h2 className="title">Фильм или сериал не найден </h2>
        }
      </div>
    </div>
  )
}

export default Search