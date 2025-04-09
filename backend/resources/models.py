from django.db import models

class ResourceRequest(models.Model):
    teacher_name = models.CharField(max_length=255)
    resource_type = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    comments = models.TextField(blank=True, null=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Pending', 'Pending'),
            ('Approved', 'Approved'),
            ('Rejected', 'Rejected'),
            ('Completed', 'Completed'),
        ],
        default='Pending'
    )

    def __str__(self):
        return f"{self.teacher_name} - {self.resource_type} ({self.quantity})"

class LabBooking(models.Model):
    lab = models.CharField(max_length=50)
    time = models.TimeField()
    booked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.lab} at {self.time}"