from django.contrib import admin
from django.urls import path,include
from home import views

urlpatterns = [
    path('', views.home, name="home"),
    path('login/', views.login_user, name="login_user"),
    path('signup/', views.signup, name="signup"),
    path('available_cars/', views.avail_cars, name="avail_cars"),
]