# routing.py
from django.urls import path
from . import consumers  # Import your consumer

websocket_urlpatterns = [
    path('ws/notifications/', consumers.NotificationConsumer.as_asgi()),  # WebSocket URL
]