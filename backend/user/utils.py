# encoding=utf-8

from rest_framework import status
from rest_framework.views import exception_handler

from user.models import Role, UserRole
from user.serializers import RoleAuthSerializer
from user.serializers import UserLoginSerializer

# these 2 handlers are set default in backend/settings.py


def jwt_response_payload_handler(token, user=None, request=None):
    role_id = UserRole.objects.get(user_id=user.id).role_id
    return {
        "token": token,
        "user": UserLoginSerializer(user).data,
        "auth": RoleAuthSerializer(Role.objects.get(id=role_id)).data["auth"]
    }


def custom_exception_handler(exc, context):
    if hasattr(exc, "detail"):
        if exc.detail == "缺失JWT请求头":
            response = exception_handler(exc, context)
            response.data = {
                "msg": "缺失JWT请求头",
                "data": {}
            }
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return response
        if exc.detail == "Signature has expired.":
            response = exception_handler(exc, context)
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return response
    return exception_handler(exc, context)
