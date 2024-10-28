
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView
urlpatterns = [
  path('',views.api_endpoints),
  path('signup/', views.signup),
  path('login/', views.login),
  path('getuser/', views.GetUserView.as_view()),
  path('logout/',views.logout),
  path('generate-apikey/',views.GenerateAPIKeyView.as_view()),
   
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
  
  
  
  
  path('list_ticket/', views.list_tickets),
  path('create_ticket/', views.create_ticket),
  path('list_ticket/<int:pk>/',views.ticket),
  path('edit_ticket/<int:pk>/',views.edit_ticket),
  
  
  
  
  path('list_ticket_category/', views.list_ticket_category),
  path('create_ticket_category/', views.create_ticket_category),
  path('list_ticket_category_detail/<int:pk>/', views.list_ticket_category_detail),
  path('delete_ticket_category/<int:pk>/', views.delete_ticket_category),
  
  
  
  path('admin-dashboard/', views.admin_dashboard),
  path('systemusers/', views.get_all_users),
  path('edituser/<str:pk>/', views.edit_user),
   
] 