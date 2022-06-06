from django import views
from django.urls import path, include
from .views import (
    TodoListApiView,
    TodoDetailApiView
)
from . import views


urlpatterns = [
    path('api', TodoListApiView.as_view()),
    path('api/<int:todo_id>', TodoDetailApiView.as_view()),
    path('', views.show, name='show'),
    path('login/', views.login, name='lgn'),
    path('logout/', views.logout, name='logout'),
    path('registiration/', views.registiration, name='registiration'),
    path('forgot/', views.forgot_psw, name='forgot'),


]
