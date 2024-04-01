from rest_framework import serializers
from .models import Plant, Record, CustomUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'plantName', 'date', 'height', 'temperature', 'humidity', 'soilMoisture', 'image', 'plant']


#user serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'farmName', 'farmLocation', 'farmSize', 'profileImg']
class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'password_confirm', 'first_name', 'last_name',\
                   'farmName', 'farmLocation', 'farmSize', 'profileImg']

    def validate(self, data):
        email = data.get('email', '').strip().lower()
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})
        # print(data)
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        return data

    def create(self, validated_data):

        validated_data.pop('password_confirm')
        user = CustomUser.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    """Custom serializer for obtaining JWT tokens."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims if needed
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['farmName'] = user.farmName
        token['farmLocation'] = user.farmLocation
        token['farmSize'] = user.farmSize
        token['profileImg'] = user.profileImg.url

        # token['text'] = user
        # Add more custom claims as needed
        return token
