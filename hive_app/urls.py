from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('keepers', views.KeeperView)
router.register('hives', views.HiveView)
router.register('bees', views.BeeView)

urlpatterns = [
    path('', include(router.urls))
]