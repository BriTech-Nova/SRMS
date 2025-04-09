from rest_framework import serializers
from .models import ResourceRequest, LabBooking

class ResourceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceRequest
        fields = '__all__'
        read_only_fields = ['requested_at', 'status'] # These fields should not be directly set during creation

class LabBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabBooking
        fields = '__all__'
        read_only_fields = ['booked_at']