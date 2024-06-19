import { useState } from "react";
import Card from "../Cards/Card";

const Form = () => {

    const defaultPost = {
        title: '',
        image: '',
        content: ''
    }

    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(defaultPost);

    const handleSubmit = e => {
        e.preventDefault()

        // Se il titolo ha almeno un carettere e se non è gia presente nei posts allora pushalo
        if (post.title.trim().length !== 0 && !posts.includes(post.title.trim()) && post.content.trim().length !== 0) {

            setPosts(array => ([...array, post]));
        }

        setPost(defaultPost);
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

                {/* Prima colonna */}
                <div className="col">
                    <h1>Inserisci il titolo del tuo Post</h1>
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
                            <label> Inserisci l'url diell'immagine</label>
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

                            <button>Salva</button>
                        </form>
                    </div>
                </div>

                {/* Seconda colonna */}
                <div className="col">
                    {
                        posts.length !== 0 &&
                        <>
                            <h1>Ecco i Posts creati</h1>
                            <div className="cards">
                                {posts.map(({ title, content, image }, index) => (
                                    <Card
                                        key={`post-${index}`}
                                        title={title}
                                        content={content}
                                        image={image}
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