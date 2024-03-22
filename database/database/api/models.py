from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("The email is not given.")
        if not password:
            raise ValueError("User must have a password")
        email = self.normalize_email(email)
        user = self.model(email=email.lower(), **extra_fields)
        user.is_active = True
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if not extra_fields.get('is_staff'):
            raise ValueError("Superuser must have is_staff = True")

        if not extra_fields.get('is_superuser'):
            raise ValueError("Superuser must have is_superuser = True")
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):

    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    farmName = models.CharField(max_length=150, blank=True, null=True)
    farmLocation = models.CharField(max_length=150, blank=True, null=True)
    farmSize = models.FloatField(blank=True, null=True)
    username = models.CharField(max_length=150, unique=False, blank=True, null=True)

    # gender = models.SmallIntegerField(choices=GENDER_CHOICES)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

class Plant (models.Model):
    plantName = models.CharField(max_length=50)
    datePlanted = models.DateField()
    created = models.DateTimeField(auto_now_add=True, null=True)
    farmer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.plantName

class Record (models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE)
    date = models.DateField()
    height = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    soilMoisture = models.FloatField()
    image = models.ImageField(upload_to='post_images')

    @property
    def plantName(self):
        return self.plant.plantName

    def __str__(self):
        return str(self.plant) + ' - ' + str(self.date)