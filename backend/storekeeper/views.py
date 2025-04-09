from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ExerciseBook, LearningMaterial, TeacherNoteBook, MaterialOrderRequest
from .serializers import ExerciseBookSerializer, LearningMaterialSerializer, TeacherNoteBookSerializer, MaterialOrderRequestSerializer

class ExerciseBookViewSet(viewsets.ModelViewSet):
    queryset = ExerciseBook.objects.all()
    serializer_class = ExerciseBookSerializer

    @action(detail=True, methods=['POST'])
    def issue(self, request, pk=None):
        try:
            book = self.get_object()
            issue_quantity = int(request.data.get('quantity', 1))
            if book.quantity >= issue_quantity:
                book.quantity -= issue_quantity
                book.issued += issue_quantity
                book.save()
                return Response({'message': f'Issued {issue_quantity} {book.type} exercise books'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Not enough books in stock'}, status=status.HTTP_400_BAD_REQUEST)
        except ExerciseBook.DoesNotExist:
            return Response({'error': 'Exercise book not found'}, status=status.HTTP_404_NOT_FOUND)

class LearningMaterialViewSet(viewsets.ModelViewSet):
    queryset = LearningMaterial.objects.all()
    serializer_class = LearningMaterialSerializer

    @action(detail=True, methods=['POST'])
    def issue(self, request, pk=None):
        try:
            material = self.get_object()
            issue_quantity = int(request.data.get('quantity', 1))
            if material.quantity >= issue_quantity:
                material.quantity -= issue_quantity
                material.issued += issue_quantity
                material.save()
                return Response({'message': f'Issued {issue_quantity} {material.name}'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Not enough materials in stock'}, status=status.HTTP_400_BAD_REQUEST)
        except LearningMaterial.DoesNotExist:
            return Response({'error': 'Learning material not found'}, status=status.HTTP_404_NOT_FOUND)

class TeacherNoteBookViewSet(viewsets.ModelViewSet):
    queryset = TeacherNoteBook.objects.all()
    serializer_class = TeacherNoteBookSerializer

    @action(detail=True, methods=['POST'])
    def issue(self, request, pk=None):
        try:
            notebook = self.get_object()
            issue_quantity = int(request.data.get('quantity', 1))
            if notebook.quantity >= issue_quantity:
                notebook.quantity -= issue_quantity
                notebook.issued += issue_quantity
                notebook.save()
                return Response({'message': f'Issued {issue_quantity} notebooks to Teacher {notebook.teacher_id}'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Not enough notebooks in stock'}, status=status.HTTP_400_BAD_REQUEST)
        except TeacherNoteBook.DoesNotExist:
            return Response({'error': 'Teacher notebook not found'}, status=status.HTTP_404_NOT_FOUND)

class MaterialOrderRequestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MaterialOrderRequest.objects.all()
    serializer_class = MaterialOrderRequestSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()