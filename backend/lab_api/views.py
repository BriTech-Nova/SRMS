from rest_framework import viewsets
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.decorators import action
from django.http import HttpResponse
import csv

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=True, methods=['POST'])
    def approve(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'approved'
        booking.save()
    def reject(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'rejected'
        booking.save()
        return Response({'status': 'Booking rejected'})
    def report(self, request):
        # Accessing request to avoid unused parameter warning
        user = request.user
        # ... (your reject logic)

    # Example CSV Report
    @action(detail=False, methods=['GET'])
    def report(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="lab_report.csv"'
        writer = csv.writer(response)
        writer.writerow(['Teacher Name', 'Equipments', 'Date', 'Time', 'Status']) # Header
        bookings = Booking.objects.all()
        for booking in bookings:
            equipment_names = [eq.name for eq in booking.equipment.all()]
            writer.writerow([booking.teacher_name, ", ".join(equipment_names), booking.date, booking.time, booking.status])
        return response