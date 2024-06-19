
const Badge = ({ tag, tagColors }) => {
    return (
        <div>
            <span className='badge' style={{ backgroundColor: tagColors[tag] }} >{tag}</span>
        </div>
    );
}

export default Badge;