"""Donit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.conf.urls import include
from django.urls import path, re_path
from app import views


urlpatterns = [

    path('app/list', views.list_controller, name='list_controller_no_id'),
    path('app/list/<request_id>/', views.list_controller, name='list_controller'),
    path('app/task/<request_id>/', views.task_controller, name='task_controller'),
    path('app/task/', views.task_controller, name='task_controller_no_id'),

    path('admin/', admin.site.urls),
    path('/', include('app.urls')),
    path('login', views.login_function, name='login_function'),
    path('register',  views.registration, name='registration'),
    path('logout',  views.logout_function, name='logout_function'),
]
