import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    console.log(movie)

    const handleChange = e => {
        if (e.target.name === "stars") {
            setMovie({
                ...movie,
                stars: e.target.value.split(",")
            });
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                props.addedMovie(res.data);
                props.history.push("/");
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
                <label>Stars (separate by commas - ex. John Smith,Jane Doe):<br />
                    <textarea
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        placeholder="Stars"
                        value={movie.stars}
                    />
                </label><br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default UpdateMovie;