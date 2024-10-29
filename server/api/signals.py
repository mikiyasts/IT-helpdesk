# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from tickets.models import Ticket
from notifications.models import Notification
from users.models import User

@receiver(post_save, sender=Ticket)
def create_notification_on_ticket_creation(sender, instance, created, **kwargs):
    if created:
        # Notify the user who created the ticket
        Notification.objects.create(
            user=instance.created_by,
            message=f"Your ticket '{instance.title}' has been created.",
            notification_type='Ticket'
        )

        # Notify IT officers
        it_officers = User.objects.filter(role='it_officer')
        for it_officer in it_officers:
            Notification.objects.create(
                user=it_officer,
                message=f"A new ticket '{instance.title}' has been created by {instance.created_by.username}.",
                notification_type='Ticket'
            )

        # Notify admins
        admins = User.objects.filter(role='admin')
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"A new ticket '{instance.title}' has been created by {instance.created_by.username}.",
                notification_type='Ticket'
            )

        # Send notifications via WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notifications',  # Group name
            {
                'type': 'send_notification',
                'message': f"A new ticket '{instance.title}' has been created."
            }
        )