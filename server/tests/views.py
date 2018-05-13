from tests.models import Test, Topic, Step
from django.contrib.auth.models import User
from tests.serializers import TestSerializer, UserSerializer, TopicSerializer, StepSerializer
from rest_framework import permissions
from tests.permissions import IsCreatorOrReadOnly
from rest_framework.decorators import api_view, detail_route
from rest_framework.reverse import reverse
from rest_framework import renderers
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from django.shortcuts import render

class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly,)

    # @detail_route(renderer_classes = [renderers.StaticHTMLRenderer])
    # def name(self, request, *args, **kwargs):
        # test = self.get_object()
        # return Response(test.name)

    def perform_create(self, serializer):
        serializer.save(creator = self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    def perform_create(self, serializer):
        serializer.save(creator = self.request.user)

class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

def main_page_template(request):	
	return render(request, "tests\main-page.html", {})
def quizzes_template(request):	
	return render(request, "tests\search-page.html", {})