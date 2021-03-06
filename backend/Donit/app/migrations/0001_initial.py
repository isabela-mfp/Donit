# Generated by Django 4.0.4 on 2022-06-25 03:30

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskManagement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=500)),
                ('description', models.TextField()),
                ('creation', models.DateTimeField(auto_now_add=True)),
                ('conclusion', models.DateField()),
                ('priority', models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(50), django.core.validators.MinValueValidator(1)])),
                ('status', models.CharField(choices=[('T', 'To Do'), ('D', 'Done')], default='T', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='ListManagement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=500)),
                ('type', models.CharField(choices=[('N', 'Normal'), ('S', 'Supermercado'), ('A', 'Academia'), ('T', 'Trabalho'), ('F', 'Faculdade')], default='N', max_length=2)),
                ('description', models.CharField(max_length=500)),
                ('userid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
