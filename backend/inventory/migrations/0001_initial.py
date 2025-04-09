# Generated by Django 5.1.7 on 2025-04-09 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InventoryItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(max_length=255, unique=True)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('status', models.CharField(choices=[('In Stock', 'In Stock'), ('Out of Stock', 'Out of Stock'), ('Damaged', 'Damaged')], default='In Stock', max_length=20)),
            ],
        ),
    ]
