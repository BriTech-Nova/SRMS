from rest_framework import viewsets
from .models import ResourceRequest, LabBooking
from .serializers import ResourceRequestSerializer, LabBookingSerializer

class ResourceRequestViewSet(viewsets.ModelViewSet):
    queryset = ResourceRequest.objects.all().order_by('-requested_at')
    serializer_class = ResourceRequestSerializer

class LabBookingViewSet(viewsets.ModelViewSet):
    queryset = LabBooking.objects.all().order_by('-booked_at')
    serializer_class = LabBookingSerializer