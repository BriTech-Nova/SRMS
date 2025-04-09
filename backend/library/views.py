from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Book, Loan, OrderRequest
from .serializers import BookSerializer, LoanSerializer, OrderRequestSerializer
from rest_framework.decorators import action
from django.http import HttpResponse
import csv

class OrderRequestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Example CSV Report
    @action(detail=False, methods=['GET'])
    def report(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="library_report.csv"'
        writer = csv.writer(response)
        writer.writerow(['Title', 'Author', 'ISBN', 'Quantity', 'Available', 'Loaned']) # Header
        books = Book.objects.all()
        for book in books:
            loaned_count = Loan.objects.filter(book=book, return_date__isnull=True).count()
            writer.writerow([book.title, book.author, book.isbn, book.quantity, book.available, loaned_count])
        return response