from django.db import models
from django.utils import timezone

class Topic(models.Model):
    name = models.CharField(max_length=200)
    creator = models.ForeignKey('auth.User', related_name = 'topics', on_delete = models.CASCADE)
    creat_date = models.DateTimeField('date created', default = timezone.now)
    def __str__(self):
        return self.name

class Test(models.Model):
    name = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published', default = timezone.now)
    creator = models.ForeignKey('auth.User', related_name = 'tests', on_delete = models.CASCADE)
    def __str__(self):
        return self.name
        
class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __str__(self):
        return self.choice_text
