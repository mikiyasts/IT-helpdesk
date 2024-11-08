
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import CustomTokenObtainPairView, SubmitSolutionView

urlpatterns = [
  path('',views.api_endpoints),
  path('signup/', views.signup),
  path('login/', views.login),
  path('getuser/', views.GetUserView.as_view()),
  path('logout/',views.logout),
  path('generate-apikey/',views.GenerateAPIKeyView.as_view()),
  path('SendSMS/',views.send_message_view),
   
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
  path('my_ticket/', views.my_ticket),
  path('submit_solution/<int:ticket_id>/', SubmitSolutionView.as_view() ),
  path('update_ticket_history/<int:id>/',views.ticket_status_history),
  path('list_ticket_history/<int:id>/',views.solutions),
  path('accept_ticket/<int:id>/',views.acceptticket),
  path('check_pending_tickets/',views.check_pending_tickets),
  path('close_ticket/<int:id>/',views.close_ticket),
  
  
  
  path('admin-dashboard/', views.admin_dashboard),
  path('systemusers/', views.get_all_users),
  path('edituser/<str:pk>/', views.edit_user),
  
  path('departments/',views.departments),
  path('create_department/',views.create_department),
  path('edit_department/<int:pk>/', views.edit_department),
  
  path('notifications/', views.ListNotificationsView.as_view()),
  path('notifications/<int:pk>/mark-as-read/', views.MarkNotificationAsReadView.as_view()),

] 