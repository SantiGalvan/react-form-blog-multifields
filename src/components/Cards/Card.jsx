import { FaTrashAlt } from "react-icons/fa";
import Badge from '../Badge/Badge';

const Card = ({ title, content, image, tags, tagColors, category, clickButton }) => {
    return (
        <div className="card">
            <figure>
                <img src={image} alt={title} />
            </figure>
            <div className="card-body">
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={clickButton}>Elimina <FaTrashAlt /></button>
                <div className="badge-container">
                    {tags.map((tag, i) => <Badge tagColors={tagColors} key={i} tag={tag} style={{ backgroundColor: tagColors[tag] }} >{tag}</Badge>)}
                </div>
                {
                    category &&
                    <div className="category">
                        <p><strong>Categoria: </strong>{category}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card;