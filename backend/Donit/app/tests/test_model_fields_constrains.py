from django.test import TestCase, Client
from app.models import ListManagement, TaskManagement
import datetime
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from unittest.mock import patch


class TestFieldsLists(TestCase):
    def setUp(self):
        user_1 = User(username='dummy')
        user_1.save()

    def test_all_fields_list_are_ok(self):
        list_management = ListManagement(
            name='Lista 2',
            userid_id=1,
            description='Exemplo de lista do supermercado',
            type='S'
        )
        self.assertIs(list_management.full_clean(), None)

    def test_all_fields_list_are_empty(self):
        list_management = ListManagement(
            name='',
            description='',
            type=''
        )
        with self.assertRaises(ValidationError):
            list_management.full_clean()

    def test_name_field_list_is_empty(self):
        list_management = ListManagement(
            name='',
            userid_id=1,
            description='Esta eh a primeira lista de teste',
            type='A'
        )
        with self.assertRaises(ValidationError):
            list_management.full_clean()

    def test_description_field_list_is_empty(self):
        list_management = ListManagement(
            name='Lista 1',
            userid_id=1,
            description='',
            type='A'
        )
        with self.assertRaises(ValidationError):
            list_management.full_clean()

    def test_incorrect_type_list_is_empty(self):
        list_management = ListManagement(
            name='Lista 1',
            userid_id=1,
            description='Esta eh a primeira lista de teste',
            type=''
        )
        with self.assertRaises(ValidationError):
            list_management.full_clean()

class TestFieldsTasks(TestCase):
    def setUp(self):
        self.dummy_user = User.objects.create_user("Anonimo", "anonimo@anonimo.com", "123")
        self.dummy_list = ListManagement(userid=self.dummy_user, name="lista 1", type="N", description="esta eh uma lista 1")
    
    def test_all_fields_task_are_ok(self):
        task_management = TaskManagement(
            name='Tarefa 1',
            listid =  self.dummy_list, 
            description='Esta eh a primeira tarefa de teste',
            conclusion=datetime.date(2022, 9, 9),
            priority=1, status='T'
        )
        #breakpoint() #FIXME erro listid
        #self.assertIs(task_management.full_clean(), None)

    def test_all_fields_task_are_empty(self):
        task_management = TaskManagement(
            name='',
            description='',
            conclusion=None,
            priority=0,
            status=''
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()

    def test_name_field_task_is_empty(self):
        task_management = TaskManagement(
            listid = self.dummy_list , 
            name='',
            description='Esta eh a primeira tarefa de teste',
            conclusion=datetime.date(2022, 9, 9),
            priority=1,
            status='T'
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()

    def test_description_field_task_is_empty(self):
        task_management = TaskManagement(
            name='Tarefa 1', 
            description='',
            conclusion=datetime.date(2022, 9, 9),
            priority=1, 
            status='T'
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()

    def test_date_field_task_is_empty(self):
        task_management = TaskManagement(
            name='Tarefa 1', 
            description='Esta eh a primeira tarefa de teste',
            conclusion=None,
            priority=1,
            status='T'
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()

    def test_incorrect_task_priority(self):
        task_management = TaskManagement(
            name='Tarefa 1',
            description='Esta eh a primeira tarefa de teste',
            conclusion=datetime.date(2022, 9, 9),
            priority=0,
            status='T'
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()

    def test_status_task_is_empty(self):
        task_management = TaskManagement(
            listid=self.dummy_list, 
            name='Tarefa 1', 
            description='Esta eh a primeira tarefa de teste', 
            conclusion=datetime.date(2022, 9, 9),
            priority=1, 
            status=''
        )
        with self.assertRaises(ValidationError):
            task_management.full_clean()
