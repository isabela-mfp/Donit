from django.urls import path
from app import views


urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_function, name='login_function'),
    path('register',  views.registration, name='registration'),
    path('logout',  views.logout_function, name='logout_function'),
]