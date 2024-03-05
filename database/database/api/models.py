from django.db import models

# Create your models here.

class Plant (models.Model):
    plantName = models.CharField(max_length=50)
    datePlanted = models.DateField()
    created = models.DateTimeField(auto_now_add=True, null=True)

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