# Generated by Django 2.0.4 on 2018-05-10 05:39

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0009_auto_20180508_2111'),
    ]

    operations = [
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=2000)),
                ('icon', models.ImageField(upload_to='', verbose_name='step icon')),
                ('step_ind', models.IntegerField(verbose_name='step number')),
            ],
            options={
                'ordering': ['-step_ind'],
            },
        ),
        migrations.AlterModelOptions(
            name='test',
            options={'ordering': ['-pub_date', '-creat_date']},
        ),
        migrations.AlterModelOptions(
            name='topic',
            options={'ordering': ['-creat_date']},
        ),
        migrations.AddField(
            model_name='test',
            name='creat_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date created'),
        ),
        migrations.AddField(
            model_name='test',
            name='slug',
            field=models.SlugField(default='', unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='test',
            name='topic',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='tests.Topic', verbose_name='Тема'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='topic',
            name='icon',
            field=models.ImageField(default='', upload_to='', verbose_name='topic icon'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='choice',
            name='choice_text',
            field=models.CharField(max_length=2000),
        ),
    ]
