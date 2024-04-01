from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('createuser/', views.createuser, name= 'user_create'),
    path('user/', views.ListUserAPI.as_view(), name= 'user'),
    path('createplant/', views.CreatePlantView.as_view(), name= 'plant_create'),
    path('record/<int:pk>/', views.RecordView.as_view(), name= 'record'),
    path('plant/<int:pk>/', views.RetrievePlantView.as_view(), name= 'plant'),
    path('record/<int:first_pk>/<int:second_pk>/', views.RetrieveRecordView.as_view(), name= 'recordPick'),
    path('token/',  views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # path('record/delete/<int:pk>/', views.RecordDeleteView.as_view(), name= 'record_delete'),

]