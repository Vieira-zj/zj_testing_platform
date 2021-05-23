# encoding=utf-8

from django.db.models import Q
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from teprunner.models import EnvVar
from teprunner.serializers import EnvVarSerializer


class EnvVarViewSet(ModelViewSet):
    queryset = EnvVar.objects.all()
    serializer_class = EnvVarSerializer

    def list(self, request, *args, **kwargs):
        # 从前端请求拿到curProjectId和curEnvName, 通过 EnvVar.objects.filter 进行过滤
        project_id = request.GET.get("curProjectId")
        env_name = request.GET.get("curEnvName")
        queryset = EnvVar.objects.filter(
            Q(project_id=project_id) & Q(env_name=env_name))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
