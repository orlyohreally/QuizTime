from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from tests import views

schema_view = get_schema_view(title='Quiz Time API')

router = DefaultRouter()
router.register(r'quizzes', views.TestViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'topics', views.TopicViewSet)
router.register(r'steps', views.StepViewSet)

urlpatterns = [
    url(r'auth/', include('rest_framework.urls')),
    url(r'^schema/$', schema_view),
    url(r'^', include(router.urls)),
    url(r'^template', views.template),
]