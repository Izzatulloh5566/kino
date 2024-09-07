import { FC } from "react"
import ReactPaginate from "react-paginate"
interface IProps {
  setPage: (page: number) => void
}
const Pagination: FC<IProps> = ({ setPage }) => {
  const handleClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1)
  }
  return (
    <ReactPaginate
      pageCount={500}
      previousLabel={"<<"}
      nextLabel={">>"}
      className="paginate"
      activeLinkClassName="paginate_active"
      pageLinkClassName="paginate_link"
      previousClassName="paginate_prev"
      nextClassName="paginate_next"
      breakClassName="paginate_break"
      onPageChange={handleClick}
    />
  )
}

export default Pagination