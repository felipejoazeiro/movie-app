const api_key = "04c35731a5ee918f014970082a0088b1"
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1&language=pt-BR`
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')


getMovies(api_url)

async function getMovies(url){
    const resp = await fetch(url)
    const respData = await resp.json()
    
    showMovies(respData.results)

    return respData;
}

function getClassByRate(vote){
    if(vote>8){
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searched = search.value
    if(searched){
        getMovies(searchApi+searched)
        search.value=''
    }
})

function showMovies(movies){
    //clear main
    main.innerHTML = ''
    movies.forEach(movie =>{
        const {poster_path, overview, title, vote_average} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${imgPath + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}


