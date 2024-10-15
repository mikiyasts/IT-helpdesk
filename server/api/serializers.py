from rest_framework import serializers

from django.contrib.auth import get_user_model
# from django.contrib.auth.models import User
User = get_user_model()

#user authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email',"department","branch"]
        
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

class TicketSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)
    category = TicketCategorySerializer()

    class Meta:
        model = Ticket
        fields = ['id', 'title', 'description', 'status', 'created_at', 'updated_at', 'category', 'assigned_to', 'created_by']

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
        