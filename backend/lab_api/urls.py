from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'equipments', views.EquipmentViewSet, basename='equipment')
router.register(r'bookings', views.BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),
]