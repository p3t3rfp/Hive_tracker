from rest_framework import serializers

from .models import Keeper, Hive, Bee


class BeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bee
        fields = ('id', 'species', 'image', 'hive')

class HiveSerializer(serializers.ModelSerializer):
    bees = BeeSerializer(many=True, read_only=True)
    class Meta:
        model = Hive
        fields = ('id', 'installed_date', 'number_of_frames', 'annual_production', 'last_harvested', 'number_of_bees', 'image', 'keeper')

class KeeperSerializer(serializers.ModelSerializer):
    hives = HiveSerializer(many=True, read_only=True)
    class Meta:
        model = Keeper
        fields = ('id', 'name', 'location', 'hives')

        