import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    console.log(movie)

    useEffect(() => {
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.movies, props.match.params.id]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleStars = (e, i) => {
        e.preventDefault();
        const newStars = [...movie.stars];
        newStars[i] = e.target.value;
        setMovie({
            ...movie,
            stars: newStars
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies(res.data);
                props.history.push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err.response));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:{" "}
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        value={movie.title}
                    />
                </label><br />
                <label>Director:{" "}
                    <input
                        type="text"
                        name="director"
                        onChange={handleChange}
                        placeholder="Director"
                        value={movie.director}
                    />
                </label><br />
                <label>Metascore:{" "}
                    <input
                        type="number"
                        name="metascore"
                        onChange={handleChange}
                        placeholder="Metascore"
                        value={movie.metascore}
                    />
                </label><br />
                <label id="stars">Stars:<br />
                {movie.stars && movie.stars.map((star, i) => {
                    console.log(star, i);
                        return (
                            <input
                                key={i}
                                type="text"
                                name='stars'
                                onChange={e => handleStars(e, i)}
                                placeholder="Star"
                                value={movie.stars[i]}
                            />
                        )
                    })}
                </label><br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UpdateMovie;