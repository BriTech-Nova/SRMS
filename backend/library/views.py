from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Book, Loan, OrderRequest
from .serializers import BookSerializer, LoanSerializer, OrderRequestSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        serializer.save(available=serializer.validated_data['quantity'])

    @action(detail=True, methods=['POST'])
    def order(self, request, pk=None):
        try:
            book = self.get_object()
            OrderRequest.objects.create(book=book)
            return Response({'message': f'Order request created for {book.title}'}, status=status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    def perform_create(self, serializer):
        book = serializer.validated_data['book']
        if book.available > 0:
            serializer.save()
            book.available -= 1
            book.save()
        else:
            raise serializers.ValidationError("Book is not available for loan.")

    @action(detail=True, methods=['POST'])
    def return_book(self, request, pk=None):
        try:
            loan = self.get_object()
            if not loan.return_date:
                loan.return_date = request.data.get('return_date') or timezone.now().date()
                loan.save()
                loan.book.available += 1
                loan.book.save()
                return Response({'message': f'{loan.book.title} returned successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': f'{loan.book.title} was already returned on {loan.return_date}'}, status=status.HTTP_200_OK)
        except Loan.DoesNotExist:
            return Response({'error': 'Loan not found'}, status=status.HTTP_404_NOT_FOUND)

class OrderRequestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer