from django.test import TestCase
from app.models import ListManagement, TaskManagement
import datetime
from django.contrib.auth.models import User


# Testes  para o banco de dados
class TestCreateListsOnDatabase(TestCase):
    def setUp(self):
        self.u1 = User(username='dummy')
        self.u1.save() # User model provided by django
        self.L1 = ListManagement(name='Lista 1', description='Esta eh a primeira lista de teste', type='A')
        self.L2 = ListManagement(name='Lista 2', description='Lista do trabalho', type='T')
        self.L1.userid = self.u1
        self.L2.userid = self.u1
        self.L1.save()
        self.L2.save()
    
    def test_create_2_lists_and_save_to_database(self): 
        self.assertEqual(ListManagement.objects.all().count(), 2)
    
    def test_get_and_compare_lists_on_database(self):
        saved_items = ListManagement.objects.all()
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Lista 1')
        self.assertEqual(first_saved_item, self.L1)
        self.assertEqual(second_saved_item.name, 'Lista 2')
        self.assertEqual(second_saved_item, self.L2)


class TestCreateTasksOnDatabase(TestCase):
    def setUp(self):
        self.u1 = User(username='dummy')
        self.u1.save() # User model provided by django
        self.T1 = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        self.T2 = TaskManagement(name='Tarefa 2', description='Exemplo de tarefa do supermercado', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        self.T1.userid = self.u1
        self.T2.userid = self.u1
        self.T1.save()
        self.T2.save()
    
    def test_create_2_tasks_and_save_to_database(self): 
        self.assertEqual(TaskManagement.objects.all().count(), 2)
    
    def test_get_and_compare_tasks_on_database(self):
        saved_items = TaskManagement.objects.all()
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Tarefa 1')
        self.assertEqual(first_saved_item, self.T1)
        self.assertEqual(second_saved_item.name, 'Tarefa 2')
        self.assertEqual(second_saved_item, self.T2)

