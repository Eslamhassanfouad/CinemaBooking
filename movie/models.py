from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    poster_path = models.CharField(max_length=200)
    trailer_url = models.CharField(max_length=200)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.title
