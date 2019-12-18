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
    console.log("movie", movie)

    useEffect(() => {
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.movies, props.match.params.id]);

    const handleChange = e => {
        e.preventDefault();
        if (e.target.name === "stars") {
            setMovie({
                ...movie,
                stars: e.target.value.split(",")
            });
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            });
        }
    };

    const deleteField = e => {
        e.preventDefault();        
    };

    const addField = e => {
        e.preventDefault();
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
                <label>Stars (separate by commas):<br />
                    <textarea
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        placeholder="Stars"
                        value={movie.stars}
                    />
                </label><br />
                <button onClick={addField}>Add Star</button><br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UpdateMovie;