from django.contrib import admin
from .models import ChatMessage, ChatSession, Attachment

admin.site.register(ChatMessage)
admin.site.register(ChatSession)
admin.site.register(Attachment)
