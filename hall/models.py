# cinema_booking_system/models.py
from django.db import models
from movie.models import Movie
from customer.models import Customer
class Hall(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Reservation(models.Model):
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    num_tickets = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.user.username} - {self.movie.title} ({self.date_time})"
