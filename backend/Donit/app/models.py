from django.db import models
from django.conf import settings

# Create your models here.
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
    '''
    LIST_TYPES = [
        ('N', 'normal'),
        ('S', 'supermercado'),
        ('A', 'academia'),
        ('T', 'trabalho'),
        ('F', 'faculdade'),
    ]
    '''
    id = models.AutoField(primary_key=True)
    userid = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=500)
    #type = models.CharField(max_length=1, choices=LIST_TYPES, default='N')
    type = models.CharField(
        max_length=2, 
        null=True,
        choices=ListTypesChoice.choices,
        default=ListTypesChoice.NORMAL
    )
    description = models.CharField(max_length=500)


class TaskManagement(models.Model):
    '''
    TASK_STATUS = [
        ('T', 'to do'),
        ('D', 'done'),
    ]
    '''
    id = models.AutoField(primary_key=True)
    name: models.CharField(max_length=500)
    description = models.TextField()
    creation = models.DateTimeField(auto_now_add=True, editable=False)
    conclusion = models.DateField(null=False, blank=False)
    priority = models.IntegerField(
        default=1,
        validators=[MaxValueValidator(50), MinValueValidator(1)]
     )
    #status = models.CharField(max_length=1, choices=TASK_STATUS, default='T')
    status = models.CharField(
        max_length=2, 
        choices=TaskStatusChoice.choices, 
        default=TaskStatusChoice.TO_DO
    )

