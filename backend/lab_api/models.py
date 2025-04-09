from django.db import models

class Equipment(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField(default=0)
    location = models.CharField(max_length=255)
    status = models.CharField(
        max_length=10,
        choices=[
            ('available', 'Available'),
            ('in-use', 'In Use'),
            ('broken', 'Broken'),
        ],
        default='available'
    )

    def __str__(self):
        return self.name

class Booking(models.Model):
    teacher_name = models.CharField(max_length=255)
    equipment = models.ManyToManyField(Equipment)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(
        max_length=10,
        choices=[
            ('pending', 'Pending'),
            ('approved', 'Approved'),
            ('rejected', 'Rejected'),
        ],
        default='pending'
    )

    def __str__(self):
        return f"Booking by {self.teacher_name} on {self.date} at {self.time}"