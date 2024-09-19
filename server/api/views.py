from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from tickets.models import Ticket,TicketCategory
from .serializers import TicketCategorySerializer, TicketSerializer, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from users.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt, datetime
@api_view(['GET'])
def api_endpoints(request):
    endpoints = {
        "signup": "/signup/",
        "login": "/login/",
        "test_token": "/test_token/",
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

@api_view(['POST'])
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

@api_view(['POST'])
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
    secure=True,           
    samesite='Lax'         
)

    
    return response
@api_view(['GET'])
def GetUser(request):
    token = request.COOKIES.get('auth_token')
    print(f"Received token: {token}")  # Add debug logging

    if token:
        try:
            user = Token.objects.get(key=token).user
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except Token.DoesNotExist:
            print("Token not found")  # Add debug logging
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    else:
        print("No token provided")  # Add debug logging
        return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")




#views for ticket API
@api_view(['POST'])
def create_ticket(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_tickets(request):
    tickets = Ticket.objects.all()
    serializer = TicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def ticket(request, pk):
    tickets = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(tickets)

    return Response(serializer.data)

@api_view(['POST'])
def edit_ticket(request, pk):
    ticket=Ticket.objects.get(id=pk)
    serializer = TicketSerializer(ticket, data=request.data, partial=True)  # `partial=True` for partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#views for ticket category
@api_view(['GET'])
def list_ticket_category(request):
    ticket_category = TicketCategory.objects.all()
    serializer = TicketCategorySerializer(ticket_category, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
def create_ticket_category(request):
    serializer = TicketCategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def list_ticket_category_detail(request,pk):
    ticket_category = TicketCategory.objects.get(id=pk)
    serializer = TicketCategorySerializer(ticket_category)
    return Response(serializer.data)



@api_view(['DELETE'])
def delete_ticket_category(request,pk):
    ticket_category = TicketCategory.objects.get(id=pk)
    ticket_category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)