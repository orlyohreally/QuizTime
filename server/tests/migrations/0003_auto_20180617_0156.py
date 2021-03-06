# Generated by Django 2.0.4 on 2018-06-16 22:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0002_topic'),
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('choice_text', models.CharField(max_length=2000)),
                ('votes', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date published')),
                ('creat_date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date created')),
                ('slug', models.SlugField(unique=True)),
                ('icon', models.FileField(upload_to='', verbose_name='test icon')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tests', to=settings.AUTH_USER_MODEL)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tests.Topic', verbose_name='Тема')),
            ],
            options={
                'ordering': ['-pub_date', '-creat_date'],
            },
        ),
        migrations.AddField(
            model_name='question',
            name='test',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tests.Test'),
        ),
        migrations.AddField(
            model_name='choice',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tests.Question'),
        ),
    ]
