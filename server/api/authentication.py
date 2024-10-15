from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import APIKey

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Get the 'Authorization' header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header:
            return None  # No 'Authorization' header provided, skip authentication

        # Split the Authorization header to separate the scheme from the API key
        try:
            auth_type, api_key = auth_header.split(' ')
        except ValueError:
            raise AuthenticationFailed('Invalid Authorization header format.')

        # Ensure the correct prefix is used (we expect "API_KEY")
        if auth_type.lower() != 'api_key':
            raise AuthenticationFailed('Invalid authorization scheme. Expected "API_KEY".')

        # Validate the API key
        try:
            api_key_obj = APIKey.objects.get(key=api_key)
            return (api_key_obj.user, None)  # Return the associated user if the API key is valid
        except APIKey.DoesNotExist:
            raise AuthenticationFailed('Invalid API key')
