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
    re_path(r'^$', views.home_page, name='home'),
    re_path(r'^app/new_list$', views.new_list, name='new_list'),
    re_path(r'^app/del_list$', views.del_list, name='del_list'),
    re_path(r'^app/(\d+)/new_task$', views.new_task, name='new_task'),
    re_path(r'^app/(\d+)/del_task$', views.del_task, name='del_task'),
    path('admin/', admin.site.urls),
    path('/', include('app.urls')),
]
