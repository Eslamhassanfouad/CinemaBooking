# views.py
from django.db.models import Q
from rest_framework import generics
from .models import Category, Movie
from .serializers import CategorySerializer, MovieSerializer
from .permissions import IsAdminOrReadOnly
from .utils import get_movie_data_from_tmdb

get_movie_data_from_tmdb()
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MovieSearchView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', None)
        if query:
            return Movie.objects.filter(Q(title__icontains=query))
        return Movie.objects.none()

class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        return Movie.objects.all()

class MovieRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [IsAdminOrReadOnly]

class MoviesWithPriceView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        return Movie.objects.exclude(price__isnull=True)

class MoviesByCategoryView(generics.ListAPIView):
    serializer_class = MovieSerializer

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        if category_id:
            return Movie.objects.filter(category__id=category_id)
        return Movie.objects.none()