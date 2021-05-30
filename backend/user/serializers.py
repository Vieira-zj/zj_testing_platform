# encoding=utf-8

from rest_framework import serializers
from user.models import User, Role, UserRole

"""
Serializer 定义db数据与前端json数据序列化操作。
"""


class UserLoginSerializer(serializers.ModelSerializer):
    roleName = serializers.SerializerMethodField()

    class Meta:
        # 对应该模型和需要的字段
        model = User
        fields = ['username', 'nickname', 'roleName']

    def get_roleName(self, instance):
        user_id = instance.id
        role_ids = [
            obj.role_id for obj in UserRole.objects.filter(user_id=user_id)]
        query_set = [Role.objects.get(id=role_id) for role_id in role_ids]
        return ",".join([obj.name for obj in query_set])


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'nickname', 'password', 'is_staff']


class UserPagingSerializer(serializers.ModelSerializer):
    id = serializers.CharField()  # int转str
    roleNames = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'nickname', 'roleNames', 'is_staff']

    def get_roleNames(self, instance):
        user_id = instance.id
        role_ids = [
            obj.role_id for obj in UserRole.objects.filter(user_id=user_id)]
        query_set = [Role.objects.get(id=role_id) for role_id in role_ids]
        return [{"id": obj.id, "name": obj.name} for obj in query_set]


class RoleAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['auth']


class RolePagingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']


class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = ['user_id', 'role_id']
