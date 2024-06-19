import { FaTrashAlt } from "react-icons/fa";

const Card = ({ title, content, image, clickButton }) => {
    return (
        <div className="card">
            <figure>
                <img src={image} alt={title} />
            </figure>
            <div className="card-body">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={clickButton}>Elimina <FaTrashAlt /></button>
            </div>
        </div>
    )
}

export default Card;