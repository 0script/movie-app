const API_URL='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d13ef6fd04b0c091a273f81fadd4b245&page=1';
const IMG_PATH='https://image.tmdb.org/t/p/w1280';
const SEARCH_URL='https://api.themoviedb.org/3/search/movie?api_key=d13ef6fd04b0c091a273f81fadd4b245&query=';

const form=document.getElementById('form'); 
const search=document.getElementById('search');
const main=document.getElementById('main');

getMovies(API_URL);

async function getMovies(url){
    const res=await fetch(url);
    const data=await res.json();
    let add_movie=``;

    main.innerHTML='';
    data.results.forEach(movie => {

        add_movie=`<div class="movie">
            <img src="${IMG_PATH+movie.poster_path}" alt="IMG_PATH+" />
            <div class="movie-info">
                <h3 class="title">${movie.original_title}<span class=${setSpanClass(movie.vote_average)}>${movie.vote_average}</span></h3>
                <div class="overview">
                    <h3>Overview</h3>
                        ${movie.overview}
                </div>
            </div>
        </div>`;
        main.innerHTML+=add_movie;

    });

}

function setSpanClass(rating){
    if(rating<5) 
        return 'red';
    else if(rating>=5 && rating <7)
        return 'orange';
    else
        return 'green'
}

form.addEventListener('submit',(e)=>{

    e.preventDefault();

    let searchTerm=search.value;
    searchTerm=searchTerm.split(' ');
    searchTerm=searchTerm.join('+');

    if(searchTerm && searchTerm!=''){
        getMovies(SEARCH_URL+searchTerm);
        search.value='';
    }else{
        window.location.reload;
    }

});

