import requests
from .models import Movie, Category


def get_movie_data_from_tmdb():
    api_key = "f92e6b2af79cfebefa731edaf2f6fec1"
    base_url = "https://api.themoviedb.org/3/movie/popular"

    params = {
        "api_key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if data.get("results"):
        movies_data = data["results"]

        for movie_data in movies_data:
            title = movie_data["title"]
            description = movie_data["overview"]
            poster_path = f"https://image.tmdb.org/t/p/w500{movie_data['poster_path']}"
            trailer_url = get_trailer_url(movie_data["id"])
            rating = movie_data.get("vote_average", None)

            try:
                movie = Movie.objects.get(title=title)

            except Movie.DoesNotExist:
                movie = Movie.objects.create(
                    title=title,
                    description=description,
                    poster_path=poster_path,
                    trailer_url=trailer_url,
                    rating=rating
                )

            genre_ids = movie_data.get("genre_ids", [])
            categories = []

            for genre_id in genre_ids:
                category_data = get_category_data_from_tmdb(genre_id)
                category_name = category_data.get("name")

                if category_name:
                    category, _ = Category.objects.get_or_create(name=category_name)
                    categories.append(category)

            if categories:
                movie.category.set(categories)

            default_category_name = "Uncategorized"
            if categories:
                movie.category.set(categories)
            else:
                default_category, _ = Category.objects.get_or_create(name=default_category_name)
                movie.category.set([default_category])


def get_category_data_from_tmdb(category_id):
    api_key = "f92e6b2af79cfebefa731edaf2f6fec1"
    base_url = "https://api.themoviedb.org/3/genre/movie/list"

    params = {
        "api_key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if data.get("genres"):
        genres = data["genres"]
        for genre in genres:
            if genre["id"] == category_id:
                return {"name": genre["name"]}

    return {"name": "Uncategorized"}


def get_trailer_url(movie_id):
    api_key = "f92e6b2af79cfebefa731edaf2f6fec1"
    base_url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"

    params = {
        "api_key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    if data.get("results"):
        for video_data in data["results"]:
            if video_data["type"] == "Trailer" and video_data["site"] == "YouTube":
                return f"https://www.youtube.com/watch?v={video_data['key']}"

    return ""
