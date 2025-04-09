from rest_framework import serializers
from .models import Book, Loan, OrderRequest

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        read_only_fields = ['id', 'available']  # 'available' will be calculated on the backend

class LoanSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True, default=None)

    class Meta:
        model = Loan
        fields = '__all__'
        read_only_fields = ['id', 'borrow_date']

class OrderRequestSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True, default=None)

    class Meta:
        model = OrderRequest
        fields = '__all__'
        read_only_fields = ['id', 'request_date']