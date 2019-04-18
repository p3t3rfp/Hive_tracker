from django.db import models

# Create your models here.

class Keeper(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=400)

    def __str__(self):
        return self.name


class Hive(models.Model):
    name = models.CharField(max_length=100, default='Hive Name')
    installed_date = models.DateField()
    number_of_frames = models.IntegerField()
    annual_production = models.IntegerField()
    last_harvested = models.DateField()
    number_of_bees = models.IntegerField()
    image = models.CharField(max_length=400)
    keeper = models.ForeignKey(Keeper, on_delete=models.CASCADE, related_name='hives')

    def __str__(self):
        return self.name


class Bee(models.Model):
    species = models.CharField(max_length=100)
    image = models.CharField(max_length=400)
    hive = models.ForeignKey(Hive, on_delete=models.CASCADE, related_name='bees')

    def __str__(self):
        return self.species