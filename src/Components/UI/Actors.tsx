import { FC } from "react";
import { Actor } from "../../store/infoId";
import nophoto from "../../assets/images/nophoto.png";
interface ActorsProps {
    actor: Actor
}
const Actors: FC<ActorsProps> = ({ actor }) => {
    const img = import.meta.env.VITE_HD_IMG
    return (
        <div className="actor">
            <img src={actor.profile_path ? img + actor.profile_path : nophoto} alt="" />
            <p className="actor_name">
                {actor.name}
            </p>
        </div>
    )
}

export default Actors