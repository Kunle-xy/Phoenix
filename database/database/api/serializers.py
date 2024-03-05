from rest_framework import serializers
from .models import Plant, Record

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'plantName', 'date', 'height', 'temperature', 'humidity', 'soilMoisture', 'image', 'plant']

