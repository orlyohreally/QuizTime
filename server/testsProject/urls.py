"""testsProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static

from django.conf.urls import url
from django.contrib import admin
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token
urlpatterns = [	
	url(r'^api/', include('tests.urls')),
	url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
]
if settings.DEBUG:
    urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns +=static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    
#http GET http://127.0.0.1:8000/tests/quizzes/ Authorization: JWT="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiIiLCJ1c2VyX2lkIjoxLCJleHAiOjE1Mjg3OTk3Nzh9._13Fo9hTVzl__i7fqJvOK7T9_gQq9k02P74eARgTix0"

# http GET http://127.0.0.1:8000/api/quizzes/ Authorization:"Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6ImFkbWluMUBnbWFpbC5jb20iLCJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJleHAiOjE1Mjk2ODI1NzF9.FFe6d1qbfaHk32XIXZfFOToX_asEsqQb5FfMSkiwu0E"

# http GET http://127.0.0.1:8000/tests/topics/ Authorization:"Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTUyODgyMjI3MywidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20ifQ.LixPC9hZpES0VHKQt6IK3sM8oRcAlQbJgOK7XRUfR1s"
#http -f POST http://127.0.0.1:8000/tests/users/ username='hello'