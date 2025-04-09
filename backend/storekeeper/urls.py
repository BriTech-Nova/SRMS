from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'exercise-books', views.ExerciseBookViewSet, basename='exercise-book')
router.register(r'learning-materials', views.LearningMaterialViewSet, basename='learning-material')
router.register(r'teacher-notebooks', views.TeacherNoteBookViewSet, basename='teacher-notebook')
router.register(r'order-requests', views.MaterialOrderRequestViewSet, basename='order-request')

urlpatterns = [
    path('', include(router.urls)),
]