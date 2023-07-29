# cinema_booking_system/urls.py
from django.urls import path
from .views import  ReservationListCreateView, HallListCreateView

urlpatterns = [
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list-create'),
    path('halls/', HallListCreateView.as_view(), name='hall-list-create'),
]
