from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User, Department
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from notifications.models import Notification


# from django.contrib.auth.models import User
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name']

#user authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email',"department","branch","phone_number","role"]
     
class CreateTicketUserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model=User
        fields=['id','username']   
class UserGetSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = '__all__'


#ticket app
from rest_framework import serializers
from tickets.models import Ticket, TicketCategory, TicketComment, TicketHistory, Attachment
  # Assuming you have a UserSerializer

class TicketCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketCategory
        fields = ['id', 'name', 'description', 'image']
class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['file', 'uploaded_at',]



class TicketCommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    parent = serializers.PrimaryKeyRelatedField(queryset=TicketComment.objects.all(), required=False, allow_null=True)

    class Meta:
        model = TicketComment
        fields = ['id', 'ticket', 'author', 'content', 'created_at', 'parent']

class TicketHistorySerializer(serializers.ModelSerializer):
    updated_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TicketHistory
        fields = ['id', 'ticket', 'updated_at', 'updated_by', 'field_name', 'old_value', 'new_value']

class TicketAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at', 'ticket']

class TicketSerializer(serializers.ModelSerializer):
    attachments=TicketAttachmentSerializer(many=True,read_only=True)
    created_by = CreateTicketUserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=TicketCategory.objects.all())


    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at', 'category', 'assigned_to', 'created_by','attachments']
class RecentTicketSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    department = serializers.StringRelatedField(source='department.name')
    category = serializers.StringRelatedField(source='category.name')

    class Meta:
        model = Ticket
        fields = ['created_by', 'category', 'department', 'created_at']

    def get_created_by(self, obj):
        user = obj.created_by
        return {
            'username': user.username,
            'department': user.department.name if user.department else None,
            'branch': user.branch  if user.branch else None,
        }
   
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  # Optional: include username in the token
        return token

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid username or password.')

        # If we reach here, authentication was successful
        data = super().validate(attrs)  # Call original validation for JWT token generation

        # Serialize user details
        user_serializer = JWTUserSerializer(user)
        data.update(user_serializer.data)  # Add user details to the response

        return data
    
class JWTUserSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()  # Nested serializer for department details

    class Meta:
        model = User
        fields = ['id','username', 'email', 'department', 'role']
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'read', 'created_at', 'notification_type']
class MyTicketSerializer(serializers.ModelSerializer):
    attachments=TicketAttachmentSerializer(many=True,read_only=True)
    created_by = CreateTicketUserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=TicketCategory.objects.all())


    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at', 'category', 'assigned_to', 'created_by','attachments']