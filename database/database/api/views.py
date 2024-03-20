from .serializers import PlantSerializer, RecordSerializer
from .models import Plant, Record, CustomUser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

from rest_framework import generics
# Create your views here.

class CreatePlantView(generics.ListCreateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

    def perform_create(self, serializer):
        serializer.save()   #model instance
        print(serializer.data)

class RecordView(generics.ListCreateAPIView):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()

    def get_queryset(self):
        qs  = Record.objects.filter(plant=self.kwargs['pk'])
        return qs


    def perform_create(self, serializer):
        serializer.save()   #model instance
        print(serializer.data)

class RetrieveRecordView(generics.RetrieveAPIView):
    serializer_class = RecordSerializer
    # queryset = Record.objects.all()

    def get_object(self, ):
        id = self.kwargs['second_pk']

        return Record.objects.get(id=id)
        # print(qs)

class RetrievePlantView(generics.RetrieveAPIView):
    # queryset = Plant.objects.all()
    serializer_class = PlantSerializer

    def get_object(self):
        id = self.kwargs['pk']
        print(id)
        return Plant.objects.get(id=id)
        # print(qs)


class RecordDeleteView(generics.DestroyAPIView):
    serializer_class = RecordSerializer
    queryset = Record.objects.all()

    def delete(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class CreateUserAPI(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (AllowAny,)
createuser = CreateUserAPI.as_view()