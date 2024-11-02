"use client";
import { useEffect, useState } from "react";


interface Movie {
  name: string;
  year: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); // Specify that movies is an array of Movie objects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data: Movie[] = await response.json();
        setMovies(data); // Store the movies array directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Home Page</p>
      <div>
        <h3>Movies from API:</h3>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              {movie.name} ({movie.year})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
