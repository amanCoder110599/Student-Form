# Generated by Django 3.0.5 on 2020-05-01 20:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=60)),
                ('dob', models.DateField()),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(max_length=17, unique=True, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in format: '+999999999'. Up to 14 digits allowed", regex='^\\+?1?\\d{9,14}$')])),
            ],
        ),
    ]
