from django.db import models
from django.utils import timezone



from rest_framework_jwt.settings import api_settings



from datetime import datetime, timedelta

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.db import models

class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError('Users must have a username.')

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
        
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    # The `USERNAME_FIELD` property tells us which field we will use to log in.
    # In this case we want it to be the email field.
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Tells Django that the UserManager class defined above should manage
    # objects of this type.
    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def token(self):
        return self._generate_jwt_token()

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    def _generate_jwt_token(self):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(self)
        token = jwt_encode_handler(payload)
        return token

class Step(models.Model):
    text = models.CharField(max_length=2000)
    icon = models.FileField('topic icon')
    step_ind = models.IntegerField('step number')
    def __str__(self):
        return self.text
    class Meta:
        ordering = ["step_ind"]

class Topic(models.Model):
    name = models.CharField(max_length=200)
    creator = models.ForeignKey('User', related_name = 'topics', on_delete = models.CASCADE)
    creat_date = models.DateTimeField('date created', default = timezone.now)
    icon = models.FileField('topic icon')
    def __str__(self):
        return self.name
    class Meta:
        ordering = ["-creat_date"]

class Test(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', default = timezone.now)
    creat_date = models.DateTimeField('date created', default = timezone.now)
    creator = models.ForeignKey('User', related_name = 'tests', on_delete = models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete = models.CASCADE, verbose_name = 'Тематика')
    slug = models.SlugField(unique = True)
    icon = models.FileField('test icon')
    def __str__(self):
        return self.name
    class Meta:
        ordering = ["-pub_date", "-creat_date"]

class Subject(models.Model):
    test = models.ForeignKey(Test, related_name = 'subjects', on_delete = models.CASCADE, verbose_name = 'Тема')
    short_description = models.CharField(max_length=200)
    long_description = models.CharField(max_length=2000)
    def __str__(self):
        return self.short_description
    
class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name = 'questions')
    question_text = models.CharField(max_length=200)
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name = 'choices')
    choice_text = models.CharField(max_length = 2000)
    votes = models.IntegerField(default = 0)
    def __str__(self):
        return self.choice_text
