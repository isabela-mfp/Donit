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


'''
TODO: Old Pattern, delete after complete refactoring process
    re_path(r'^$', views.home_page, name='index'),
    re_path(r'^$', views.home_page, name='index'),
    re_path(r'^login$', views.login_function, name='login_function'),
    re_path(r'^register$',  views.registration, name='registration'),
    re_path(r'^logout$',  views.logout_function, name='logout_function'),
    re_path(r'^app/new_list$', views.new_list, name='new_list'),
    re_path(r'^app/del_list/(\d+)$', views.del_list, name='del_list'),
    re_path(r'^app/(\d+)/new_task$', views.new_task, name='new_task'),
    re_path(r'^app/(\d+)/del_task$', views.del_task, name='del_task'),
'''

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
