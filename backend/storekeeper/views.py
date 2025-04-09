from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import ExerciseBook, LearningMaterial, TeacherNoteBook, MaterialOrderRequest
from .serializers import ExerciseBookSerializer, LearningMaterialSerializer, TeacherNoteBookSerializer, MaterialOrderRequestSerializer
from rest_framework.decorators import action
from django.http import HttpResponse
import csv # For CSV reports
from django.template.loader import get_template
from xhtml2pdf import pisa # For PDF reports (install xhtml2pdf)

class MaterialOrderRequestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MaterialOrderRequest.objects.all()
    serializer_class = MaterialOrderRequestSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Example CSV Report
    @action(detail=False, methods=['GET'])
    def report(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="storekeeper_report.csv"'
        writer = csv.writer(response)
        writer.writerow(['Item Name', 'Quantity', 'Issued']) # Header row
        exercise_books = ExerciseBook.objects.all()
        learning_materials = LearningMaterial.objects.all()
        teacher_notebooks = TeacherNoteBook.objects.all()
        for book in exercise_books:
            writer.writerow([f"{book.type} Exercise Book", book.quantity, book.issued])
        for material in learning_materials:
            writer.writerow([material.name, material.quantity, material.issued])
        for notebook in teacher_notebooks:
            writer.writerow([f"Notebook for Teacher {notebook.teacher_id}", notebook.quantity, notebook.issued])
        return response

    # Example PDF Report (requires xhtml2pdf)
    @action(detail=False, methods=['GET'])
    def pdf_report(self, request):
        template_path = 'storekeeper_report.html' # Create this template
        exercise_books = ExerciseBook.objects.all()
        learning_materials = LearningMaterial.objects.all()
        teacher_notebooks = TeacherNoteBook.objects.all()
        context = {'exercise_books': exercise_books, 'learning_materials': learning_materials, 'teacher_notebooks': teacher_notebooks}
        template = get_template(template_path)
        html = template.render(context)
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="storekeeper_report.pdf"'
        pisa_status = pisa.CreatePDF(html.encode('utf-8'), dest=response, link_callback=lambda uri, root: uri) # Basic link callback
        if pisa_status.err:
            return HttpResponse('We had some errors <pre>' + html + '</pre>')
        return response