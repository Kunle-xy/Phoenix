from rest_framework import serializers
from .models import Plant, Record, CustomUser

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'plantName', 'date', 'height', 'temperature', 'humidity', 'soilMoisture', 'image', 'plant']

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def validate(self, data):
        email = data.get('email', '').strip().lower()
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Email already exists'})
        # print(data)
        return data

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
