from django.contrib import admin

from .models import Ticket,TicketCategory, TicketComment, TicketHistory, Attachment

admin.site.register(Ticket)
admin.site.register(TicketCategory)
admin.site.register(TicketComment)
admin.site.register(TicketHistory)
admin.site.register(Attachment)
