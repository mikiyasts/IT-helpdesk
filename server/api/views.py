from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
import secrets
from .authentication import APIKeyAuthentication
from tickets.models import Ticket,TicketCategory
from .serializers import DepartmentSerializer, RecentTicketSerializer, TicketCategorySerializer, TicketSerializer, UserGetSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from users.models import Department, User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt, datetime
from .models import APIKey
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import JWTUserSerializer
from users.models import User
from .serializers import NotificationSerializer
from notifications.models import Notification
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def api_endpoints(request):
    endpoints = {
        "signup": "/signup/",
        "login": "/login/",
        "to get token":"/token/",
        "to refresh token":"/token/refresh/",
        "to get authenticated user":"/getuser/",
        "list_ticket": "/list_ticket/",
        "create_ticket": "/create_ticket/",
        "ticket": "/list_ticket/<int:pk>/",
        "edit_ticket": "/edit_ticket/<int:pk>/",
        "list_ticket_category": "/list_ticket_category/",
        "create_ticket_category": "/create_ticket_category/",
        "list_ticket_category_detail": "/list_ticket_category_detail/<int:pk>/",
        "delete_ticket_category": "/delete_ticket_category/<int:pk>/",
    }
    return Response(endpoints)
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class GenerateAPIKeyView(APIView):
    def post(self, request):
        user = request.user
        api_key, created = APIKey.objects.get_or_create(user=user)
        if created:
            api_key.key = secrets.token_urlsafe(32)
            api_key.save()
        elif not api_key.key:
            api_key.key = secrets.token_urlsafe(32)
            api_key.save()
        return Response({'api_key': api_key.key})
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})
    return Response(serializer.errors, status=status.HTTP_200_OK)
class GetUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Assuming you have a custom User model with a 'role' field
        # or a separate Role model with a foreign key to User
        role = user.role  # or user.userprofile.role, etc.
        return Response({'username': user.username, 'role': role})
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def login(request):
    user = get_object_or_404(User, email=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response("missing user", status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    response = Response({'token': token.key,'user': serializer.data})
    
    
    response.set_cookie(
    key='auth_token',
    value=token.key,
    path='/',
    httponly=True,         
    samesite='Lax'      # Change to 'Lax' or 'None' based on your requirements
)

    
    return response
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    # Retrieve the token from cookies
    token_key = request.COOKIES.get('auth_token')

    if token_key:
        try:
            token = Token.objects.get(key=token_key)
            token.delete()  # Delete the token to log out the user

            # Clear the cookie
            response = Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
            response.delete_cookie('auth_token')  # Clear the cookie
            return response

        except Token.DoesNotExist:
            return Response({'error': 'Token does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'User is not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def GetUser(request):
    token = request.COOKIES.get('auth_token')
    print(f"Received token: {token}")  # Add debug logging

    if token:
        try:
            user = Token.objects.get(key=token).user
            serializer = UserGetSerializer(user)
            return Response(serializer.data)
        except Token.DoesNotExist:
            print("Token not found")  # Add debug logging
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    else:
        print("No token provided")  # Add debug logging
        return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)



#views for ticket API
@api_view(['POST'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def create_ticket(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def list_tickets(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def ticket(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets)

    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def edit_ticket(request, pk):
    ticket=Ticket.objects.get(id=pk)
    serializer = TicketSerializer(ticket, data=request.data, partial=True)  # `partial=True` for partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#views for ticket category
@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def list_ticket_category(request):
    ticket_category = TicketCategory.objects.all()
    serializer = TicketCategorySerializer(ticket_category, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def create_ticket_category(request):
    serializer = TicketCategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def list_ticket_category_detail(request,pk):
    ticket_category = TicketCategory.objects.get(id=pk)
    serializer = TicketCategorySerializer(ticket_category)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def departments(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])

def delete_ticket_category(request,pk):
    ticket_category = TicketCategory.objects.get(id=pk)
    ticket_category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)




## Admin API

@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):
    # Count ticket status
    open_tickets = Ticket.objects.filter(status='Open').count()
    in_progress_tickets = Ticket.objects.filter(status='In Progress').count()
    closed_tickets = Ticket.objects.filter(status='Closed').count()

    # Count requests from each branch
    kaliti_requests = User.objects.filter(branch='kaliti').count()
    lideta_requests = User.objects.filter(branch='lideta').count()
    mekanissa_requests = User.objects.filter(branch='mekanissa').count()
    farm_requests = User.objects.filter(branch='farm').count()

    # Get category counts
    categories = TicketCategory.objects.all()
    category_counts = {}
    for category in categories:
        category_counts[category.name] = Ticket.objects.filter(category=category).count()

    # Get recent 10 requests
    recent_requests = Ticket.objects.all().order_by('-created_at')[:10]
    recent_requests_serializer = RecentTicketSerializer(recent_requests, many=True)

    # Create response data
    data = {
        'ticket_status': {
            'open': open_tickets,
            'in_progress': in_progress_tickets,
            'closed': closed_tickets
        },
        'branch_requests': {
            'Kaliti': kaliti_requests,
            'Lideta': lideta_requests,
            'Mekanissa': mekanissa_requests,
            'Farm': farm_requests
        },
        'categories': category_counts,
        'recent_requests': recent_requests_serializer.data
    }

    return Response(data)



#users
@api_view(['GET'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = User.objects.all()  
    user_data = []
    
    for user in users:
        user_data.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'phone_number': user.phone_number,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
            'branch': user.branch,
            'department': user.department.name if user.department else None, 
            'role': user.role,
        })
    
    return Response(user_data, status=status.HTTP_200_OK)

#edit user
@api_view(['PATCH'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def edit_user(request, pk):
    try:
        user = User.objects.get(id=pk)  # Get the user by primary key
    except User.DoesNotExist:
        return Response({'detail': 'User  not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Use a serializer to validate and update the user
    serializer = UserSerializer(user, data=request.data, partial=True)  # partial=True allows for partial updates
    if serializer.is_valid():
        serializer.save()  # Save the updated user
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Return validation errors if the serializer is not valid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListNotificationsView(APIView):
    permission_classes = [IsAuthenticated]
    @authentication_classes([APIKeyAuthentication])

    def get(self, request):
        notifications = Notification.objects.filter(user=request.user,read=False).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class MarkNotificationAsReadView(APIView):
    permission_classes = [IsAuthenticated]
    @authentication_classes([APIKeyAuthentication])

    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.read = True
            notification.save()
            return Response({'status': 'notification marked as read'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found or does not belong to the user'}, status=status.HTTP_404_NOT_FOUND)