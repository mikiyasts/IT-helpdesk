from django.db import models

from users.models import User

class ChatSession(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Closed', 'Closed'),
        ('Pending', 'Pending'),
    ]

    user = models.ForeignKey(User, related_name='chat_sessions', on_delete=models.CASCADE)
    support_agent = models.ForeignKey(User, related_name='assigned_chat_sessions', null=True, blank=True, on_delete=models.SET_NULL)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    
    def __str__(self):
        return f"Chat session with {self.user} (ID: {self.id})"

class ChatMessage(models.Model):
    chat_session = models.ForeignKey(ChatSession, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender} in chat session {self.chat_session.id}"
class Attachment(models.Model):
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    chat_message = models.ForeignKey(ChatMessage, null=True, blank=True, related_name='attachments', on_delete=models.CASCADE)
