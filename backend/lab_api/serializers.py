from rest_framework import serializers
from .models import Equipment, Booking

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'
        read_only_fields = ['id']

class BookingSerializer(serializers.ModelSerializer):
    equipment = serializers.PrimaryKeyRelatedField(queryset=Equipment.objects.all(), many=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['id']