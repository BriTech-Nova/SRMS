"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'bookings', views.BookingViewSet, basename='booking')
router.register(r'equipments', views.EquipmentViewSet, basename='equipment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('resources.urls')), 
    path('api/inventory/', include('inventory.urls')),
    path('api/library/', include('library.urls')),
    path('api/storekeeper/', include('storekeeper.urls')),
    path('api/lab/', include('lab_api.urls')),
    path('', include(router.urls)),
    path('reports/lab/', views.BookingViewSet.as_view({'get': 'report'}), name='lab_report'),
    path('reports/library/', views.OrderRequestViewSet.as_view({'get': 'report'}), name='library_report'),
    path('reports/storekeeper/', views.MaterialOrderRequestViewSet.as_view({'get': 'report'}), name='storekeeper_report'),
]