import React, { useEffect, useState } from "react";
import Card from "../Components/Card";

const apiKey = "&api_key=a9b07eb8b59dc93984e06862fdc1404a";
const baseUrl = "https://api.themoviedb.org/3/";
let url = baseUrl + "/discover/movie?sort_by=popularity.desc" + apiKey;
let arr = ["Popular", "Kids", "Movies", "Theatre"];

function Home() {
  const [movieData, setMovieData] = useState([]);
  const [links, setLinks] = useState(url);
  const [search, setSearch] = useState();

  useEffect(() => {
    fetch(links) 
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.results)
        setMovieData(data.results);
      });
  }, [links]);

  const getData = (movieType) => {
    if (movieType === "popular") {
      url = baseUrl + "/discover/movie?sort_by=popularity.desc" + apiKey;
    }
    if (movieType === "Kids") {
      url =
        baseUrl +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc" +
        apiKey;
    }
    if (movieType === "Movies") {
      url =
        baseUrl +
        "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc" +
        apiKey;
    }
    if (movieType === "Theatre") {
      url =
        baseUrl +
        "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22" +
        apiKey;
    }
    setLinks(url);
  };
  const searchMovie = (e) => {
    if (e.key === "Enter") {
      url =
        baseUrl +
        "/search/movie?api_key=a9b07eb8b59dc93984e06862fdc1404a&query=" +
        search;
      setLinks(url);
      setSearch(" ");
    }
  };

  return (
    <>
      <section className="header">
        <nav>
          <ul>
            {arr.map((value) => {
              return (
                <li>
                  <a
                    href="#"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="search movie"
              className="inputs"
              onchange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
            <button>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </section>
      <div className="container">
        {movieData.length === 0 ? (
          <p className="not-found">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
}
export default Home;
