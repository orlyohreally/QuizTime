# Generated by Django 2.0.4 on 2018-08-05 09:19

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0006_auto_20180730_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='test',
            name='icon',
            field=cloudinary.models.CloudinaryField(max_length=255, verbose_name='test icon'),
        ),
    ]
