from rest_framework import serializers
from .models import Customer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'
        extra_kwargs = {
            'password' : {'write_only': True}
        }
    def create(self, validation_data):
        password = validation_data.pop('password', None) 
        instance = self.Meta.model(**validation_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_admin'] = user.is_staff and user.is_superuser
        print(user)

        return token
    


        

