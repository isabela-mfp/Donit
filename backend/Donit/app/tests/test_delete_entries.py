from django.test import TestCase
from app.models import ListManagement, TaskManagement
from django.contrib.auth.models import User
import datetime

# Testes para o banco de dados
class TestDeleteEntries(TestCase):
    def setUp(self):
        self.user1 = User(1)
        self.user1.save()
    
    def test_criar_lista_e_deletar(self): 
        test_list = ListManagement(name='Lista 1', userid_id=1, description='Esta eh a primeira lista de teste', type='A')
        test_list.save()
        test_list.delete()
        self.assertEqual(ListManagement.objects.all().count(), 0)
    
    def test_criar_tarefa_e_deletar(self): 
        test_task = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        test_task.save()
        test_task.delete()
        self.assertEqual(ListManagement.objects.all().count(), 0)

