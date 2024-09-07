import { Link } from "react-router-dom";
import bars from "../../assets/images/bars.svg";
import { FC } from "react";
interface BtnProps {
  id: number
  type: string
}
const Btn: FC<BtnProps> = ({ type, id }) => {
  return (
    <Link to={`/${type}id/${id}`} className="btn">
      <img src={bars} alt="" />
      Подробнее
    </Link>
  )
}

export default Btn