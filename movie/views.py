# cinema_booking_system/views.py
from rest_framework import generics
from .models import Category, Movie
from .serializers import CategorySerializer, MovieSerializer
from .utils import get_movie_data_from_tmdb
from .permissions import IsAdminOrReadOnly

class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get_queryset(self):
        get_movie_data_from_tmdb()
        return Movie.objects.all()
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer