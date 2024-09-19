
from django.urls import path,include
from . import views

urlpatterns = [
  path('',views.api_endpoints),
  path('signup/', views.signup),
  path('login/', views.login),
  path('getuser/', views.GetUser),
  path('logout/',views.logout),
  
  
  
  
  path('list_ticket/', views.list_tickets),
  path('create_ticket/', views.create_ticket),
  path('list_ticket/<int:pk>/',views.ticket),
  path('edit_ticket/<int:pk>/',views.edit_ticket),
  
  
  
  
  path('list_ticket_category/', views.list_ticket_category),
  path('create_ticket_category/', views.create_ticket_category),
  path('list_ticket_category_detail/<int:pk>/', views.list_ticket_category_detail),
  path('delete_ticket_category/<int:pk>/', views.delete_ticket_category),
   
] 