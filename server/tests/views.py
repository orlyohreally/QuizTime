from .models import Topic, Test, Step, Subject
from rest_framework import permissions, status
from .permissions import IsCreatorOrReadOnly
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, detail_route, action
from rest_framework.reverse import reverse
from rest_framework import renderers, viewsets
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from .renderers import UserJSONRenderer
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer, TopicSerializer, TestSerializer, StepSerializer, TopicSelectSerializer, SubjectSelectSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from django.utils import timezone
import datetime
from django.shortcuts import get_object_or_404
class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer,)
    def post(self, request):
        user = request.data.get('user', {});
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        print(request.data, request.data.get('user', {}))
        user = request.data.get('user', {});
        if(user == None):
            user = {"email":"admin@gmail.com", "password":"Ab123456"}
        # Notice here that we do not call `serializer.save()` like we did for
        # the registration endpoint. This is because we don't  have
        # anything to save. Instead, the `validate` method on our serializer
        # handles everything we need.
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
class TestViewSet(viewsets.ModelViewSet):
    queryset = Test.objects.filter(pub_date__lte=datetime.datetime.now(tz=timezone.utc))
    serializer_class = TestSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly,)
    def get_queryset(self):
        queryset = Test.objects.filter(pub_date__lte=datetime.datetime.now(tz=timezone.utc))
        topic = self.request.query_params.get('topic')
        if topic != None:
            queryset.filter(topic = topic)
        return queryset
    
    def perform_create(self, serializer):
        print('look', self.request)
        serializer.save(creator = self.request.user)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        # There is nothing to validate or save here. Instead, we just want the
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer_data = request.data.get('user', {})

        # Here is that serialize, validate, save pattern we talked about
        # before.
        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)   
class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    def perform_create(self, serializer):
        serializer.save(creator = self.request.user)
        
class TopicSelectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSelectSerializer
    permission_classes = (AllowAny, )
    pagination_class = None

class SubjectSelectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSelectSerializer
    permission_classes = (AllowAny, )
    pagination_class = None
    @detail_route()
    def subjects_by_topic(self, request, pk):
        topic = get_object_or_404(Topic, pk = pk)
        tests = Test.objects.filter(topic=topic)
        subjects = Subject.objects.filter(test_id__in=tests)
        subjects_json = SubjectSelectSerializer(subjects, many=True)
        return Response(subjects_json.data)
        
    
class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

def main_page_template(request):	
	return render(request, "tests\main-page.html", {})
def quizzes_template(request):	
	return render(request, "tests\search-page.html", {})