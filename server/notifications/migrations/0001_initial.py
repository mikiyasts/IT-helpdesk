# Generated by Django 5.1 on 2024-08-28 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField()),
                ('read', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('notification_type', models.CharField(choices=[('Ticket', 'Ticket'), ('Chat', 'Chat'), ('System', 'System')], default='System', max_length=20)),
            ],
        ),
    ]
