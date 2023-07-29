# cinema_booking_system/serializers.py
from rest_framework import serializers
from .models import Reservation, Hall

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    hall = HallSerializer()

    class Meta:
        model = Reservation
        fields = '__all__'
