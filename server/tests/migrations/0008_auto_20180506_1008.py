# Generated by Django 2.0.4 on 2018-05-06 07:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0007_auto_20180506_0947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='pub_date',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date published'),
        ),
    ]
