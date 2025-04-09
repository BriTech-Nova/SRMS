from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=20, unique=True)
    quantity = models.PositiveIntegerField(default=0)
    available = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Loan(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrower_type = models.CharField(
        max_length=10,
        choices=[
            ('teacher', 'Teacher'),
            ('class', 'Class'),
            ('learner', 'Learner'),
        ]
    )
    borrower_id = models.PositiveIntegerField()
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.book.title} - {self.borrower_type} {self.borrower_id}"

class OrderRequest(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order for {self.book.title}"