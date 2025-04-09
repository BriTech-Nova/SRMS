from django.db import models

class InventoryItem(models.Model):
    item_name = models.CharField(max_length=255, unique=True)
    quantity = models.PositiveIntegerField(default=0)
    status = models.CharField(
        max_length=20,
        choices=[
            ('In Stock', 'In Stock'),
            ('Out of Stock', 'Out of Stock'),
            ('Damaged', 'Damaged'),
        ],
        default='In Stock'
    )

    def __str__(self):
        return self.item_name