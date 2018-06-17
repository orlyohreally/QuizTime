from .models import Topic, Test, Step
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
from .serializers import RegistrationSerializer, LoginSerializer, UserSerializer, TopicSerializer, TestSerializer, StepSerializer, TopicSelectSerializer
from rest_framework.generics import RetrieveUpdateAPIView
from django.utils import timezone
import datetime

class RegistrationAPIView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    renderer_classes = (UserJSONRenderer,)
    def post(self, request):
        print(request.POST)
        print(request.data)
        print(request.data.get('user', {}))
        user = request.data.get('user', {});
        #user.email = request.data.get('email')
        #user.password = request.data.get('password')
        try:
            print(request.data.get('user', {}))
            
        except:
            print('no')
        #user = request.data.get('user', {})
        
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LoginAPIView(APIView):
    permission_classes = (AllowAny,)
    renderer_classes = (UserJSONRenderer,)
    serializer_class = LoginSerializer

    def post(self, request):
        user = request.data.get('user', {});

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

    def perform_create(self, serializer):
        serializer.save(creator = self.request.user)


# class UserViewSet(viewsets.ReadOnlyModelViewSet):
    # queryset = User.objects.all()
    # serializer_class = UserSerializer
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
    
class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

def main_page_template(request):	
	return render(request, "tests\main-page.html", {})
def quizzes_template(request):	
	return render(request, "tests\search-page.html", {})