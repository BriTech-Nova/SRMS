from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.utils import timezone

router = DefaultRouter()
router.register(r'books', views.BookViewSet, basename='book')
router.register(r'loans', views.LoanViewSet, basename='loan')
router.register(r'orders', views.OrderRequestViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)