from django.test import TestCase
from app.models import ListManagement, TaskManagement
import datetime


class TestFieldsLists(TestCase):
    def test_all_fields_list_are_empty(self):
        L = ListManagement(name='', description='', type='')
    
    def test_name_field_list_is_empty(self):
        L = ListManagement(name='', description='Esta eh a primeira lista de teste', type='A')
    def test_description_field_list_is_empty(self):
        L = ListManagement(name='Lista 1', description='', type='A')
    def test_incorrect_type_list_is_empty(self):
        L = ListManagement(name='Lista 1', description='Esta eh a primeira lista de teste', type='')

class TestFieldsTasks(TestCase):
    def test_all_fields_task_are_empty(self):
        T = TaskManagement(name='', description='', conclusion=None, priority=0, status='')

    def test_name_field_task_is_empty(self):
        T = TaskManagement(name='', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')

    def test_description_field_task_is_empty(self):
        T = TaskManagement(name='Tarefa 1', description='', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')

    def test_date_field_task_is_empty(self):
        T = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=None, priority=1, status='T')

    def test_incorrect_task_priority(self):
        T = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=0, status='T')

    def test_status_task_is_empty(self):
        T = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='')

class TestCreateListas(TestCase):
    def test_create_2_lists_and_save_to_database(self): 
        L1 = ListManagement(name='Lista 1', description='Esta eh a primeira lista de teste', type='A')
        L2 = ListManagement(name='Lista 2', description='Exemplo de lista do supermercado', type='S')
        #L1.save()
        #L2.save()
        
        saved_items = ListManagement.objects.all()
        self.assertEqual(saved_items.count(), 2)
        
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Lista 1')
        self.assertEqual(first_saved_item, L1)
        self.assertEqual(second_saved_item.name, 'Lista 2')
        self.assertEqual(second_saved_item, L2)

class TestCreateTasks(TestCase):
    def test_create_2_tasks_and_save_to_database(self): 
        T1 = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        T2 = TaskManagement(name='Tarefa 2', description='Exemplo de tarefa do supermercado', type='S')
        #T2.save()
        #T2.save()
        
        saved_items = TaskManagement.objects.all()
        self.assertEqual(saved_items.count(), 2)
        
        first_saved_item = saved_items[0]
        second_saved_item = saved_items[1]
        self.assertEqual(first_saved_item.name, 'Lista 1')
        self.assertEqual(first_saved_item, T1)
        self.assertEqual(second_saved_item.name, 'Lista 2')
        self.assertEqual(second_saved_item, T2)

