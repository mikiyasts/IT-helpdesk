from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
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
        
        # Notify users based on their roles
        it_officer=User.objects.filter(role='it_officer')
        for it_officers in it_officer:
            Notification.objects.create(
                user=it_officers,
                message=f"A new ticket '{instance.title}' has been assigned to you.",
                notification_type='Ticket'
            )
        
        # Notify all admins
        admins = User.objects.filter(role='admin')
        for admin in admins:
            Notification.objects.create(
                user=admin,
                message=f"A new ticket '{instance.title}' has been created by {instance.created_by.username}.",
                notification_type='Ticket'
            )