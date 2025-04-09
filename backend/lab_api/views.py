from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Equipment, Booking
from .serializers import EquipmentSerializer, BookingSerializer

class EquipmentViewSet(viewsets.ModelViewSet):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=True, methods=['POST'])
    def approve(self, request, pk=None):
        try:
            booking = self.get_object()
            booking.status = 'approved'
            booking.save()
            return Response({'message': f'Booking {booking.id} approved'}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['POST'])
    def reject(self, request, pk=None):
        try:
            booking = self.get_object()
            booking.status = 'rejected'
            booking.save()
            return Response({'message': f'Booking {booking.id} rejected'}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)