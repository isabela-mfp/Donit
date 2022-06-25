from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class TaskStatusChoice(models.TextChoices):
    TO_DO = 'T', 'To Do'
    DONE = 'D', 'Done'

class ListTypesChoice(models.TextChoices):
    NORMAL = 'N', 'Normal'
    SUPERMERCADO = 'S', 'Supermercado'
    ACADEMIA = 'A', 'Academia'
    TRABALHO = 'T', 'Trabalho'
    FACULDADE = 'F', 'Faculdade'

class ListManagement(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=500, null=False)
    type = models.CharField(
        max_length=2,
        null=False,
        choices=ListTypesChoice.choices,
        default=ListTypesChoice.NORMAL
    )
    description = models.CharField(max_length=500)

class TaskManagement(models.Model):
    id = models.AutoField(primary_key=True)
    listid = models.ForeignKey(ListManagement, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    description = models.TextField()
    creation = models.DateTimeField(auto_now_add=True, editable=False)
    conclusion = models.DateField(null=True, blank=True)
    priority = models.IntegerField(
        default=1,
        validators=[MaxValueValidator(50), MinValueValidator(1)]
     )
    status = models.CharField(
        max_length=2,
        choices=TaskStatusChoice.choices,
        default=TaskStatusChoice.TO_DO
    )
