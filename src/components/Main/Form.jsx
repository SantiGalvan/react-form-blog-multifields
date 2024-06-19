import { useState } from "react";
import Card from "../Cards/Card";
import Badge from '../Badge/Badge';
import { posts as dbPosts } from '../../data/posts.js';

const tagColors = {
    "Version Control": "#FFC300",
    "Programmazione": "#33FF57",
    "Node.js": "#DAF7A6",
    "CSS": "#3357FF",
    "Web Design": "#FF33A1",
    "API": "#581845",
    "TypeScript": "#C70039",
    "JavaScript": "#FF5733",
    "React": "#900C3F",
    "React Native": "#4A235A",
    "SQL": "#1ABC9C",
    "Database": "#7D3C98",
    "Python": "#F39C12",
    "Docker": "#2E4053",
    "DevOps": "#16A085"
}

const onlyTags = () => {
    let stringTags = ''
    dbPosts.forEach(post => {
        const tag = post.tags.map(tag => tag);
        stringTags += `${tag},`
    });

    const arrayTags = stringTags.split(',');

    const tags = [];
    arrayTags.forEach(tag => {
        if (!tags.includes(tag)) tags.push(tag);
    })

    return tags;
}

const Form = () => {


    const defaultPost = {
        id: new Date().toISOString(),
        title: '',
        image: '',
        content: '',
        tags: []
    }

    const [posts, setPosts] = useState(dbPosts);
    const [post, setPost] = useState(defaultPost);

    const handleSubmit = e => {
        e.preventDefault()

        // Se il titolo ha almeno un carettere e se non è gia presente nei posts allora pushalo
        if (post.title.trim().length !== 0 && !posts.includes(post.title.trim()) && post.content.trim().length !== 0) {

            setPosts(array => ([...array, post]));
        }

        setPost(defaultPost);
    }

    const checkTags = (tag) => {
        const curr = post.tags;
        const newTags = curr.includes(tag) ?
            curr.filter(element => element !== tag) :
            [...curr, tag];
        setPost(array => ({ ...array, ['tags']: newTags }))
    }

    const changedPost = (key, value) => {
        setPost(post => ({ ...post, [key]: value }));
    }

    const removePost = (index) => {
        setPosts(array => array.filter((post, i) => i !== index));
    }


    return (
        <main className="container">
            <div className="row">

                {/* Colonna del form */}
                <div className="col">
                    <h1>Inserisci il tuo Post</h1>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>

                            {/* Titolo */}
                            <label> Inserisci il titolo</label>
                            <input
                                type="text"
                                value={post.title}
                                onChange={(e) => changedPost('title', e.target.value)}
                            />

                            {/* Immagine */}
                            <label> Inserisci l'url dell'immagine</label>
                            <input
                                type="text"
                                value={post.image}
                                onChange={(e) => changedPost('image', e.target.value)}
                            />

                            {/* Contenuto */}
                            <label>Inserisci il contenuto</label>
                            <textarea
                                name="content"
                                rows="6"
                                value={post.content}
                                onChange={(e) => changedPost('content', e.target.value)}
                            ></textarea>

                            {/* Tags */}
                            <h3>Tags</h3>
                            <div className="checkbox-container">
                                {onlyTags().map((tag, index) =>
                                (
                                    tag &&
                                    <label key={`tag-${index}`}>
                                        <Badge tagColors={tagColors} tag={tag} style={{ backgroundColor: tagColors[tag] }} >{tag}</Badge>
                                        <input
                                            className="check"
                                            type="checkbox"
                                            checked={post.tags.includes(tag)}
                                            onChange={() => checkTags(tag)}
                                        />
                                    </label>
                                ))}
                            </div>


                            <button>Salva</button>
                        </form>
                    </div>
                </div>

                {/* Colonna delle Card */}
                <div className="col">
                    {
                        posts.length !== 0 &&
                        <>
                            <h1>Posts creati</h1>
                            <div className="cards">
                                {posts.map(({ title, content, image, tags }, index) => (
                                    <Card
                                        key={`post-${index}`}
                                        title={title}
                                        content={content}
                                        image={image}
                                        tags={tags}
                                        tagColors={tagColors}
                                        clickButton={() => { removePost(index) }} />
                                ))}
                            </div>
                        </>
                    }
                </div>

            </div>
        </main>

    )
}

export default Form;