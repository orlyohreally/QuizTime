from django.db import models
from django.utils import timezone

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
    creator = models.ForeignKey('auth.User', related_name = 'topics', on_delete = models.CASCADE)
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
    creator = models.ForeignKey('auth.User', related_name = 'tests', on_delete = models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete = models.CASCADE, verbose_name = 'Тема')
    slug = models.SlugField(unique = True)
    icon = models.FileField('test icon')
    def __str__(self):
        return self.name
    class Meta:
        ordering = ["-pub_date", "-creat_date"]

        
class Question(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)
    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length = 2000)
    votes = models.IntegerField(default = 0)
    def __str__(self):
        return self.choice_text
