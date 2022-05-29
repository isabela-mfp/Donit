from django.test import TestCase
from app.models import ListManagement, TaskManagement
import datetime
from django.contrib.auth.models import User


# Testes  para o banco de dados
class TestCreateLists(TestCase):
    def setUp(self):
        self.u1 = User(username='dummy')
        self.u1.save() # User model provided by django
    
    def test_create_2_lists_and_save_to_database(self): 
        L1 = ListManagement(name='Lista 1', description='Esta eh a primeira lista de teste', type='A')
        L2 = ListManagement(name='Lista 2', description='Exemplo de lista do supermercado', type='S')
        L1.userid = self.u1
        L2.userid = self.u1
        L1.save()
        L2.save()
        
        saved_items = ListManagement.objects.all()
        self.assertEqual(saved_items.count(), 2)
        
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Lista 1')
        self.assertEqual(first_saved_item, L1)
        self.assertEqual(second_saved_item.name, 'Lista 2')
        self.assertEqual(second_saved_item, L2)


class TestCreateTasks(TestCase):
    def setUp(self):
        self.u1 = User(username='dummy')
        self.u1.save() # User model provided by django
    
    def test_create_2_tasks_and_save_to_database(self): 
        T1 = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        T2 = TaskManagement(name='Tarefa 2', description='Exemplo de tarefa do supermercado', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        T1.userid = self.u1
        T2.userid = self.u1
        T1.save()
        T2.save()
        
        saved_items = TaskManagement.objects.all()
        self.assertEqual(saved_items.count(), 2)
        
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Tarefa 1')
        self.assertEqual(first_saved_item, T1)
        self.assertEqual(second_saved_item.name, 'Tarefa 2')
        self.assertEqual(second_saved_item, T2)

