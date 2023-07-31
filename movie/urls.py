# cinema_booking_system/urls.py
from django.urls import path
from .views import MovieListCreateView, CategoryListCreateView, MovieRetrieveUpdateDestroyView, MoviesWithPriceView, \
    MovieSearchView, MoviesByCategoryView

urlpatterns = [
    path('movies/', MovieListCreateView.as_view(), name='movie-list-create'),
    path('movies/<int:pk>/', MovieRetrieveUpdateDestroyView.as_view(), name='movie-retrieve-update-destroy'),
    path('movies/with-price/', MoviesWithPriceView.as_view(), name='movies-with-price'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('movies/search/', MovieSearchView.as_view(), name='movie-search'),
    path('movies/by-category/<int:category_id>/', MoviesByCategoryView.as_view(), name='movies-by-category'),

]
