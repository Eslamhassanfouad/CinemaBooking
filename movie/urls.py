# cinema_booking_system/urls.py
from django.urls import path
from .views import MovieListCreateView, CategoryListCreateView

urlpatterns = [
    path('movies/', MovieListCreateView.as_view(), name='movie-list-create'),

    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),

]
