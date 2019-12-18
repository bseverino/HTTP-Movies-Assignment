import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    console.log(movie);

    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data ))
          .catch(err => console.log(err.response));
    };

    useEffect(() => {
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) {
            fetchMovie(movieToEdit);
        }
    }, [props.movies, fetchMovie, props.match.params.id]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={movie.name}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={movie.metascore}
                />
                {movie.stars && movie.stars.map(star => (
                    <input
                        key="star"
                        type="text"
                        name="star"
                        placeholder="Star"
                        value={star}
                    />
                ))}
            </form>
        </div>
    );
};

export default UpdateMovie;