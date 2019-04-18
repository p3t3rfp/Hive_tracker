from django.contrib import admin
from .models import Keeper, Hive, Bee


# Register your models here.

admin.site.register([Keeper, Hive, Bee])