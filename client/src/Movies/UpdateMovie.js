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
            </form>
        </div>
    );
};

export default UpdateMovie;