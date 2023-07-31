from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Movie(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    poster_path = models.CharField(max_length=200)
    trailer_url = models.CharField(max_length=200)
    category = models.ManyToManyField(Category)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True)


    def __str__(self):
        return self.title
