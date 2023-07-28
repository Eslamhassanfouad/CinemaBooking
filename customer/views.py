from django.shortcuts import render
from .serializers import CustomerSerializer,CustomTokenObtainPairSerializer
from .models import Customer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.


@api_view(['POST'])
def register(request):
    serializer=CustomerSerializer(data=request.data)
    if serializer.is_valid():
        customer=serializer.save()
        token=customer.get_tokens()
        response_data = {
                'customer': serializer.data,
                'token': token,
            }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class UserLoginAPIView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = serializer.validated_data
        return Response(token, status=status.HTTP_200_OK)