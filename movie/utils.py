# cinema_booking_system/utils.py
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
            poster_path = f"https://image.tmdb.org/t/p/w500{movie_data['poster_path']}"  # Complete poster URL
            trailer_url = get_trailer_url(movie_data["id"])

            print(f"Title: {title}")
            print(f"Poster URL: {poster_path}")
            print(f"Trailer URL: {trailer_url}")

            # Fetch the movie instance or create it if it doesn't exist
            try:
                movie = Movie.objects.get(title=title)
            except Movie.DoesNotExist:
                movie = Movie.objects.create(
                    title=title,
                    description=description,
                    poster_path=poster_path,
                    trailer_url=trailer_url
                )

            # Create or update categories based on the genre IDs
            genre_ids = movie_data.get("genre_ids", [])
            categories = []

            for genre_id in genre_ids:
                category_data = get_category_data_from_tmdb(genre_id)
                category_name = category_data.get("name")

                if category_name:
                    category, _ = Category.objects.get_or_create(name=category_name)
                    categories.append(category)

            # Set the movie's categories
            if categories:
                movie.category.set(categories)

        # If the movie has no associated categories, set a default category (optional)
        default_category_name = "Uncategorized"
        default_category, _ = Category.objects.get_or_create(name=default_category_name)
        Movie.objects.filter(category__isnull=True).update(category=default_category)


def get_category_data_from_tmdb(category_id):
    api_key = "f92e6b2af79cfebefa731edaf2f6fec1"
    base_url = f"https://api.themoviedb.org/3/genre/{category_id}"

    params = {
        "api_key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    return data

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
            # We're assuming the first video is the official trailer
            if video_data["type"] == "Trailer" and video_data["site"] == "YouTube":
                return f"https://www.youtube.com/watch?v={video_data['key']}"

    # Return an empty string if no trailer is found or there is an issue with the API response
    return ""