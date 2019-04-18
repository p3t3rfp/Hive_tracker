from django.shortcuts import render
from rest_framework import viewsets
from .serializers import KeeperSerializer, HiveSerializer, BeeSerializer
from .models import Keeper, Hive, Bee

# Create your views here.

class KeeperView(viewsets.ModelViewSet):
    queryset = Keeper.objects.all()
    serializer_class = KeeperSerializer

class HiveView(viewsets.ModelViewSet):
    queryset = Hive.objects.all()
    serializer_class = HiveSerializer

class BeeView(viewsets.ModelViewSet):
    queryset = Bee.objects.all()
    serializer_class = BeeSerializer
