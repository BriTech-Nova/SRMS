from rest_framework import serializers
from .models import ExerciseBook, LearningMaterial, TeacherNoteBook, MaterialOrderRequest

class ExerciseBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseBook
        fields = '__all__'
        read_only_fields = ['id']

class LearningMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningMaterial
        fields = '__all__'
        read_only_fields = ['id']

class TeacherNoteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherNoteBook
        fields = '__all__'
        read_only_fields = ['id']

class MaterialOrderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialOrderRequest
        fields = '__all__'
        read_only_fields = ['id', 'request_date']