from django.urls import path
from . import views

urlpatterns = [
    path('createplant/', views.CreatePlantView.as_view(), name= 'plant_create'),
    path('record/<int:pk>/', views.RecordView.as_view(), name= 'record'),
    path('plant/<int:pk>/', views.RetrievePlantView.as_view(), name= 'plant'),
    path('record/<int:first_pk>/<int:second_pk>/', views.RetrieveRecordView.as_view(), name= 'recordPick'),
    # path('record/delete/<int:pk>/', views.RecordDeleteView.as_view(), name= 'record_delete'),

]