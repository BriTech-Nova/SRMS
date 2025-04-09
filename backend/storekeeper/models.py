from django.db import models

class ExerciseBook(models.Model):
    type = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField(default=0)
    issued = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.type} Exercise Book"

class LearningMaterial(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    quantity = models.PositiveIntegerField(default=0)
    issued = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

class TeacherNoteBook(models.Model):
    teacher_id = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(default=0)
    issued = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Notebook for Teacher {self.teacher_id}"

class MaterialOrderRequest(models.Model):
    item_name = models.CharField(max_length=255)
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order for {self.item_name}"